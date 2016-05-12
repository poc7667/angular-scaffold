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
  "index_controller.js": File.read([TPL_DIR, 'index_controller.js'].join('/')),  
  # "edit_controller.js": File.read([TPL_DIR, 'edit_controller.js'].join('/')),
)

VIEW_TMPL = OpenStruct.new(
  "index.html": File.read([TPL_DIR, 'index.html.erb'].join('/')),
  "form.html.erb": File.read([TPL_DIR, 'form.html.erb'].join('/')),
)

module NgScaffold
  module Exec
    class NgScaffold
      def initialize(args)
        setup_naming(args)
        @dest_dirs = {
          controllers: [Dir.pwd,'js', 'controllers', @opt.param_name].join("/"),
          views: [Dir.pwd,'admin_tpl', @opt.param_name].join("/"),
        }
        pp(@dest_dirs)
        create_dest_folders
        generate_templates
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
        # SERVICE_TMPL.to_h.each do |tmpl_name, erb_content|
        #   output = ERB.new(erb_content).result(binding)
        #   puts [@opt.file_name_prefix, tmpl_name].join("_")
        # end
        CONTROLLER_TMPL.to_h.each do |tmpl_name, erb_content|
          content = ERB.new(erb_content).result(binding)
          output_file_name = [@opt.file_name_prefix, tmpl_name].join("_")
          output_file_full_path = [@dest_dirs[:controllers], output_file_name].join("/")
          File.open(output_file_full_path, 'w') { |file| file.write(content) }
        end
      end

      def get_export_file_name

      end

    end
  end
end