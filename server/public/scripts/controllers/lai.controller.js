myApp.controller('LaiController', function (FormService) {
    console.log('LaiController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});