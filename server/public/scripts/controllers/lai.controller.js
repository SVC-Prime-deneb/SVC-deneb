myApp.controller('LaiController', function (FormService, $http, $mdDialog) {
    console.log('LaiController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.contact = ['Police Report', 'Court', 'Restraining Order', 'Other'];
    //gets current form id from FormService
    vm.currentFormId = FormService.currentFormId;

    vm.sendLai = function (objectToSend) {
        console.log(objectToSend);
        $http.put('/case/update/la/' + vm.currentFormId.currentId, objectToSend).then(function (response) {
            console.log('new La form sent');
            $mdDialog.hide();
        }).catch(function (error) {
            console.log('new LA form not sent');
        })
    }

});