myApp.controller('DispatchController', function (UserService, FormService, $http) {
    var vm = this;
    vm.formService = FormService;
    vm.advocateList = FormService.advocateList;
    
    // get advocates
    vm.viewAdvocate = function () {
        FormService.viewAdvocate();
    }
    vm.viewAdvocate();

    // Column sorting variables
    //sets auto sorting
    vm.sortColumn = "last_contacted_date";
    vm.reverseSort = false;

    //function to sort
    vm.sortData = function (column) {
        vm.reverseSort = (vm.sortColumn == column) ? !vm.reverseSort : false;
        vm.sortColumn = column;
    }
    
    //function to set arrows
    vm.getSortClass = function (column) {
        if (vm.sortColumn == column) {
            return vm.reverseSort ? 'arrow-down' : 'arrow-up';
        }
        return '';
    }

    //function to create an array of selected advocates
    vm.selectAdvocates = function (advocateArray) {
        vm.advocatesDispatch = [];
        for (var i = 0; i < advocateArray.length; i++) {
            if (advocateArray[i].selected) {
                vm.advocatesDispatch.push(advocateArray[i]);
            }
        }
    }

    //function to show dispatch form popup
    //takes in all advocates
    vm.showDispatch = function (ev, advocateArray) {
        //creates an array of selected advocates
        vm.selectAdvocates(advocateArray);
        //shows dispatch modal
        FormService.showDispatch(ev, vm.advocatesDispatch);
    }

    });