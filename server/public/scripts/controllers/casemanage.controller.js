myApp.controller('CaseController', function (FormService) {
    console.log('Caseontroller created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.showMa = function($event, id){

    }

    vm.showLa = function ($event, id) {

    }

    vm.showRefer = function ($event, id) {

    }

    vm.showRelease= function ($event, id) {

    }


});