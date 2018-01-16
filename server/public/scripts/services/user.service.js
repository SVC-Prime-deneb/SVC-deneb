myApp.service('UserService', function($http, $location){
  var self = this;
  self.userObject = {};

  self.getuser = function(){
    $http.get('/user').then(function(response) {
      // self.userObject.is_admin = response.data.is_admin;
      // self.userObject.is_super_admin = response.data.is_super_admin;
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            self.userObject.is_admin = response.data.is_admin;
            self.userObject.is_super_admin = response.data.is_super_admin;
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    $http.get('/user/logout').then(function(response) {
      $location.path("/home");
    });
  }
  self.getuser();
});
