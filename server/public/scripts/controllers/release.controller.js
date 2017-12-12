myApp.controller('ReleaseController', function (FormService) {
    console.log('ReleaseController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});