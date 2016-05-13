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

            $scope.<%=@opt.resource%>_text_fields = []
            $scope.<%=@opt.resource%>_select_fields = []
            $scope.<%=@opt.resource%>_radio_fields = []
            $scope.<%=@opt.resources_name%> = []
            $scope.emptyRecord = {}

        });

}());