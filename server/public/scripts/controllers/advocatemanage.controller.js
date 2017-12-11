myApp.controller('AdvocateController', function (FormService) {
    console.log('AdvocateController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});