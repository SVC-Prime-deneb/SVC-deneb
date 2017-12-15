myApp.controller('EditAdController', function (FormService) {
    console.log('EditAdController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;


    // VIEW advocates 
    vm.viewAdvocate = function () {
        $http.get('/advocate/get').then(function (response) {
            console.log('success');
            vm.advocateList.data = response.data;
            vm.myAdvocateList = [];
            console.log('advocateList.data.length', vm.advocateList.data.length);
            console.log('advocateList.data', vm.advocateList.data);

            for (var i = 0; i < vm.advocateList.data.length; i++) {
                console.log('advocate first name:', vm.advocateList.data[i].advocate_first_name);
                vm.languages = [];
                var tempData = {};
                tempData.advocate_id = vm.advocateList.data[i].advocate_id;
                tempData.advocate_first_name = vm.advocateList.data[i].advocate_first_name;
                tempData.advocate_last_name = vm.advocateList.data[i].advocate_last_name;
                tempData.advocacy_start = vm.advocateList.data[i].advocacy_start;
                if (vm.advocateList.data[i].is_hcmc_approved) {
                    tempData.is_hcmc_approved = true;
                }
                else {
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
        }).catch(function (error) {
            console.log('failureee', error);
        });
    }


    vm.showAdvocateForm = function (ev, id) {
        FormService.showAdvocateForm(ev, id);
    }

    
    // EDIT ADVOCATE
    vm.editAdvocate = function (updatedAdvocateId){
        console.log('id', updatedAdvocateId);
        $http.put('/advocate/update/' + updatedAdvocateId).then(function (response){
            console.log('success updating Advocate Info');
            $mdDialog.hide();
            vm.viewAdvocate();
            
        }).catch(function (error){
            console.log('failure', error);
            $mdDialog.hide();
            
        });
    }
});
