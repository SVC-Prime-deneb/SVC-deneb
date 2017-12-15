myApp.service('FormService', function ($http, $location, $mdDialog) {
    console.log('FormService Loaded');
    var self = this;
    self.FormObject = {};

    self.advocateList = {data: []};
    self.selectedAdvocate = {data: {}};

    // Hold advocateId of the row that was clicked
    self.currentAdvocateId = {currentId: 0};

    // Function to set current advocateId
    self.saveAdvocateId = function(id) {
        self.currentAdvocateId.currentId = id;
        console.log('self.currentId', self.currentAdvocateId);     
    }

    // Show Edit Advocate Dialog function
    self.showAdvocateForm = function (ev, id) {
        self.saveAdvocateId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/editadvocate.html',
            controller: 'EditAdController as eac',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        })
    }
    

    
    // Get route for Advocates (saved to case)
    self.getCases = function () {
        $http.get('/case/form').then(function (response) {
            self.caseObject.cases = response.data;
        }).catch(function (error) {
            console.log('failure on GET Case Route');
        });
    }
    
    //holds formId of the form that was clicked
    self.currentFormId = {currentId: 0};
    self.caseObject = {cases: []};

    //function to set current formId
    self.saveFormId = function(id){
        self.currentFormId.currentId = id; 
        console.log(self.currentFormId);
    }

    //show medical advocate dialog function
    self.showMa = function (ev, id) {
        self.saveFormId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/maform.html',
            controller: 'MaController as mc',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        })
    }

    //show legal advocate dialog function
    self.showLa = function (ev, id) {
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
    self.showRefer = function (ev, id) {
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
    self.showRelease = function (ev, id) {
        self.saveFormId(id);
        $mdDialog.show({
            templateUrl: '../views/partials/releaseinfoform.html',
            controller: 'ReleaseInfoController as ric',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
        })
    }

    //get route for cases (saved to case)
    self.getCases = function () {
        $http.get('/case/form').then(function (response) {
            self.caseObject.cases = response.data;
        }).catch(function (error) {
            console.log('failure on GET Case Route');
        });
    }

    // VIEW advocates 
    self.viewAdvocate = function () {
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

            // getUser();           
        }).catch(function (error) {
            console.log('failureee', error);
        });
    }


    // // EDIT ADVOCATE
    // vm.editAdvocate = function (updatedAdvocateId) {
    //     console.log('id', updatedAdvocateId);
    //     $http.put('/advocate/update/' + updatedAdvocateId).then(function (response) {
    //         console.log('success updating Advocate Info');
    //         vm.viewAdvocate();

    //     }).catch(function (error) {
    //         console.log('failure', error);

    //     });
    // }

    //route to update
    self.checkClicked = function (id, value, name) {
        var objectTosend = {
            formName: name,
            formValue: !value
        }
        $http.put('/case/update/checkbox/' + id, objectTosend).then(function (response) {
            console.log('updated', name);
        }).catch(function (error) {
            console.log('update not sent :(');
        })
    }

});
