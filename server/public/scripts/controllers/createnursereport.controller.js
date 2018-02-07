myApp.controller('CreateNurseReportController', function (UserService, ReportService, $http) {
    var vm = this;
    vm.reportService = ReportService;
    
    vm.nurseReportHospital = "";
    vm.nurseReportId = "";
    vm.newNurseReport = {
        nurse_was_adv_dispatched: false
    };

    vm.submitNurseReport = function (objectTosend) {
        $http.post('/report/new/nursereport', objectTosend).then(function (response) {
            vm.viewNurseReport();    
        }).catch(function (err) {
            console.log('failure adding new nurse report', error);
        });
    }
})