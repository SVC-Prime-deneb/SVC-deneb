myApp.controller('AdvocateController', function (FormService, $http, $mdDialog) {
    console.log('AdvocateController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.advocate = FormService.selectedAdvocate;
    vm.advocateList = FormService.advocateList;
    // data = {
    //     advocate_first_name: '',
    //     advocate_last_name: '',
    //     language: vm.languages,
    //     is_hcmc_approved: false,
    //     advocacy_start: '',
    //     allow_text: '',
    //     main_contact_phone: ''
    // }

    vm.myAdvocateList = [];
    vm.languages = [];

    // Column sorting
    vm.sortColumn = "advocate_first_name";
    vm.reverseSort = false;

    vm.sortData = function (column) {
        if (vm.sortColumn == column) {
            return vm.reverseSort ? 'arrow-down' : 'arrow-up';
        }
            return '';
    }

    vm.getSortClass = function (column) {
        if (vm.sortColumn == column) {
            return vm.reverseSort ? 'arrow-down' : 'arrow-up';
        }
        return '';
    }

    // VIEW advocates 
    vm.viewAdvocate = function () {
        $http.get('/advocate/get').then(function (response) {
            console.log('success');
            vm.advocateList.data = response.data;

            console.log('advocateList.data.length', vm.advocateList.data.length);
            console.log('advocateList.data', vm.advocateList.data);
            
            for (var i = 0; i < vm.advocateList.data.length; i++){
                console.log('advocate first name:', vm.advocateList.data[i].advocate_first_name);
                vm.languages = [];
                var tempData = {};
                tempData.advocate_first_name = vm.advocateList.data[i].advocate_first_name;
                tempData.advocate_last_name = vm.advocateList.data[i].advocate_last_name;
                tempData.advocacy_start = vm.advocateList.data[i].advocacy_start;
                if (vm.advocateList.data[i].is_hcmc_approved){
                    tempData.is_hcmc_approved = true;
                }
                else{
                    tempData.is_hcmc_approved = false;
                }
                tempData.allow_text = vm.advocateList.data[i].allow_text;
                tempData.main_contact_phone = vm.advocateList.data[i].main_contact_phone;
                if (vm.advocateList.data[i].asl) {
                    vm.languages.push("ASL");
                }
                if (vm.advocateList.data[i].french) {
                    vm.languages.push("French");
                }
                if (vm.advocateList.data[i].german) {
                    vm.languages.push("German");
                }
                if (vm.advocateList.data[i].liberian) {
                    vm.languages.push("Liberian");
                }
                if (vm.advocateList.data[i].somali) {
                    vm.languages.push("Somalian");
                }
                if (vm.advocateList.data[i].spanish) {
                    vm.languages.push("Spanish");
                }
                if (vm.advocateList.data[i].other_language != null) {
                    vm.languages.push(vm.advocateList.data[i].other_language);
                }
                tempData.language = vm.languages;
                vm.myAdvocateList.push(tempData);                            
            }   
            
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