// controller for casemanage.html
myApp.controller('CaseController', function (FormService, $http, $mdDialog) {
    console.log('Caseontroller created');
    var vm = this;
    vm.formService = FormService;

    //function to show MA form popup
    vm.showMa = function (ev, id) {
        FormService.showMa(ev, id);
    }

    //function to show LA form popup
    vm.showLa = function (ev, id) {
        FormService.showLa(ev, id);
    }

    //function to show Refer form popup
    vm.showRefer = function (ev, id) {
        FormService.showRefer(ev, id);
    }

    //function to show Release form popup
    vm.showRelease = function (ev, id) {
        FormService.showRelease(ev, id);
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