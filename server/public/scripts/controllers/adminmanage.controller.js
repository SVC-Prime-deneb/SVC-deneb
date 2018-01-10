myApp.controller('AdminController', function (UserService, FormService, AdminService, $http, $mdDialog) {
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.admin = FormService.selectedAdmin;
    vm.adminList = FormService.adminList;

    vm.adminService = AdminService;
    vm.adminObject = AdminService.formObject;



    // Column sorting variables
    vm.sortColumn = "first_name";
    vm.reverseSort = false;


    vm.sortData = function (column) {
        vm.reverseSort = (vm.sortColumn == column) ? !vm.reverseSort : false;
        vm.sortColumn = column;
    }

    vm.getSortClass = function (column) {
        if (vm.sortColumn == column) {
            return vm.reverseSort ? 'arrow-down' : 'arrow-up';
        }
        return '';
    }


    // VIEW advocates 
    vm.viewAdmin = function () {
        $http.get('/admin/get').then(function (response) {
            console.log(response.data);
            
            vm.adminList.data = response.data;

        }).catch(function (error) {
            console.log('failureee', error);
        });
    }

    // DELETE admin
    vm.deleteAdmin = function (adminId) {
        console.log('deleted', adminId);
        $http.delete('/admin/del/' + adminId).then(function (response) {
            console.log('success');
            vm.viewAdmin();
        }).catch(function (error) {
            console.log('failure', error);
        });
    }

    // EDIT Advocate
    vm.editAdmin = function (admin) {
        vm.formService.editAdmin(admin);
    }

    vm.viewAdmin();
});