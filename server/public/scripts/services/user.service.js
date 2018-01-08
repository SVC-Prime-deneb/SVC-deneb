myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};

  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
      console.log(response);
      // self.userObject.is_admin = response.data.is_admin;
      // self.userObject.is_super_admin = response.data.is_super_admin;
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            self.userObject.is_admin = response.data.is_admin;
            self.userObject.is_super_admin = response.data.is_super_admin;
            
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
            console.log('UserService -- getuser -- User Data: ', self.userObject.is_admin);
            console.log('UserService -- getuser -- User Data: ', self.userObject.is_super_admin);
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
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  }
  self.getuser();
});
