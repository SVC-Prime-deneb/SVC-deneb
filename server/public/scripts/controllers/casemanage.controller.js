myApp.controller('CaseController', function (FormService, $http) {
    console.log('Caseontroller created');
    var vm = this;
    vm.formService = FormService;

    //function to show MA form popup
    vm.showMa = function($event, id){

    }
    //function to show LA form popup
    vm.showLa = function ($event, id) {

    }
    //function to show Refer form popup
    vm.showRefer = function ($event, id) {

    }
    //function to show Release form popup
    vm.showRelease= function ($event, id) {

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


});