myApp.controller('CaseController', function (FormService, $http, $mdDialog) {
    console.log('Caseontroller created');
    var vm = this;
    vm.formService = FormService;

    //function to set formId
    vm.saveFormId = function(id){
        FormService.saveFormId(id);
    }
    
    //function to show MA form popup
    vm.showMa = function(ev, id){
        console.log(id);
        vm.saveFormId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/maform.html',
            controller: 'MaController as mc',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        })
    }
    //function to show LA form popup
    vm.showLa = function (ev, id) {
        console.log(id);
        vm.saveFormId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/laiform.html',
            controller: 'LaiController as lc',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        })
    }
    //function to show Refer form popup
    vm.showRefer = function (ev, id) {
        console.log(id);
        vm.saveFormId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/releaseform.html',
            controller: 'ReleaseController as rc',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        })
    }

    //function to show Release form popup
    vm.showRelease= function (ev, id) {
        console.log(id);
        vm.saveFormId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/releaseinfoform.html',
            controller: 'ReleaseInfoController as ric',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        })
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