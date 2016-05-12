(function() {
    "use strict";
    app.controller( <%= edit_controller_name %> ,
        function($scope, $resource, $q, $stateParams, $timeout, <%= service_name %> ) {

            if ($stateParams.loan_plan_id) {
                var query = {
                    bank_id: $scope.bank_id,
                    loan_plan_id: $stateParams.loan_plan_id
                }
                LoanPlanService.get(query).$promise.then(function(ret) {
                    $scope.loan_plan = ret
                    console.log($scope.loan_plan)
                    init_product_attrs($scope);
                })
            } else {
                // var req_url = ['', $scope.bank_id, '/loan_plans/new'].join("")
                LoanPlanService.new({
                    bank_id: $scope.bank_id
                }).$promise.then(function(ret) {
                    $scope.loan_plan = ret
                    console.log($scope.loan_plan)
                    init_product_attrs($scope);
                })

            }


        });

}());