myApp.controller('GreenFormController', function (FormService, $mdDialog) {
    console.log('GreenFormController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    //holds current form ID
    vm.currentFormId = FormService.currentFormId;
    //holds selected form from get route
    vm.selectedForm = FormService.selectedForm;

    vm.getForm = function () {
        FormService.getForm('green');
    }

    vm.getForm();

    vm.closeForm = function () {
        $mdDialog.hide();
    }
});