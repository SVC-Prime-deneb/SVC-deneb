myApp.controller('ReportController', function (ReportService, $http) {
    console.log('ReportController created');
    var vm = this;
    vm.reportService = ReportService;

    // COUNT the number of time Advocate was dispatched
    vm.cases = []; 
    
    vm.countDispatch = function () {
        $http.get('/report/nurse').then(function (response) {
            vm.cases = response.data;
            console.log('vm.cases', vm.cases);
            console.log('success counting dispatch');
        }).catch(function(error) {
            console.log('failure', error);
        });
    }

    vm.countDispatch();



    vm.nurseChart = [];

    vm.myNurseChart = document.getElementById('myChart').getContext('2d');

    // Chart: Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 15;
    Chart.defaults.global.defaultFontColor = '#777';

        // GET CHART
    vm.requestNurseChart = function () {
    var nurseReportNames = [];
    var advocateCounts = [];
        for (var i = 0; i < vm.cases.length; i++) {
            nurseReportNames.push(vm.cases[i].nurse_form_location_name);
            advocateCounts.push(vm.cases[i].count);
        }
        console.log('nurseReportNames', nurseReportNames);
        console.log('advocateCounts', advocateCounts);
        vm.myNurseChart = new Chart(myChart, {
    type: 'doughnut',
    data: {
        labels: nurseReportNames,
        datasets: [{
            label: 'Nurse Report',
            data: advocateCounts,
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
}
    
    

    vm.taxiData = [];

    // GET COUNT OF TAXIS PER LOCATION
    vm.countTaxi = function () {
        $http.get('/report/taxi').then(function (response) {
            vm.taxiData = response.data;
            console.log('vm.taxiData', vm.taxiData);
            // console.log('vm.taxiData.count', vm.taxiData[0].count);
            // console.log('vm.taxiData.location_name', vm.taxiData[0].location_name);
        console.log('success counting taxis');    
        }).catch (function (error) {
            console.log('failure', error);    
        });
    }

    vm.countTaxi();


        //TAXI BAR CHART
        vm.requestTaxiChart = function () {
            // var myTaxiChart = document.getElementById('myTaxiChart').getContext('2d');
            var locationNames = [];
            var taxiCounts = [];
            for (var i = 0; i < vm.taxiData.length; i++) {
                locationNames.push(vm.taxiData[i].location_name);
                taxiCounts.push(vm.taxiData[i].count);     
            }
            console.log('locationNames', locationNames);
            console.log('taxicount', taxiCounts);
            vm.taxiChart = new Chart(myChart, {
                type: 'bar', // bar,pie, line, horizontalBar
                data: {
                    labels: locationNames ,
                    datasets: [{
                        label: 'LocationName',
                        data: taxiCounts,
                        fill: false,
                        lineTension: 0.7,
                        
                        backgroundColor: 'green',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)'
                            // 'rgba(255, 206, 86, 0.6)',
                            // 'rgba(153, 102, 255, 0.6)',
                            // 'rgba(255, 159, 64, 0.6)',
                            // 'rgba(255, 99, 132, 0.6)',
                            // 'rgba(75, 192, 192, 0.6)'
                        ],
                        borderWidth: 1,
                        borderColor: '#777',
                        hoverBorderWidth: 3,
                        hoverBorderColor: '#000'
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: 'Number of Taxis provided per Hospital',
                        fontSize: 30
                    },
                    legend: {
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
                    tooltops: {
                        enabled: true
                    }
                } 
            });
        }
            
    // The Number of Advocates being sent Monthly Per Location - Line Chart

    vm.monthlyAdvPerLoc = [];

    // Get number of Advocates sent per month per location
        vm.countAdv = function () {
            $http.get('/report/locmonthly').then(function (response) {
                vm.monthlyAdvPerLoc = response.data;
                console.log('monthlyAdvPerLoc', vm.monthlyAdvPerLoc);    
                console.log('success acounting monthlyAdvPerLoc');
            }).catch(function (error) {
                console.log('failure', error);    
            });
        }

        vm.countAdv();

        // vm.requestMonthlyAdvChart = function () {

        // }
});