myApp.service('ReportService', function ($http, $location) {
    console.log('ReportService loaded');
    
    var self = this;
    self.dataList = {data: []};
    self.selectedData = {data: {}};

    self.categoryList = [];
    self.selectedCategory = {};
})