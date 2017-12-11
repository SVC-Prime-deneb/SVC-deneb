myApp.controller('AdminController', function (FormService) {
    console.log('AdminController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});