myApp.controller('ReleaseInfoController', function (UserService, FormService, $http, $mdDialog) {
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.currentFormId = FormService.currentFormId;
    vm.isEditing = FormService.isEditing;

    //edit or new release form function
    vm.sendRelease = function (objectToSend) {
        FormService.sendFormUpdate(objectToSend, 'release').then(function () {
            FormService.checkConfirm('is_release_complete');
        }).then(function () {
            vm.closeForm();
        }).catch(function (error) {
            console.log('new release form not sent');
        });

    }
    //get release form
    vm.getForm = function () {
        FormService.getForm('release');
    }
    vm.getForm();

    //function to close form
    vm.closeForm = function () {
        $mdDialog.hide();
    }
    //edit mode when edit button is clicked
    vm.editMode = function(){
        vm.isEditing.editing = true;
    }
    
});