myApp.controller('AdvocateController', function (FormService, $http, $mdDialog) {
    console.log('AdvocateController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.advocate = FormService.selectedAdvocate;
    vm.advocateList = FormService.advocateList;


    vm.advocate.data = {
        advocate_first_name: '',
        language: [],
        is_hcmc_approved: '',
        advocacy_start: '',
        allow_text: '',
        main_contact_phone: ''
    }

    // VIEW advocates 
    vm.viewAdvocate = function () {
        $http.get('/advocatemanage').then(function (response) {
            console.log('success');
            vm.advocateList.data = response.data;
            console.log('advocateList', vm.advocateList);
            // getUser();           
        }).catch(function(error){
            console.log('failureee', error);           
        });
    }

    // vm.userInfo = {};

    // function getUser(){
    //     $http.get('/user').then(function(response){
    //         console.log('successful User', response);
    //         vm.userInfo = response.data;
    //     }).catch(function(error){
    //         console.log('failureee', error);            
    //     });
    // }




    // DELETE advocate
    vm.deleteAdvocate = function (advocateId) {
        console.log('deleted', advocateId);
        $http.delete('/advocatemanage/' + advocateId).then(function (response) {
            console.log('success');
            vm.viewAdvocate();           
        }).catch(function (error) {
            console.log('failure', error);        
        });    
    }

    //EDIT Advocate
    vm.editAdvocate = function () {
        console.log('vm.advocate', vm.advocate);
        $http.put('/advocatemanage/' + advocate.id, vm.advocate).then(function (response){
            console.log('success');
            vm.viewAdvocate();
            $mdDialog.hide();
        }).catch(function (error) {
            console.log('failure', error);         
        });        
    }

    // EDIT Clicked
    // vm.editClicked = function ()
    //     FormService.selectedAdvocate.data = {

    //     }



    vm.viewAdvocate();
});