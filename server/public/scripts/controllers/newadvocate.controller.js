myApp.controller('NewAdController', function (FormService) {
    console.log('NewAdController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});