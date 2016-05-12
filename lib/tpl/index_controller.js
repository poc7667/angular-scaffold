(function() {

    'use strict';

    app.controller('<%=@opt.class_name%>IndexCtrl',
        function($scope, $resource, $q, $stateParams, <%= @opt.service_name %> ) {

            $q.all([]).then(function(ret) {
                $scope.<%=@opt.resources_name%> = ret[0]
            });
            $scope.delete = function(index, <%= @opt.resource_id %>) {
                if (confirm("Are you sure you want to delete this record?")) {
                    $scope.<%=@opt.resources_name%>.splice(index, 1)
                    <%= @opt.service_name %>.delete({
                        <%= @opt.resource_id %>: <%= @opt.resource_id %>
                    })
                }
            }

        });


}());