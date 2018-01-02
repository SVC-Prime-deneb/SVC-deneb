myApp.service('FormService', function ($http, $location, $mdDialog) {
    console.log('FormService Loaded');
    var self = this;
    self.FormObject = {};

    self.updatedAdvocate = {};
    self.advocateList;
    self.selectedAdvocate = { data: {} };

    // Hold advocateId of the row that was clicked
    self.currentAdvocateId = { currentId: 0 };

    //holds info about editing or not for dialog displays
    self.isEditing = {editing: false};
    
    // array of selected advocates for dispatch
    self.advocateDispatchArray = {data: []};

    // // Function to set current advocateId
    // self.saveAdvocateId = function(id) {
    //     self.currentAdvocateId.currentId = id;
    //     console.log('self.currentId', self.currentAdvocateId);     
    // }

    // // Show Edit Advocate Dialog function
    // self.showAdvocateForm = function (ev, id) {
    //     self.saveAdvocateId(id);
    //     $mdDialog.show({
    //         templateUrl: '../views/partials/editadvocate.html',
    //         controller: 'EditAdController as eac',
    //         parent: angular.element(document.body),
    //         targetEvent: ev,
    //         clickOutsideToClose: true,
    //     })
    // }

    //holds formId of the form that was clicked
    self.currentFormId = { currentId: 0 };
    self.caseObject = { cases: [] };
    self.selectedForm = { form: [] };

    //function to save current formId
    self.saveFormId = function (id) {
        self.currentFormId.currentId = id;
    }

    //function to show green release form popup
    self.showGreen = function (ev, id) {
        self.saveFormId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/greenform.html',
            controller: 'GreenFormController as gc',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        });
    }

    //show medical advocate dialog function
    self.showMa = function (ev, id, typeIn) {
        self.checkEdit(typeIn);
        self.saveFormId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/maform.html',
            controller: 'MaController as mc',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        });
    }

    //show legal advocate dialog function
    self.showLa = function (ev, id, typeIn) {
        self.checkEdit(typeIn);
        self.saveFormId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/laiform.html',
            controller: 'LaiController as lc',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        })
    }

    //show referral form dialog function
    self.showRefer = function (ev, id, typeIn) {
        self.checkEdit(typeIn);
        self.saveFormId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/releaseform.html',
            controller: 'ReleaseController as rc',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        })
    }
    //show release form dialog function
    self.showRelease = function (ev, id, typeIn) {
        self.checkEdit(typeIn);
        self.saveFormId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/releaseinfoform.html',
            controller: 'ReleaseInfoController as ric',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        })
    }

    //show release form dialog function
    self.showDispatch = function (ev, array) {
        self.advocateDispatchArray.data = array;
        $mdDialog.show({
            templateUrl: '../views/partials/dispatchdialog.html',
            controller: 'DispatchDialogController as ddc',
            parent: angular.element(document.body),
            targetEvent: ev,
        })
    }

    //get route for all cases
    self.getCases = function () {
        $http.get('/case/form').then(function (response) {
            self.caseObject.cases = response.data;
        }).catch(function (error) {
            console.log('failure on GET Case Route');
        });
    }
    

    // EDIT ADVOCATE
    self.editAdvocate = function (advocate) {
        // console.log('Edit advocate on Form Services was called', advocate);
        self.updatedAdvocate = advocate;
    }

    //get route for specific form that was selected
    self.getForm = function (form) {
        $http.get('/case/' + form + '/' + self.currentFormId.currentId).then(function (response) {
            if (form === 'ma') {
                self.selectedForm.form = objectAccept(response.data[0]);
                // self.selectedForm.form = response.data;
            } if(form === 'la') {
                response.data[0].la_form_time = new Date(response.data[0].la_form_time);
                self.selectedForm.form = [response.data[0]];
            } 
            else {
                self.selectedForm.form = response.data;
                console.log(response.data);
            }
        }).catch(function (error) {
            console.log('failure on get Form Route');
        });
    }

    //get route for search functionality
    self.searchCase = function (datesIn) {
        console.log(datesIn);
        $http.get('/case/form/search', { params: datesIn }).then(function (response) {
            self.caseObject.cases = response.data;
        }).catch(function (error) {
            console.log('failure on get Search Route');
        });
    }

    //route to update if selected form is complete from case management
    self.checkClicked = function (id, value, name) {
        var objectTosend = {
            formName: name,
            formValue: !value
        }
        
        $http.put('/case/update/checkbox/' + id, objectTosend).then(function (response) {
            self.getCases();
        }).catch(function (error) {
            console.log('update not sent :(');
        })
    }
    //route to update if selected form is complete from dialog box
    self.checkConfirm = function (name) {
        
        var objectTosend = {
            formName: name,
            formValue: true
        }

        $http.put('/case/update/checkbox/' + self.currentFormId.currentId, objectTosend).then(function (response) {
            self.getCases();
        }).catch(function (error) {
            console.log('update not sent :(');
        })
    }

    //put route for medical advocate, legal advocate, referral, and release forms (for new forms and updated forms)
    self.sendFormUpdate = function (objectToSend, form) {
        return $http.put('/case/update/' + form + '/' + self.currentFormId.currentId, objectToSend).then(function (response) {
        }).catch(function (error) {
            console.log('new form not sent');
        })
    }

    self.checkEdit = function (stateIn) {
        console.log(stateIn);
        if (stateIn === 'edit') {
            console.log('editing');
            self.isEditing.editing = true;
        } if (stateIn === 'view') {
            console.log('viewing');

            self.isEditing.editing = false;
        }
    }

    //converts time to time stamp in ma form/ la form and green form
    self.convertTime = function (timeIn) {
        var convertedTime = moment(timeIn).format('YYYY-MM-DD HH:mm:ss');
        return convertedTime;
    }

    // GET advocates 
    self.viewAdvocate = function () {
    return $http.get('/advocate/get').then(function (response) {
        self.advocateList = languageSort(response.data);            
        }).catch(function (error) {
            console.log('failureee', error);
        });
    }

    // edit advocates
    self.updateAdvocate = function (id, objectIn) {
        $http.put('/advocate/update/' + id, objectIn).then(function (response) {
            console.log('success updating existing advocate');
        }).catch(function (error) {
            console.log('failure', error);
        });
    }

});

