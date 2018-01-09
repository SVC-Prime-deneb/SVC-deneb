// controller for casemanage.html
myApp.controller('CaseController', function (UserService, FormService, $http, $mdDialog) {
    console.log('Caseontroller created');
    var vm = this;
    vm.formService = FormService;


    // Column sorting
    //default sort case complete status
    vm.sortColumn = "is_case_complete";
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
    //function to set formId
    // vm.saveFormId = function (id) {
    //     FormService.saveFormId(id);
    // }
    //function to show MA form popup
    vm.showMa = function (ev, id, type) {
        FormService.showMa(ev, id, type);
    }

    //function to show LA form popup
    vm.showLa = function (ev, id, type) {
        FormService.showLa(ev, id, type);
    }

    //function to show Refer form popup
    vm.showRefer = function (ev, id, type) {
        FormService.showRefer(ev, id, type);
    }

    //function to show Release form popup
    vm.showRelease = function (ev, id, type) {
        FormService.showRelease(ev, id, type);
    }

    //function to show green release form popup
    vm.showGreen = function (ev, id, type) {
        FormService.showGreen(ev, id);
    }

    //get route to populate cases
    vm.getCases = function () {
        FormService.getCases();
    }

    //route to get all cases
    vm.getCases();

    //checkbox clicked function, sets each clicked form as complete or incomplete according to the checkbox status 
    //put route
    vm.checkClicked = function (id, value, name) {
        FormService.checkClicked(id, value, name);

    }

    vm.searchCase = function (datesIn){
        FormService.searchCase(datesIn);
    }

});