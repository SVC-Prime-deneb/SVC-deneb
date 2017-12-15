myApp.controller('NewAdController', function (FormService, $http) {
    console.log('NewAdController created');
    var vm = this;
    // vm.formService = FormService;
    // vm.formObject = FormService.formObject;
    var advocateObject = {

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
        console.log('newAdvocate', newAdvocate);

        $http.post('/advocate/new/', newAdvocate).then(function (response) {
           

        }).catch(function (err) {
        }
        )}
});