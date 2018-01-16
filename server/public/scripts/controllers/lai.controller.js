myApp.controller('LaiController', function (UserService, FormService, $http, $mdDialog) {
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    //array for contact types drop down
    vm.contact = ['Police Report', 'Court', 'Restraining Order', 'Other'];
    //gets current form id from FormService
    vm.currentFormId = FormService.currentFormId;
    vm.isEditing = FormService.isEditing;

    //function to send new or updated legal advocacy form
    vm.sendLai = function(objectToSend){
        objectToSend.la_form_time = FormService.convertTime(objectToSend.la_form_time);
        FormService.sendFormUpdate(objectToSend, 'la').then(function () {
            FormService.checkConfirm('is_la_complete');
        }).then(function () {
            vm.closeForm();
        }).catch(function (error) {
            console.log('new La form not sent');
        });
    }

    //gets La form
    vm.getForm = function () {
        FormService.getForm('la');
    }
    vm.getForm();

    //closes form
    vm.closeForm = function () {
        $mdDialog.hide();
    }
    //sets is editing status to true when edit button is clicked
    vm.editMode = function () {
        vm.isEditing.editing = true;
    }
});