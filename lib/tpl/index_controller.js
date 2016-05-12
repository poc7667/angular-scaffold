(function() {

    'use strict';
    app.controller('<%=@opt.class_name%>BaseCtrl',
        function($rootScope,
            $scope,
            $resource,
            $window,
            $timeout,
            $q,
            $stateParams, 
            <%= @opt.service_name %> 
        ) {

        });

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

    app.controller('<%=@opt.class_name%>UpdateCtrl',
        function($scope, $resource, $q, $stateParams, <%= @opt.service_name %> ) {
            $scope.update = function() {
                if ($stateParams.<%= @opt.resource_id %>) {
                    <%= @opt.service_name %>.update({
                        <%= @opt.resource_id %>: $scope.<%= @opt.resource_id %>
                    }, {
                        <%= @opt.resource %>: $scope.<%= @opt.resource %>
                    }).$promise.then($scope.successMessage, $scope.errorMessage)
                } else {
                    <%= @opt.service_name %>.create({
                        <%= @opt.resource_id %>: $scope.<%=@opt.resource%>.id
                    }).$promise.then(function(ok_msg) {
                        $scope.<%=@opt.resources_name%>.push($scope.<%=@opt.resource%>)
                        $scope.successMessage()
                    }, $scope.errorMessage)
                }
            }
        });
}());