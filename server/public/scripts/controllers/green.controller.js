myApp.controller('GreenController', function (FormService, $location, $http, $log, $q, $mdDialog) {
    console.log('GreenController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.hospitals = [{ hospital: 'Fairview Southdale', location_id: 1 }, { hospital: 'Methodist', location_id: 2 }, { hospital: 'HCMC', location_id: 3 }, { hospital: 'North Memorial', location_id: 4 }, { hospital: 'Abbott Northwestern', location_id: 5 }, { hospital: 'West Health', location_id: 6 }, { hospital: 'Maple Grove', location_id: 7 }, { hospital: 'St. Francis', location_id: 8 }, { hospital: 'Ridgeview Waconia', location_id: 9 }, { hospital: '212', location_id: 10 }, { hospital: 'New Prague', location_id: 11}];
    vm.formId = "";
    vm.date = 0;
    vm.loc = 0;
    vm.newGreen = {
        was_advocate_dispatched: false
    };
    vm.advocateId;

    vm.advocateArray;
    
    vm.submitGreen = function(objectTosend, event){
        objectTosend.advocate_id = vm.advocateId;
        objectTosend.start_time = FormService.convertTime(objectTosend.start_time);
        console.log(objectTosend);
        $http.post('/case/new/green', objectTosend).then(function (response) {  
            console.log(response);
            vm.formId = response.data[0].green_form_id;
            vm.date = response.data[0].date;
            vm.loc = response.data[0].location_id;
        }).then(function(){
            vm.createTables();
            vm.monthlyLocation();
        }).then(function(){
            vm.greenConfirm(event)
        }).catch(function (err) {
                console.log('error in submit green sheet :(', err);
        });
    }

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

    vm.createTables = function () {    
        console.log(vm.formId);
        $http.post('case/new/table/' + vm.formId).then(function (err) {
            console.log('error table creation', err);
            $location.path('/casemanage');
        }).catch(function (err) {
            console.log('error in form creation :(', err);
        })
    }

    vm.getAdvocates = function(){
        $http.get('/advocate/get').then(function(response){
            vm.advocateArray = response.data;
            console.log(vm.advocateArray);
            
        }).catch(function(err){
            console.log('error in advocate get', err); 
        })
    }

    vm.getAdvocates();

    vm.searchTextChange = function(text) {
        $log.info('Text changed to ' + text);
    }

    vm.selectedItemChange = function(item) {
        console.log(item.advocate_id);
        vm.advocateId = item.advocate_id;
        $log.info('Item changed to ' + JSON.stringify(item));
    }

    vm.monthlyLocation = function(){
        console.log(vm.date, vm.loc);
        var dateToSend = { date: vm.date , loc : vm.loc};
        $http.put('case/month', dateToSend).then(function (err) {
            console.log('error table creation', err);
            $location.path('/casemanage');
        }).catch(function (err) {
            console.log('error in form creation :(', err);
        })
    }

});
