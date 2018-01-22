myApp.controller('AdvocateController', function (UserService, FormService, $http, $mdDialog) {
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.advocate = FormService.selectedAdvocate;
    vm.advocateList = FormService.advocateList;
    
    // Column sorting
    vm.sortColumn = "advocate_first_name";
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

    // VIEW advocates 
    vm.viewAdvocate = function () {
        FormService.viewAdvocate();
    }


    // DELETE advocate
    vm.deleteAdvocate = function (advocateId) {
        $http.put('/advocate/del/' + advocateId).then(function (response) {
            vm.viewAdvocate();           
        }).catch(function (error) {
            console.log('failure deleteing advocate', error);        
        });    
    }

    // EDIT Advocate
    vm.editAdvocate = function (advocate) {
        vm.formService.editAdvocate(advocate);
    }

    vm.viewAdvocate();
});