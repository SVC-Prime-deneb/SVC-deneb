myApp.controller('CreateNurseReportController', function (ReportService, $http) {
    console.log('CreateNurseReportController created');
    var vm = this;
    vm.reportService = ReportService;
})