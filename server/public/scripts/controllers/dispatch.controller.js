myApp.controller('DispatchController', function (FormService, $http) {
    console.log('DispatchController created');
    var vm = this;
    vm.formService = FormService;
    vm.advocateList = FormService.advocateList;
    vm.advocatesDispatch;
    // VIEW advocates 
    vm.viewAdvocate = function () {
        FormService.viewAdvocate();
    }

    // Column sorting
    vm.sortColumn = "last_contacted_date";
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

    vm.selectAdvocates = function (advocateArray) {
        vm.advocatesDispatch = [];
        for (var i = 0; i < advocateArray.length; i++) {
            if (advocateArray[i].selected) {
                vm.advocatesDispatch.push(advocateArray[i]);
            }
        }
    }

    //function to show dispatch form popup
    vm.showDispatch = function (ev, advocateArray) {
        vm.selectAdvocates(advocateArray);
        FormService.showDispatch(ev, vm.advocatesDispatch);
    }

    vm.viewAdvocate();

    });