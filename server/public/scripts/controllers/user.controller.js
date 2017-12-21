myApp.controller('UserController', function (UserService, FormService, $http) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.formService = FormService;

  vm.openCase = 0;
  cases = [];
  // Check array if Get cases was called
  //get route to populate cases
  vm.displayOpenCase = function () {
    // get case first
    $http.get('/case/form').then(function (response) {
      // console.log(response);
      console.log('Success calling Get Cases');
      cases = response.data;
      for (var i = 0; i < cases.length; i++) {
        if (!cases[i].is_case_complete) {
          vm.openCase += 1;
        }
      }
    }).catch(function (error) {
      console.log('failure on GET Case Route');
    });
  }
  if (cases.length == 0) {
    console.log('calling getCases');
    //route to get all cases
    vm.displayOpenCase()
  }
});
