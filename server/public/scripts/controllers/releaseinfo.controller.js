myApp.controller('ReleaseInfoController', function (FormService, $http, $mdDialog) {
    console.log('ReleaseInfoController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.currentFormId = FormService.currentFormId;

    vm.sendRelease = function (objectToSend) {
        console.log(objectToSend);
        $http.put('/case/update/la/' + vm.currentFormId.currentId, objectToSend).then(function (response) {
            console.log('new Release form sent');
            $mdDialog.hide();
        }).catch(function (error) {
            console.log('new Release form not sent');
        })
    }
});