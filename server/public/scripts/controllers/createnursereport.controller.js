myApp.controller('CreateNurseReportController', function (ReportService, $http) {
    console.log('CreateNurseReportController created');
    var vm = this;
    vm.reportService = ReportService;

    vm.nurseReportHospital = "";
    vm.nurseReportId = "";
    vm.newNurseReport = {
        nurse_was_adv_dispatched: false
    };

    vm.submitNurseReport = function (objectTosend) {
        console.log(objectTosend);
        $http.post('/report/new/nursereport', objectTosend).then(function (response) {
        }).catch(function (err) {
        }
    )}
})