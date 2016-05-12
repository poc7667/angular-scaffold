require 'optparse'
require 'rbconfig'
require 'pp'
require 'pry'
require 'erb'
require 'active_support/all'
require 'ostruct'
require 'fileutils'


TPL_DIR = File.expand_path('../../tpl', __FILE__)
# controller_erb_str = ERB.new(controller_erb)

SERVICE_TMPL = OpenStruct.new(
  "service.js": File.read([TPL_DIR, 'service.js'].join('/')),
)

CONTROLLER_TMPL = OpenStruct.new(
  "base_controller.js": File.read([TPL_DIR, 'base_controller.js'].join('/')),
  "index_controller.js": File.read([TPL_DIR, 'index_controller.js'].join('/')),
  "update_controller.js": File.read([TPL_DIR, 'update_controller.js'].join('/')),
  "edit_controller.js": File.read([TPL_DIR, 'edit_controller.js'].join('/')),
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
        setup_naming(args)
        @dest_dirs = {
          controllers: [Dir.pwd,'js', 'controllers', @opt.param_name].join("/"),
          services: [Dir.pwd,'js', 'services'].join("/"),
          views: [Dir.pwd,'admin_tpl', @opt.param_name].join("/"),
        }
        pp(@dest_dirs)
        create_dest_folders
        generate_templates
        show_js_routes_config
      end

      def setup_naming(args)
        @opt = OpenStruct.new(
          "working_path" => Dir.getwd,
          "scaffold_name" => args.first,
        )
        @opt.class_name = @opt.scaffold_name.camelize(:lower)
        @opt.resource = @opt.file_name_prefix = @opt.param_name = @opt.class_name.underscore
        @opt.resources_name = @opt.param_name.pluralize
        @opt.resource_id = @opt.param_name + "_id"
        @opt.module_name = @opt.class_name + "Module"
        @opt.service_name = @opt.class_name + "Service"
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
          [@dest_dirs[:controllers], [@opt.file_name_prefix, file_name].join("_")].join("/")
        end

        export_template_file(VIEW_TMPL) do |file_name|
          [@dest_dirs[:views], [@opt.file_name_prefix, file_name].join("_")].join("/")
        end

      end

      def export_template_file(template_list, &block)
        template_list.to_h.each do | file_name, erb_content |
          content = ERB.new(erb_content).result(binding)
          file_path = block.call(file_name)
          File.open(file_path, 'w') { |file| file.write(content) }
        end
      end


      def show_js_routes_config
        puts ERB.new(File.read([TPL_DIR, 'router.erb'].join('/'))).result(binding)
      end

    end
  end
end