myApp.controller('GreenController', function (UserService, FormService, $location, $http, $q, $mdDialog) {
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.userService = UserService

    //hospitals for drop down
    vm.hospitals = [{ hospital: 'Fairview Southdale', location_id: 1 }, { hospital: 'Methodist', location_id: 2 }, { hospital: 'HCMC', location_id: 3 }, { hospital: 'North Memorial', location_id: 4 }, { hospital: 'Abbott Northwestern', location_id: 5 }, { hospital: 'West Health', location_id: 6 }, { hospital: 'Maple Grove', location_id: 7 }, { hospital: 'St. Francis', location_id: 8 }, { hospital: 'Ridgeview Waconia', location_id: 9 }, { hospital: '212', location_id: 10 }, { hospital: 'New Prague', location_id: 11}];
    
    //default variables
    vm.formId = "";
    vm.date = 0;
    vm.loc = 0;
    vm.newGreen = {
        was_advocate_dispatched: false
    };
    vm.advocateId;
    vm.advocateArray;
    
    //fuction to post new green sheet along with connected tables
    vm.submitGreen = function(objectTosend, event){
        objectTosend.advocate_id = vm.advocateId;
        objectTosend.start_time = FormService.convertTime(objectTosend.start_time);
        $http.post('/case/new/green', objectTosend).then(function (response) {  
            vm.formId = response.data[0].green_form_id;
            vm.date = response.data[0].date;
            vm.loc = response.data[0].location_id;
        }).then(function(){
            vm.createTables();
            vm.monthlyLocation();
        }).then(function(){
            vm.greenConfirm(event);
        }).catch(function (err) {
                console.log('error in submit green sheet', err);
        });
    }

    //confirmation that green sheet has been submitted
    vm.greenConfirm = function (ev) {
        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Green Form Successfully Submitted')
                .ariaLabel('Green Form Success')
                .ok('OK')
                .targetEvent(ev)
        )
    }

    //creates takes returned green form id to create and link other SQL table ids
    vm.createTables = function () {    
        $http.post('case/new/table/' + vm.formId).then(function (err) {
            vm.greenPath();
        }).catch(function (err) {
            console.log('error in form creation', err);
        })
    }

    //gets advocates to populate advocate dispatched search bar
    vm.getAdvocates = function(){
        $http.get('/advocate/get').then(function(response){
            vm.advocateArray = response.data;
        }).catch(function(err){
            console.log('error in advocate get', err); 
        })
    }
    vm.getAdvocates();
    
    //sets selected advocate id variable
    vm.selectedItemChange = function(item) {
        vm.advocateId = item.advocate_id;        
    }

    //route for date and location
    vm.monthlyLocation = function(){
        var dateToSend = { date: vm.date , loc : vm.loc};
        $http.put('case/month', dateToSend).catch(function (err) {
            console.log('error in form creation', err);
        })
    }

    //function to reroute from the green sheet upon creation or cancel
    vm.greenPath = function(){
        if (vm.userService.userObject.is_admin === false) {
            $location.path('/user');
        } else {
            $location.path('/casemanage');
        }
    }

});
