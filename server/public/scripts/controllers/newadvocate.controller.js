myApp.controller('NewAdController', function (UserService, FormService, $http) {
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
        $http.post('advocate/new', advocateToAdd).then(function (response) {
        }).catch(function (error) {
            console.log('failure', error);
        });
    }
    vm.newAdvocate = {
        spanish: false,
        somali: false,
        french: false,
        german: false,
        liberian: false,
        asl: false
    }

    vm.submitAdvocate = function (newAdvocate) {
        $http.post('/advocate/new/', newAdvocate).then(function (response) {
        }).catch(function (err) {
            console.log('Error submitting advocate', err);
        }
        )}
});