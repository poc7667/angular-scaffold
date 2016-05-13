(function() {

    'use strict';

    app.controller('<%=@opt.class_name%>DeleteCtrl',
        function($scope, $resource, $q, $stateParams, <%= @opt.service_name %> ) {

            $scope.delete = function(index, <%= @opt.resource_id %>) {
                if (confirm(I18n.t("Are you sure you want to delete this record?"))) {
                    $scope.<%=@opt.resources_name%>.splice(index, 1)
                    <%= @opt.service_name %>.delete({
                        <%= @opt.resource_id %>: <%= @opt.resource_id %>
                    })
                }
            }


        });


}());