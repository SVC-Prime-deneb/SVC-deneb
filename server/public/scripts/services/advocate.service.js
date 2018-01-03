myApp.service('AdvocateService', function ($http, $location, $mdDialog) {
    console.log('FormService Loaded');
    var self = this;
    self.AdvocateObject = {};
    self.updatedAdvocate = {};
    self.advocateList = { data: [] };
    self.selectedAdvocate = { data: {} };
    // Hold advocateId of the row that was clicked
    self.currentAdvocateId = { currentId: 0 };

    // EDIT ADVOCATE
    self.editAdvocate = function (advocate) {
        // console.log('Edit advocate on Form Services was called', advocate);
        self.updatedAdvocate = advocate;
    }

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
})