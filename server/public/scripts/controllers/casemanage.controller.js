myApp.controller('CaseController', function (FormService, $http, $mdDialog) {
    console.log('Caseontroller created');
    var vm = this;
    vm.formService = FormService;

    //function to set formId
    // vm.saveFormId = function (id) {
    //     FormService.saveFormId(id);
    // }

    //function to show MA form popup
    vm.showMa = function (ev, id) {
        FormService.showMa(ev, id);
    }

    //function to show LA form popup
    vm.showLa = function (ev, id) {
        FormService.showLa(ev,id);
    }

    //function to show Refer form popup
    vm.showRefer = function (ev, id) {
        FormService.showRefer(ev, id);
    }

    //function to show Release form popup
    vm.showRelease = function (ev, id) {
        FormService.showRelease(ev, id);
    }

    vm.getCases = function () {
        $http.get('/case/form').then(function (response) {
            vm.caseObject = response.data;
            console.log(vm.caseObject);
        }).catch(function (error) {
            console.log('failure on GET Case Route');
        });
    }

    vm.getCases();

    vm.checkClicked = function(id, value, name){
        var objectTosend = {
            formName: name,
            formValue: !value
        }
        $http.put('/case/update/checkbox/' + id, objectTosend).then(function (response) {
            console.log('updated', name);
        }).catch(function (error) {
            console.log('update not sent :(');
        })
    }

});