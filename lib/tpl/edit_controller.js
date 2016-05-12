(function() {
    "use strict";
    app.controller( '<%=@opt.class_name%>EditCtrl' ,
        function($scope, 
            $resource, 
            $q, 
            $stateParams, 
            $timeout, 
            <%= @opt.service_name %> ) {

            if ($stateParams.<%= @opt.resource_id %>) {
                var query = {
                    <%= @opt.resource_id %>: $scope.<%= @opt.resource_id %>,
                }
                <%= @opt.service_name %>.get(query).$promise.then(function(ret) {
                    $scope.<%= @opt.resource %> = ret
                })
            } else {
                <%= @opt.service_name %>.new({
                    <%= @opt.resource_id %>: $scope.<%= @opt.resource_id %>
                }).$promise.then(function(ret) {
                    $scope.<%= @opt.resource %> = ret
                })
            }
        });

}());