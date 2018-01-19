myApp.service('FormService', function ($http, $location, $mdDialog) {
    var self = this;
    self.FormObject = {};

    self.updatedAdvocate = {};
    self.updatedAdmin = {};
    self.advocateList;
    self.selectedAdvocate = { data: {} };

    // Hold advocateId of the row that was clicked
    self.currentAdvocateId = { currentId: 0 };

    //holds info about editing or not for dialog displays
    self.isEditing = {editing: false};
    
    // array of selected advocates for dispatch
    self.advocateDispatchArray = {data: []};

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
        return $http.get('/case/form').then(function (response) {
            self.caseObject.cases = response.data;
        }).catch(function (error) {
            console.log('failure on GET Case Route');
        });
    }
    

    // EDIT ADVOCATE
    self.editAdvocate = function (advocate) {
        self.updatedAdvocate = advocate;
    }

    //EDIT ADMIN
    self.editAdmin = function (admin) {
        self.updatedAdmin = admin;
        
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
            if(form === 'green'){
                self.selectedForm.form = hospitalName(response.data[0]);
            }
            else {
                self.selectedForm.form = response.data;
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
        //send name of form and true or false (complete or not)
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
    //function to determine if dialog box is editing or viewing
    self.checkEdit = function (stateIn) {
        console.log(stateIn);
        if (stateIn === 'edit') {
            self.isEditing.editing = true;
        } if (stateIn === 'view') {
            self.isEditing.editing = false;
        }
    }

    //converts time to time stamp in ma form, la form and green form
    self.convertTime = function (timeIn) {
        var convertedTime = moment(timeIn).format('YYYY-MM-DD HH:mm:ss');
        return convertedTime;
    }

    // GET advocates 
    self.viewAdvocate = function () {
    return $http.get('/advocate/get').then(function (response) {
        self.advocateList = languageSort(response.data);        
        topFive(self.advocateList);    
        }).catch(function (error) {
            console.log('failureee', error);
        });
    }

    // edit advocates
    self.updateAdvocate = function (id, objectIn) {
        $http.put('/advocate/update/' + id, objectIn).then(function (response) {
        }).catch(function (error) {
            console.log('failure', error);
        });
    }

    self.updateAdmin = function (id, objectIn) {
        $http.put('/admin/update/' + id, objectIn).then(function (response) {
        }).catch(function (error) {
            console.log('failure', error);
        });
    }

    //updated date when dispatched
    self.updateDate = function (id, date) {
        $http.put('/advocate/update/last/' + id, {date}).then(function (response) {
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

//function to auto select 0-4 in array of advocates
var topFive = function (arrayIn) {
    for (var i = 0; i < arrayIn.length; i++) {
        if (i < 5) {
            arrayIn[i].selected = true;
        }
    }
}

var hospitalName = function (objectIn){
    switch(objectIn.location_id){
    case 1: 
        objectIn.hospital = 'Fairview - Southdale';
        break;
    case 2: 
        objectIn.hospital = 'Methodist';
        break;
    case 3:
        objectIn.hospital = 'HCMC';
        break;
    case 4:
        objectIn.hospital = 'Nort Memorial';
        break;
    case 5:
        objectIn.hospital = 'Abbott Northwestern';
        break;
    case 6:
        objectIn.hospital = 'West Health';
        break;
    case 7:
        objectIn.hospital = 'Maple Grove';
        break;
    case 8:
        objectIn.hospital = 'St. Francis';
        break;
    case 9:
        objectIn.hospital = 'Ridgeview- Waconia';
        break;
    case 10:
        objectIn.hospital = '212';
        break;
    case 11:
        objectIn.hospital = 'New Prague';
        break;
    }
    return objectIn;
}


