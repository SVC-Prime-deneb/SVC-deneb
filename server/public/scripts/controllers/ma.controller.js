myApp.controller('MaController', function (FormService) {
    console.log('MaController created');
    var vm = this;
    vm.formService = FormService;
    vm.formObject = FormService.formObject;

    vm.victimization = ['Adult Sexual Assault', 'Sexual Exploitation', 'Minor-CSA', 'Family/Minor-CSA'];
    vm.services = ['1:1','Legal Advocacy','Support Group'];
});