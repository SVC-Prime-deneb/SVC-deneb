myApp.controller('AdvocateController', function (FormService, $http, $mdDialog) {
    console.log('AdvocateController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.advocate = FormService.selectedAdvocate;
    vm.advocateList = FormService.advocateList;


    vm.advocate.data = {
        advocate_first_name: '',
        language: vm.languages,
        is_hcmc_approved: '',
        advocacy_start: '',
        allow_text: '',
        main_contact_phone: ''
    }

    vm.languages = [];
    // PUSH language to language array
    vm.pushLanguage = function (){
        if (spanish = true) {
            vm.languages.push(spanish);
        }
        if (somali = true) {
            m.languages.push(somali);
        }
        if (french = true) {
            vm.languages.push(french);
        }
        if (german = true) {
            vm.languages.push(german);
        }
        if (liberian = true) {
            vm.languages.push(liberian);
        }
        if (asl = true) {
            vm.languages.push(asl);
        }
        return vm.languages;
    }
    


    // VIEW advocates 
    vm.viewAdvocate = function () {
        $http.get('/advocate/get').then(function (response) {
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
        $http.delete('/advocate/delete' + advocateId).then(function (response) {
            console.log('success');
            vm.viewAdvocate();           
        }).catch(function (error) {
            console.log('failure', error);        
        });    
    }

    //EDIT Advocate
    vm.editAdvocate = function () {
        console.log('vm.advocate', vm.advocate);
        $http.put('/advocate/update' + advocate.id, vm.advocate).then(function (response){
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