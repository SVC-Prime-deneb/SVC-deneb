myApp.controller('ReleaseInfoController', function (FormService, $http, $mdDialog) {
    console.log('ReleaseInfoController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.currentFormId = FormService.currentFormId;

    vm.sendRelease = function (objectToSend) {
        FormService.sendFormUpdate(objectToSend, 'release').then(function () {
            vm.closeForm();
        });
    }

    vm.getForm = function () {
        FormService.getForm('release');
    }

    vm.getForm();

    vm.closeForm = function () {
        $mdDialog.hide();
    }

});