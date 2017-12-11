myApp.controller('BillController', function (FormService) {
    console.log('BillController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});