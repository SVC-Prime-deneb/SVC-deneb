myApp.controller('NurseReportController', function (UserService, ReportService, $http) {
    var vm = this;
    vm.reportService = ReportService;

    vm.reportObject = ReportService.reportObject;

    vm.nurseReport = ReportService.selectedNurseReport;
    vm.nurseReportList = ReportService.nurseReportList;

    // Column sorting
    vm.sortColumn = "nursing_form_date";
    vm.reverseSort = false;

    vm.sortData = function (column) {
        vm.reverseSort = (vm.sortColumn == column) ? !vm.reverseSort : false;
        vm.sortColumn = column;
    }

    vm.getSortClass = function (column) {
        if (vm.sortColumn == column) {
            return vm.reverseSort ? 'arrow-down' : 'arrow-up';
        }
        return '';
    }

    // GET Nurse Reports Table to display
    vm.viewNurseReport = function () {
        $http.get('report/nurse').then (function (response) {
            console.log('success');
            vm.nurseReportList.data = response.data;
            console.log('nurse report List', vm.nurseReportList); 
        }). catch (function (error) {
            console.log('failure', error);   
        });
    }

    // DELETE Nurse Report
    vm.deleteNurseReport = function (nurseReportId) {
        console.log('deleted', nurseReportId);
        $http.delete('/report/del/' + nurseReportId).then(function (response) {
            console.log('success');
            vm.viewNurseReport();
        }).catch(function (error) {
            console.log('failure', error);   
        });   
    }

    vm.viewNurseReport();
})