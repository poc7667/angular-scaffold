(function() {
    "use strict";
    app.controller( '<%=@opt.class_name%>CreateCtrl' ,
        function($scope, 
            $resource, 
            $q, 
            $stateParams, 
            <%= injectServicesStr %>,
            $timeout
            ) {
            $scope.create = function() {
                $scope.<%=@opt.resources_name%>.push(angular.copy($scope.emptyRecord))
            }
        });

}());

