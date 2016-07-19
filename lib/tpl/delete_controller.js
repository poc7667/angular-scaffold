(function() {

    'use strict';

    app.controller('<%=@opt.class_name%>DeleteCtrl',
        function($scope, 
                $resource, 
                $q,
                <%= injectServicesStr %>,
                $stateParams
                ) {

            $scope.delete = function(index, <%= @opt.resource_id %>) {
                if (confirm(I18n.t("are_you_sure_to_delete_this_record"))) {
                    <%= @opt.service_name %>.delete({
                        <%= @opt.resource_id %>: <%= @opt.resource_id %>
                    }).$promise.then(function(ret) {
                        $scope.<%=@opt.resources_name%>.splice(index, 1)
                        $scope.successMessage()
                    }, $scope.errorMessage);
                }
            }


        });


}());