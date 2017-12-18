myApp.controller('EditAdController', function ($http, FormService, $routeParams) {
    console.log('EditAdController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.updatedAdvocate = {};




    // vm.showAdvocateForm = function (ev, id) {
    //     FormService.showAdvocateForm(ev, id);
    // }

    
    // EDIT ADVOCATE
    vm.editAdvocate = function (){
        // console.log('Edit Advocate controller was called');
        vm.updatedAdvocate = vm.formService.updatedAdvocate;
        // console.log('Success', vm.updatedAdvocate);
       
    }
    
    // UPDATE ADVOCATE
    vm.updateAdvocate = function () {
        $http.put('/editadvocate/update/' + vm.updatedAdvocate.advocate_id, vm.updatedAdvocate).then(function (response) {
            console.log('success updating existing advocate');
            
        }).catch(function (error) {
            console.log('failure', error);
            
        });
        
    }
    
    
    
    vm.editAdvocate();

    
});
