// controller for casemanage.html
myApp.controller('CaseController', function (FormService, $http, $mdDialog) {
    console.log('Caseontroller created');
    var vm = this;
    vm.formService = FormService;

    //function to show MA form popup
    vm.showMa = function (ev, id, type) {
        FormService.showMa(ev, id, type);
    }

    //function to show LA form popup
    vm.showLa = function (ev, id, type) {
        FormService.showLa(ev, id, type);
    }

    //function to show Refer form popup
    vm.showRefer = function (ev, id, type) {
        FormService.showRefer(ev, id, type);
    }

    //function to show Release form popup
    vm.showRelease = function (ev, id, type) {
        FormService.showRelease(ev, id, type);
    }

    //get route to populate cases
    vm.getCases = function () {
        FormService.getCases();
    }
    //route to get all cases
    vm.getCases();

    //checkbox clicked function, sets each clicked form as complete or incomplete according to the checkbox status 
    //put route
    vm.checkClicked = function (id, value, name) {
        FormService.checkClicked(id, value, name);

    }

});