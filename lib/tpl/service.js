(function() {
    'use strict';
    angular.module('<%= @opt.module_name %>', [])
        .factory('<%= @opt.service_name %>', 
            function($resource, $http, SERVER_CFG) {
                
                var API_END_POINT = [
                    SERVER_CFG.HOST,
                    '<%= @opt.resources_name %>/:<%= @opt.resource_id %>/'
                ].join("/");

                var <%= @opt.resource %> = $resource(API_END_POINT, { <%= @opt.resource_id %> : '@<%= @opt.resource_id %>',
                }, {
                    all: {
                        method: 'GET',
                        isArray: true
                    },
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
                return <%=@opt.resource %> ;
            }
        );
}());