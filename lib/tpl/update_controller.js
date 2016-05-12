(function() {

    'use strict';
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

