myApp.controller('DispatchController', function (FormService) {
    console.log('DispatchController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});