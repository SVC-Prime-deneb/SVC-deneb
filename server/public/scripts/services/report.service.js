myApp.service('ReportService', function ($http, $location) {    
    var self = this;
    self.dataList = {data: []};
    self.selectedData = {data: {}};

    self.nurseReportList = {data: []};
    self.selectedNurseReport = {data: {}};
})