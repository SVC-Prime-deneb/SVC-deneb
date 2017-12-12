myApp.controller('GreenController', function (FormService) {
    console.log('GreenController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});