myApp.controller('GreenFormController', function (UserService, FormService, $mdDialog) {
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    //holds current form ID
    vm.currentFormId = FormService.currentFormId;
    //holds selected form from get route
    vm.selectedForm = FormService.selectedForm;

    //getroute for green form
    vm.getForm = function () {
        FormService.getForm('green');
    }
    vm.getForm();

    //function to close form
    vm.closeForm = function () {
        $mdDialog.hide();
    }
});