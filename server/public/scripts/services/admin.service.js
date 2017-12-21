myApp.service('AdminService', function ($http, $location, $mdDialog) {
    console.log('AdminService Loaded');
    var self = this;
    self.FormObject = {};

    self.updatedAdmin = {};
    self.adminList = { data: [] };
    self.selectedAdmin = { data: {} };

    // Hold advocateId of the row that was clicked
    self.currentAdminId = { currentId: 0 };

    //holds info about editing or not for dialog displays
    self.isEditing = { editing: false };



    // EDIT ADVOCATE
    self.editAdvocate = function (admin) {
        // console.log('Edit advocate on Form Services was called', advocate);
        self.updatedAdmin = admin;
    }

});