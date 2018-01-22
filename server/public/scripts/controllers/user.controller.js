myApp.controller('UserController', function (UserService, FormService, $http) {
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.formService = FormService;

  vm.openCase = 0;
  cases = [];
  vm.newCases = 0;
  
  // Get Route to count how many cases are still open on Case Management table
  vm.displayOpenCase = function () {
    // get case first
    $http.get('/case/form').then(function (response) {
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
  
  // Check array if Get cases was called
  if (cases.length == 0) {
    //route to get all cases
    vm.displayOpenCase()
  }


vm.newCases = function () {
    // get case first
    $http.get('/user/newcases').then(function (response) {
      console.log(response);
      vm.newCases = response.data[0].count;
      console.log(newCases);
    }).catch(function (error) {
      console.log('failure on GET Case Route');
    });
  }

  vm.newCases();


});

