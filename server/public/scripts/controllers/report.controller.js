myApp.controller('ReportController', function (ReportService, $http) {
    console.log('ReportController created');
    var vm = this;
    vm.reportService = ReportService;

    // COUNT the number of time Advocate was dispatched
//     cases = []; 
//     vm.countAdv = 0;
//     vm.dispatchedAdvocates = [];
//     // Calculate the number of advocate dispatched
//     vm.countAdvDispatched = function () {
//         $http.get('/report/nurse').then(function (response) {
//         // vm.chartData = response.data;
//         cases = response.data;
//         // console.log('chartData', vm.chartData);
//         console.log('cases', cases);
//         for (var i = 0; i < cases.length; i++) {
//             if (cases[i].nurse_was_adv_dispatched) {
//                 vm.countAdv += 1;
                
//                 // console.log('cases.length', cases.length);
                
//             }
//         }
//             vm.dispatchedAdvocates.push(vm.countAdv);

//             console.log('vm.dispatchedAdvocates', vm.dispatchedAdvocates);
//     }).catch (function (error) {
//         console.log('failure on Get advocate dispatched', error);
//     });
// }

//     vm.countAdvDispatched();



    vm.nurseChart = [];

    vm.myNurseChart = document.getElementById('myNurseChart').getContext('2d');

    // // Chart: Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 15;
    Chart.defaults.global.defaultFontColor = '#777';

    //     // GET CHART
    vm.requestNurseChart = function () {

        // hospitalLabel = [];
        // advocateNumber = [];
                hospitalName = ['SVC', 'St.Francis', 'Fairview', 'Northeastern'];
                advocateData = [15,20,24,30];
        // $http.get('/report').then(function (response) {
        //     vm.nurseChart = response.data;
        //     console.log('nurseChart', vm.nurseChart);
        //     for (var i = 0; i < vm.nurseChart.length; i++) {
        //         hospitalLabel.push(vm.nurseChart[i].nurse_form_location_name);
        //         advocateNumber.push(vm.nurseChart[i].)
        //     }

        // })
        // advocateDispatchedNumber.push(vm.chartData[i].amount);
        // reportLabel.push(vm.chartData[i].nurse_form_location_name);
        //console.log ("budgetLabel", budgetLabel);
    // }

// })
        vm.myNurseChart = new Chart(myNurseChart, {
    type: 'doughnut',
    data: {
        labels: hospitalName,
        datasets: [{
            label: 'Nurse Report',
            data: advocateData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)'
            ],
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        }]
    },
    options: {
        title: {
            display: true,
            text: 'The Number of Advocates Dispatched per Hospital',
            fontSize: 25
        },
        legend: {
            display: true,
            position: 'right',
            labels: {
                fontColor: '#000'
            }
        },
        layout: {
            padding: {
                left: 50,
                right: 0,
                bottom: 0,
                top: 0
            }
        },
        tooltips: {
            enabled: true
        }
    }
});


// BAR CHART FOR TAXIS
        // vm.requestTaxiChart = function () {
        //     hospitalName = ['SVC', 'St.Francis', 'Fairview', 'Northeastern'];
        //     advocateData = [15, 20, 24, 30];



     // CHART
//     vm.nurseChart = [];

//     vm.myNurseChart = document.getElementById('myNurseChart').getContext('2d');

//     // // Chart: Global Options
//     Chart.defaults.global.defaultFontFamily = 'Lato';
//     Chart.defaults.global.defaultFontSize = 15;
//     Chart.defaults.global.defaultFontColor = '#777';

// //     // GET CHART
//     vm.requestNurseChart = function () {
    
//         // hospitalLabel = [];
//         // advocateNumber = [];
// //         // hospitalName = ['SVC', 'St.Francis', 'Fairview', 'Northeastern'];
// //         // advocateData = [15,20,24,30];
//         $http.get('/report/nurse').then(function (response){
//             vm.nurseChart = response.data;
//             console.log('nurseChart', vm.nurseChart);
//             for (var i = 0; i < vm.nurseChart.length; i++) {
//                 hospitalLabel.push(vm.nurseChart[i].nurse_form_location_name);
//                 advocateNumber.push(vm.nurseChart[i].)
//             }
            
//         })
//                 advocateDispatchedNumber.push(vm.chartData[i].amount);
//                 reportLabel.push(vm.chartData[i].nurse_form_location_name);
//                 //console.log ("budgetLabel", budgetLabel);
//             }

//         })
//         vm.hospitalChart = new Chart(myChart, {
//             type: 'bar',
//             data: {
//                 labels: reportLabel,
//                 datasets: [{
//                     label: 'Nurse Report',
//                     data: advocateDispatchedNumber,
//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.6)',
//                         'rgba(54, 162, 235, 0.6)',
//                         'rgba(255, 206, 86, 0.6)',
//                         'rgba(75, 192, 192, 0.6)'
//                     ],
//                     borderWidth: 1,
//                     borderColor: '#777',
//                     hoverBorderWidth: 3,
//                     hoverBorderColor: '#000'
//                 }]
//             },
//             options: {
//                 title: {
//                     display: true,
//                     text: 'The Number of Advocates Dispatched per Location',
//                     fontSize: 25
//                 },
//                 legend: {
//                     display: true,
//                     position: 'right',
//                     labels: {
//                         fontColor: '#000'
//                     }
//                 },
//                 layout: {
//                     padding: {
//                         left: 50,
//                         right: 0,
//                         bottom: 0,
//                         top: 0
//                     }
//                 },
//                 tooltips: {
//                     enabled: true
//                 }
//             }
//         });
    }
    
});