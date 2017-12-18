// AKA referral form
myApp.controller('ReleaseController', function (FormService, $http, $mdDialog) {
    console.log('ReleaseController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.currentFormId = FormService.currentFormId;

    vm.sendRelease = function (objectToSend) {
        FormService.sendFormUpdate(objectToSend, 'referral').then(function () {
            vm.closeForm();
        });
    }

    vm.getForm = function () {
        FormService.getForm('referral');
    }

    vm.getForm();

    vm.closeForm = function () {
        $mdDialog.hide();
    }
});