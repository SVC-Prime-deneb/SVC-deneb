myApp.service('AdvocateService', function ($http, $location, $mdDialog) {
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
})