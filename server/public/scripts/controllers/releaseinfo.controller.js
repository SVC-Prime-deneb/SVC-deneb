myApp.controller('ReleaseInfoController', function (UserService, FormService, $http, $mdDialog) {
    console.log('ReleaseInfoController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.currentFormId = FormService.currentFormId;
    vm.isEditing = FormService.isEditing;

    vm.sendRelease = function (objectToSend) {
        FormService.sendFormUpdate(objectToSend, 'release').then(function () {
            FormService.checkConfirm('is_release_complete');
        }).then(function () {
            vm.closeForm();
        }).catch(function (error) {
            console.log('new release form not sent');
        });

    }

    vm.getForm = function () {
        FormService.getForm('release');
    }

    vm.getForm();

    vm.closeForm = function () {
        $mdDialog.hide();
    }
    vm.editMode = function(){
        vm.isEditing.editing = true;
    }
    
});