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

            $scope.<%=@opt.resource%>_fields = []
            $scope.<%=@opt.resources_name%> = []
            $scope.emptyRecord = {}

        });

}());