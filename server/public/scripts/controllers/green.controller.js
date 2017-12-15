myApp.controller('GreenController', function (FormService, $location, $http) {
    console.log('GreenController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.hospitals = [{ hospital: 'Fairview Southdale', location_id: 1 }, { hospital: 'Methodist', location_id: 2 }, { hospital: 'HCMC', location_id: 3 }, { hospital: 'North Memorial', location_id: 4 }, { hospital: 'Abbott Northwestern', location_id: 5 }, { hospital: 'West Health', location_id: 6 }, { hospital: 'Maple Grove', location_id: 7 }, { hospital: 'St. Francis', location_id: 8 }, { hospital: 'Ridgeview Waconia', location_id: 9 }, { hospital: '212', location_id: 10 }, { hospital: 'New Prague', location_id: 11}];
    vm.formId = ""
    vm.submitGreen = function(objectTosend){
        console.log(objectTosend);
        console.log();
        
        $http.post('/case/new/green', objectTosend).then(function (response) {            
            console.log(response.data[0].green_form_id);

            vm.formId = response.data[0].green_form_id;
            
            
        }).catch(function (err) {
        }).then(function(){
            
            vm.createTables(vm.formId);
            }).catch(function (err) {
                console.log('error in submit green sheet :(', err);
            });
    }

    vm.createTables = function () {        
        $http.post('case/new/table/' + vm.formId).then(function (err) {
            console.log('error table creation', err);
            $location.path('/casemanage');
        }).catch(function (err) {
            console.log('error in form creation :(', err);
        })
    }


});

