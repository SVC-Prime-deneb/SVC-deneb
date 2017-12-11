myApp.controller('CaseController', function (FormService) {
    console.log('Caseontroller created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
});