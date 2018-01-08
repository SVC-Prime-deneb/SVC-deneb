// controller for maform.html
myApp.controller('MaController', function (UserService, FormService, $http, $mdDialog) {
    console.log('MaController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    //holds current form ID
    vm.currentFormId = FormService.currentFormId;
    //holds selected form from get route
    vm.selectedForm = FormService.selectedForm;
    vm.isEditing = FormService.isEditing;
    
    //arrays for drop downs
    vm.victimization = ['Adult Sexual Assault', 'Sexual Exploitation', 'Minor-CSA', 'Family/Minor-CSA', 'Other' ];
    // note: may need an Other option here
    vm.services = ['1:1','Legal Advocacy','Support Group', 'Other'];
    
    //submit a new Medical Advocate form or update 
    //checks form off automatically
    vm.submitNewMa= function(objectToSend) {
        objectToSend.ma_form_time = FormService.convertTime(objectToSend.ma_form_time);
        objectToSend = objectBuilder(objectToSend);
        FormService.sendFormUpdate(objectToSend, 'ma').then(function () {
            FormService.checkConfirm('is_ma_complete');
        }).then(function(){
            vm.closeForm();
        }).catch(function (error) {
                console.log('new MA form not sent');
            });
    }



    //get selected case form information for ma
    vm.getForm = function(){
        FormService.getForm('ma');
    }

    vm.getForm();

    //funtion to close the dialog
    vm.closeForm = function () {
        $mdDialog.hide();
    }

    vm.editMode = function () {
        vm.isEditing.editing = true;
    }
});

var convertTime = function (timeIn) {
    var convertedTime = moment(timeIn).format("H HH");
    console.log(convertedTime);
}

//function to translate the victimization selection into a SQL friendly object
var objectBuilder = function(objectIn){
    switch (objectIn.victimization) {
        case 'Adult Sexual Assault':
            objectIn.victimization = {was_adult_sexual_assault: true};
            break;
        case 'Sexual Exploitation':
            objectIn.victimization = { was_sexual_exploitation: true };
            break;
        case 'Minor-CSA':
            objectIn.victimization = { was_minor_other: true };
            break;
        case 'Family/Minor-CSA':
            objectIn.victimization = { was_minor_family: true };
            break;
        case 'Other': 
            objectIn.victimization = { was_other: true };
            break;
            
    }
    return objectIn;
}