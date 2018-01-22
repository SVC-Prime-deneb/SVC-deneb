myApp.controller('AdminController', function (UserService, FormService, AdminService, $http, $mdDialog) {
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.adminId = 0
    vm.admin = FormService.selectedAdmin;
    vm.updatedAdmin = {};
    vm.adminList = [];
    vm.adminService = AdminService;
    vm.adminObject = AdminService.formObject;
    var changeAdmin = {}


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
            vm.adminList.data = response.data;
        }).catch(function (error) {
            console.log('failure on admin get route', error);
        });
    }

    // DELETE admin
    vm.deleteAdmin = function (adminId) {
        $http.delete('/admin/del/' + adminId).then(function (response) {
            vm.viewAdmin();
        }).catch(function (error) {
            console.log('failure on admin delete', error);
        });
    }

    vm.editAdmin = function (admin) {
        vm.formService.editAdmin(admin);
    }

    vm.viewAdmin();
});