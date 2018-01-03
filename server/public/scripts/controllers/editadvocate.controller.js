myApp.controller('EditAdController', function ($http, FormService, $routeParams) {
    console.log('EditAdController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.updatedAdvocate = {};

    // vm.showAdvocateForm = function (ev, id) {
    //     FormService.showAdvocateForm(ev, id);
    // }
    
    // EDIT ADVOCATE
    vm.editAdvocate = function (){
        // console.log('Edit Advocate controller was called');
        vm.updatedAdvocate = vm.formService.updatedAdvocate;
        // console.log('Success', vm.updatedAdvocate);
    }
    
    // UPDATE ADVOCATE
    vm.updateAdvocate = function (id, objectIn) {
        FormService.updateAdvocate(id, objectIn);
    }
    
    vm.editAdvocate();

    
});
