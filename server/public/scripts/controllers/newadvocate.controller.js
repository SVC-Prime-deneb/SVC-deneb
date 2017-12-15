myApp.controller('NewAdController', function (FormService) {
    console.log('NewAdController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    
    FormService.selectedAdvocate.data = {
        advocate_first_name: '',
        advocate_last_name: '',
        advocacy_start: '',

    }
    // ADD advocate
    vm.addAdvocate = function (advocateToAdd, name, id) {
        console.log('name, id', name, id);
        $http.post('/newadvocate', advocateToAdd).then(function (response) {
            console.log('sucessful adding advocate');
            vm.viewAdvocate();
        }).catch(function (error) {
            console.log('failure', error);
        });
    }
});