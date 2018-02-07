myApp.controller('resetController', function (UserService, $location,  FormService, $http) {
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    var id = 0
    vm.resetUser = {
        username : '',
        password : '',
        password1 : ''
    }

    vm.resetUserPass = function (resetUser) {        
        if (resetUser.password === resetUser.password1) {
            $http.put('/register/reset/' + id ,{resetUser}).then(function (response) {
                $location.path('/adminmanage')
            }).catch(function (error) {
            });
        }else{
            alert("Passwords do not match")
        }
        }
        
});