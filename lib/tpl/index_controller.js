(function() {

    'use strict';

    app.controller('<%=@opt.class_name%>IndexCtrl',
        function($scope, $resource, $q, <%= injectServicesStr %> ,$stateParams) {
             <%= @opt.service_name %>.all({}).$promise.then(function(ret) {
                $scope.<%=@opt.resources_name%> = ret
            });

            $scope.inPlaceUpdate = function(<%=@opt.resource%>, <%=@opt.resource_id%>) {
                if (<%=@opt.resource_id%>) {
                    <%=@opt.service_name%>.update({
                        <%=@opt.resource_id%>: <%=@opt.resource_id%>
                    }, {
                        <%=@opt.resource%>: <%=@opt.resource%>
                    }).$promise.then(function(ret) {
                        $scope.successMessage(ret)
                    },$scope.errorMessage)
                } else {
                    <%=@opt.service_name%>.create({}, {
                        <%=@opt.resource%>: <%=@opt.resource%>
                    }).$promise.then(function(ret) {
                        $scope.<%=@opt.resources_name%>.splice(-1,1)
                        $scope.<%=@opt.resources_name%>.push(ret)
                        $scope.<%=@opt.resource%> = ret
                        $scope.successMessage()
                    }, $scope.errorMessage);

                }
            };

        });

}());

