myApp.service('AdminService', function ($http, $location, $mdDialog) {
    var self = this;
    self.FormObject = {};
    self.updatedAdmin = {};
    self.adminList = { data: [] };
    self.selectedAdmin = { data: {} };

    // Hold advocateId of the row that was clicked
    self.currentAdminId = { currentId: 0 };

    //holds info about editing or not for dialog displays
    self.isEditing = { editing: false };



    self.editAdvocate = function (admin) {
        self.updatedAdmin = admin;
    }

});