// function to sort advocate languages for display
var languageSort = function (arrayIn) {
    for (var i = 0; i < arrayIn.length; i++) {
        // adding another property to the object
        arrayIn[i].languageList = [];
        self.languages = [];
        if (arrayIn[i].asl) {
            self.languages.push("ASL");
        }
        if (arrayIn[i].french) {
            self.languages.push("French");
        }
        if (arrayIn[i].german) {
            self.languages.push("German");
        }
        if (arrayIn[i].liberian) {
            self.languages.push("Liberian");
        }
        if (arrayIn[i].somali) {
            self.languages.push("Somalian");
        }
        if (arrayIn[i].spanish) {
            self.languages.push("Spanish");
        }
        if (arrayIn[i].other_language != null) {
            self.languages.push(arrayIn[i].other_language);
        }
        arrayIn[i].languageList = self.languages;
        // console.log('Display Advocate Phone', self.advocateList.data[i].main_contact_phone);
    }
    return arrayIn;
}


//function to translate victimization object sent into a form friendly form to display and edit
var objectAccept = function (objectIn) {
    objectIn.ma_form_time = new Date(objectIn.ma_form_time);
    if(objectIn.was_adult_sexual_assault === true) {
        objectIn.victimization = "Adult Sexual Assault";
    } 
    else if (objectIn.was_sexual_exploitation === true){
        objectIn.victimization = 'Sexual Exploitation';
    }
    else if (objectIn.was_minor_other === true){
        objectIn.victimization = 'Minor-CSA';
    }
    else if (objectIn.was_minor_family === true){
        objectIn.victimization = 'Family/Minor-CSA';
    }
    else if (objectIn.was_other === true){
        objectIn.victimization = 'Other';
    }
    return objectIn = [objectIn];
}


