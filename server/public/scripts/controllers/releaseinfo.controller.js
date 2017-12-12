myApp.controller('ReleaseInfoController', function (FormService) {
    console.log('ReleaseInfoController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});