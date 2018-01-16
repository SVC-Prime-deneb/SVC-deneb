// AKA referral form
myApp.controller('ReleaseController', function (UserService, FormService, $http, $mdDialog) {
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.currentFormId = FormService.currentFormId;
    vm.isEditing = FormService.isEditing;

    //updates referral form to add new form or edit
    vm.sendRelease = function (objectToSend) {
        FormService.sendFormUpdate(objectToSend, 'referral').then(function () {
            FormService.checkConfirm('is_referral_complete');
        }).then(function () {
            vm.closeForm();
        }).catch(function (error) {
            console.log('new referral form not sent');
        });
    }
    //gets referral form
    vm.getForm = function () {
        FormService.getForm('referral');
    }

    vm.getForm();
    //closes modal
    vm.closeForm = function () {
        $mdDialog.hide();
    }

    //changes is editing to true when edit button is clicked
    vm.editMode = function () {
        vm.isEditing.editing = true;
    }
});