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


}());