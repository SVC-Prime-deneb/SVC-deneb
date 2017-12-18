myApp.service('FormService', function ($http, $location, $mdDialog) {
    console.log('FormService Loaded');
    var self = this;
    self.FormObject = {};
    self.updatedAdvocate ={};
    self.advocateList = {data: []};
    self.selectedAdvocate = {data: {}};

    // Hold advocateId of the row that was clicked
    self.currentAdvocateId = {currentId: 0};

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
    self.selectedForm = {form: []};

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
        });
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

    // EDIT ADVOCATE
    self.editAdvocate = function (advocate) {
        console.log('Edit advocate on Form Services was called', advocate);
        self.updatedAdvocate = advocate;
    }

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
