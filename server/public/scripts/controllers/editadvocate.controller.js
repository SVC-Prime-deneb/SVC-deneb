myApp.controller('EditAdController', function (FormService) {
    console.log('EditAdController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    
    
    vm.submitAdvocate = function (objectTosend) {
    }

    // vm.editAdvocate = function (objectTosend){

    // }
});