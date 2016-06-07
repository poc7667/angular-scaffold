require 'optparse'
require 'rbconfig'
require 'pp'
require 'pry'
require 'erb'
require 'active_support/all'
require 'ostruct'
require 'fileutils'
require 'yaml'

TPL_DIR = File.expand_path('../../tpl', __FILE__)

SERVICE_TMPL = OpenStruct.new(
  "service.js": File.read([TPL_DIR, 'service.js'].join('/')),
)

CONTROLLER_TMPL = OpenStruct.new(
  "base_controller.js": File.read([TPL_DIR, 'base_controller.js'].join('/')),
  "index_controller.js": File.read([TPL_DIR, 'index_controller.js'].join('/')),
  "update_controller.js": File.read([TPL_DIR, 'update_controller.js'].join('/')),
  "edit_controller.js": File.read([TPL_DIR, 'edit_controller.js'].join('/')),
  "create_controller.js": File.read([TPL_DIR, 'create_controller.js'].join('/')),
  "delete_controller.js": File.read([TPL_DIR, 'delete_controller.js'].join('/')),
)

VIEW_TMPL = OpenStruct.new(
  "index.html": File.read([TPL_DIR, 'index.html'].join('/')),
  "form.html": File.read([TPL_DIR, 'form.html'].join('/')),
)

module NgScaffold
  module Exec
    class ScaffoldBase

    end
    class NgScaffold < ScaffoldBase
      def initialize(args)
        load_cfg
        setup_naming(args)
        parse_args
        setup_dest_dir_paths
        create_dest_folders
        generate_templates
        show_js_routes_config
      end

      def parse_args
        @options = {}
        @options[:scaffold_as_service] = true

        option_parser = OptionParser.new do |opts|
          opts.banner = 'here is help messages of the command line tool.'
          opts.on('-s A,B', '--services A,B', Array, 'List of arguments') do |value|
            @options[:services] = value.collect{|v| v.camelize(:lower)+ "Service"}
          end
          opts.on('--skip-scaffold-as-service', 'Set options as switch') do
            # 这个部分就是使用这个Option后执行的代码
            @options[:scaffold_as_service] = false
          end

        end.parse!

        if @options[:scaffold_as_service]
          @options[:services] << @opt.service_name 
        end
        @options[:services].uniq!

      end

      def load_cfg
        config_file_name = ".ng_scaffold.yml"
        if File.exist?(config_file_name)
          @cfg = OpenStruct.new(YAML.load_file(config_file_name))
        else
          FileUtils.cp([TPL_DIR, config_file_name].join('/'), Dir.pwd)
          @cfg = OpenStruct.new(YAML.load_file(config_file_name))
        end
      end

      def setup_naming(args)
        @opt = OpenStruct.new("scaffold_name" => args.first)
        @opt.class_name = @opt.scaffold_name.camelize(:lower)
        @opt.resource = @opt.file_name_prefix = @opt.param_name = @opt.class_name.underscore
        @opt.resources_name = @opt.param_name.pluralize
        @opt.resource_id = @opt.param_name + "_id"
        @opt.module_name = @opt.class_name + "Module"
        @opt.service_name = @opt.class_name + "Service"
      end

      def setup_dest_dir_paths
        @dest_dirs = {
          controllers: [@cfg.controller_folder_path, @opt.param_name].join("/"),
          services: [@cfg.services_folder_path].join("/"),
          views: [@cfg.tpl_folder_path, @opt.param_name].join("/"),
        }
      end

      def create_dest_folders
        @dest_dirs.each do | k, v |
          FileUtils::mkdir_p(v)
        end
      end

      def generate_templates

        export_template_file(SERVICE_TMPL) do |file_name|
          [@dest_dirs[:services], [@opt.file_name_prefix, file_name].join("_")].join("/")
        end

        export_template_file(CONTROLLER_TMPL) do |file_name|
          [@dest_dirs[:controllers], file_name].join("/")
        end

        export_template_file(VIEW_TMPL) do |file_name|
          [@dest_dirs[:views], file_name].join("/")
        end

      end

      def injectServicesStr
        @options[:services].join(", ")
      end

      def export_template_file(template_list, &block)
        template_list.to_h.each do | file_name, erb_content |
          content = ERB.new(erb_content, nil, '-').result(binding)
          file_path = block.call(file_name)
          File.open(file_path, 'w') { |file| file.write(content) }
        end
      end

      def show_js_routes_config
        puts ERB.new(File.read([TPL_DIR, 'router.erb'].join('/')), nil, '-').result(binding)
      end

    end
  end
end