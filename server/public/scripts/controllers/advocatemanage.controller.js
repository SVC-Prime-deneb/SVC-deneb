myApp.controller('AdvocateController', function (FormService, $http, $mdDialog) {
    console.log('AdvocateController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.advocate = FormService.selectedAdvocate;
    vm.advocateList = FormService.advocateList;
    
    // Column sorting
    vm.sortColumn = "advocate_first_name";
    vm.reverseSort = false;

    vm.sortData = function (column) {
        vm.reverseSort = (vm.sortColumn == column) ? !vm.reverseSort : false;
        vm.sortColumn = column;
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
            vm.advocateList.data = response.data;
            // console.log('Display Advocate', vm.advocateList.data);
            for (var i = 0; i < vm.advocateList.data.length; i++){
                // adding another property to the object
                vm.advocateList.data[i].languageList= [];
                vm.languages = [];
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
                vm.advocateList.data[i].languageList = vm.languages; 
                // console.log('Display Advocate Phone', vm.advocateList.data[i].main_contact_phone);
            }   
            
            // getUser();           
        }).catch(function(error){
            console.log('failureee', error);           
        });
    }

    // DELETE advocate
    vm.deleteAdvocate = function (advocateId) {
        console.log('deleted', advocateId);
        $http.delete('/advocate/del/' + advocateId).then(function (response) {
            console.log('success');
            vm.viewAdvocate();           
        }).catch(function (error) {
            console.log('failure', error);        
        });    
    }

    // EDIT Advocate
    vm.editAdvocate = function (advocate) {
        // console.log('sending advocate to edit_Advocate controller', advocate);
        vm.formService.editAdvocate(advocate);
        // console.log('Finish sending');
    }

    vm.viewAdvocate();
});