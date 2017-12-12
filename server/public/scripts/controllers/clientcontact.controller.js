myApp.controller('CCController', function (FormService) {
    console.log('CCController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});