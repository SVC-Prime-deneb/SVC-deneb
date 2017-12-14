myApp.controller('GreenController', function (FormService) {
    console.log('GreenController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;
    vm.hospitals = [{ hospital: 'Fairview Southdale', location_id: 1 }, { hospital: 'Methodist', location_id: 2 }, { hospital: 'HCMC', location_id: 3 }, { hospital: 'North Memorial', location_id: 4 }, { hospital: 'Abbott Northwestern', location_id: 5 }, { hospital: 'West Health', location_id: 6 }, { hospital: 'Maple Grove', location_id: 7 }, { hospital: 'St. Francis', location_id: 8 }, { hospital: 'Ridgeview Waconia', location_id: 9 }, { hospital: '212', location_id: 10 }, { hospital: 'New Prague', location_id: 11}];
    vm.form
});