(function() {
    'use strict';
    angular.module('<%= @opt.module_name %>', [])
        .factory('<%= @opt.service_name %>', ['$resource',
            function($resource, $http) {
                var <%= @opt.param_name %> = $resource('/api/v1/<%= @opt.resources_name %>/:<%= @opt.resource_id %>/', {
                    <%= @opt.resource_id %>: '@<%= @opt.resource_id %>',
                }, {
                    update: {
                        method: 'PUT'
                    },
                    create: {
                        method: 'POST'
                    },
                    delete: {
                        method: 'DELETE'
                    }
                });
                return <%= @opt.resources_name %>;
            }
        ]);
}());