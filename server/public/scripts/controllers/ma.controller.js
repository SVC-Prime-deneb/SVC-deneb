myApp.controller('MaController', function (FormService, $http, $mdDialog) {
    console.log('MaController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.currentFormId = FormService.currentFormId;
    vm.selectedForm = FormService.selectedForm;
    vm.victimization = [{string: 'Adult Sexual Assault', was_adult_sexual_assault: true}, {string: 'Sexual Exploitation', was_sexual_exploitation: true}, {string: 'Minor-CSA', was_minor_other: true}, {string: 'Family/Minor-CSA', was_minor_family: true}, {string: 'Other', was_other: true}];
    vm.services = ['1:1','Legal Advocacy','Support Group'];
    
    vm.submitNewMa= function(objectToSend) {
        console.log(objectToSend);
        $http.put('/case/update/ma/' + vm.currentFormId.currentId, objectToSend).then(function (response) {
            console.log('new MA form sent');
            $mdDialog.hide();
        }).catch(function (error) {
            console.log('new MA form not sent');
        })
    }

    vm.getForm = function(){
        FormService.getForm('ma');
    }

    vm.getForm();



});