myApp.controller('LaiController', function (FormService, $http, $mdDialog) {
    console.log('LaiController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.contact = ['Police Report', 'Court', 'Restraining Order', 'Other'];
    //gets current form id from FormService
    vm.currentFormId = FormService.currentFormId;

    vm.sendLai = function(objectToSend){
        FormService.sendFormUpdate(objectToSend, 'la').then(function () {
            FormService.checkConfirm('is_la_complete');
        }).then(function () {
            vm.closeForm();
        }).catch(function (error) {
            console.log('new La form not sent');
        });
    }


    vm.getForm = function () {
        FormService.getForm('la');
    }

    vm.getForm();

    vm.closeForm = function () {
        $mdDialog.hide();
    }

});