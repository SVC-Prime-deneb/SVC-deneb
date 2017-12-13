myApp.controller('MaController', function (FormService) {
    console.log('MaController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.victimization = [{string: 'Adult Sexual Assault', was_adult_sexual_assault: true}, {string: 'Sexual Exploitation', was_sexual_exploitation: true}, {string: 'Minor-CSA', was_minor_other: true}, {string: 'Family/Minor-CSA', was_minor_family: true}, {string: 'Other', was_other: true}];
    vm.services = ['1:1','Legal Advocacy','Support Group'];
});