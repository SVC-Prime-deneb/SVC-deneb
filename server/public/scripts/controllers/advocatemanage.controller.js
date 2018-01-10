myApp.controller('AdvocateController', function (UserService, FormService, $http, $mdDialog) {
    console.log('AdvocateController created');
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
        console.log('deleted', advocateId);
        $http.put('/advocate/del/' + advocateId).then(function (response) {
            console.log('success');
            vm.viewAdvocate();           
        }).catch(function (error) {
            console.log('failure', error);        
        });    
    }

    // EDIT Advocate
    vm.editAdvocate = function (advocate) {
        // console.log('sending advocate to edit_Advocate controller', advocate);
        vm.formService.editAdvocate(advocate);
        // console.log('Finish sending');
    }

    vm.viewAdvocate();
});