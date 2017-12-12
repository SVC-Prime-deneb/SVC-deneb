myApp.controller('NurseReportController', function (ReportService, $http) {
    console.log('NurseReportController created');
    var vm = this;
    vm.reportService = ReportService;
})