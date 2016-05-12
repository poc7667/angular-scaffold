require 'pry'
$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "ng_scaffold/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "ng_scaffold"
  s.version     = NgScaffold::VERSION
  s.authors     = ["poc.hsu"]
  s.email       = ["poc7667@gmail.com"]
  s.summary     = "An elegant, structured (X)HTML/XML templating engine."
  s.license     = "MIT"
  s.executables = ['ng_scaffold']
  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]
  s.homepage    = 'https://rubygems.org/gems/example'

  # s.add_dependency "rails", "~> 4.2.6"
  s.add_dependency 'pry'

  # s.add_development_dependency "sqlite3"
end
