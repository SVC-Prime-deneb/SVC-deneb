// AKA referral form
myApp.controller('ReleaseController', function (UserService, FormService, $http, $mdDialog) {
    console.log('ReleaseController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.currentFormId = FormService.currentFormId;
    vm.isEditing = FormService.isEditing;

    vm.sendRelease = function (objectToSend) {
        FormService.sendFormUpdate(objectToSend, 'referral').then(function () {
            FormService.checkConfirm('is_referral_complete');
        }).then(function () {
            vm.closeForm();
        }).catch(function (error) {
            console.log('new referral form not sent');
        });
    }

    vm.getForm = function () {
        FormService.getForm('referral');
    }

    vm.getForm();

    vm.closeForm = function () {
        $mdDialog.hide();
    }

    vm.editMode = function () {
        vm.isEditing.editing = true;
    }
});