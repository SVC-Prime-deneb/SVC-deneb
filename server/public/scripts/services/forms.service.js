myApp.service('FormService', function ($http, $location) {
    console.log('FormService Loaded');
    var self = this;
    self.FormObject = {};

    self.advocateList = {data: []};
    self.selectedAdvocate = {data: {}};
    
    self.currentFormId = {currentId: 0};

    self.saveFormId = function(id){
        self.currentFormId.currentId = id; 
        console.log(self.currentFormId);
    }
    

});
