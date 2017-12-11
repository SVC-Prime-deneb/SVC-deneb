myApp.controller('MaController', function (FormService) {
    console.log('MaController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});