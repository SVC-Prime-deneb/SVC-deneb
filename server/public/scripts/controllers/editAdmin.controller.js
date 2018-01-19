myApp.controller('EditAdminController', function (UserService, $http, FormService, $routeParams) {
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.updatedAdmin = {};
    vm.updateAdmin = vm.formService.updatedAdmin;


    // EDIT ADMIN
    vm.editAdmin = function () {
        vm.updateAdmin = vm.formService.updatedAdmin;
        console.log('here', vm.updateAdmin);
        
    }

    // UPDATE ADMIN
    vm.updatedAdmin = function (id, objectIn) {
        FormService.updateAdmin(id, objectIn);
    }

    vm.editAdmin();


});
