(function() {

    'use strict';
    app.controller('<%=@opt.class_name%>BaseCtrl',
        function($rootScope,
            $scope,
            $resource,
            $window,
            $timeout,
            $q,
            <%= injectServicesStr %>,
            $location,
            $routeParams,
            $stateParams
        ) {

            $scope.<%=@opt.resource%>_pre_non_editable_fields = []
            $scope.<%=@opt.resource%>_post_non_editable_fields = []
            $scope.<%=@opt.resource%>_text_fields = []
            $scope.<%=@opt.resource%>_datetime_text_fields = []
            $scope.<%=@opt.resource%>_select_fields = []
            $scope.<%=@opt.resource%>_radio_fields = []
            $scope.<%=@opt.resources_name%> = []
            $scope.emptyRecord = {}

        });

}());