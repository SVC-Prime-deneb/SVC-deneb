myApp.controller('UserController', function(UserService, FormService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
<<<<<<< HEAD

  // vm.formService = FormService;
  // vm.formObject = FormService.formObject;

  // vm.caseCompletedFilter = function (case) {
  //   return case.is_case_completed === true;
  // }

  // vm.openCaseList = [];
 
  // vm.openCaseObject = {
  //   is_case_complete: false
  // }
  

  // vm.countCaseComplete = function () {
  //   sum = 0;
  //   console.log('');
    
  //   if (vm.openCaseObject.is_case_complete) {
  //     sum +=1;
  //   }
  //   return sum;
  //   vm.countCaseComplete = sum;
  //   console.log('countCaseComplete', vm.countCaseComplete);
    
  // }

  // vm.countCaseComplete();
=======
  

  
>>>>>>> ceae36a365d549a92de2412467e0080cb4985a2d
});
