myApp.controller('ReportController', function (ReportService, $http) {
    console.log('ReportController created');
    var vm = this;
    vm.reportService = ReportService;
    // vm.year = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    vm.year = [];
    for (var i = 2014; i<=2030;i++){
        vm.year.push(i);
    }
    vm.selectedYear = 0;
    vm.selectedMonth = "";
    vm.month = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];
    vm.Donut = false;
    vm.Bar = false;
    vm.Line = false;
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
    
    Chart.defaults.global.defaultFontColor = '#777';

        // GET CHART
    vm.requestNurseChart = function () {
        var nurseReportNames = [];
        var advocateCounts = [];
        vm.Donut = true;
        vm.Bar = false;
        vm.Line = false;
        Chart.defaults.global.defaultFontSize = 15;
        console.log('Donut and Bar status:', vm.Donut, vm.Bar);
    
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
    vm.myNurseChart = document.getElementById('myChart').getContext('2d');
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
    var myTaxiChart = document.getElementById('myTaxiChart').getContext('2d');
        //TAXI BAR CHART
        vm.requestTaxiChart = function () {
            Chart.defaults.global.defaultFontSize = 15;
            var locationNames = [];
            var taxiCounts = [];
            vm.Donut = false;
            vm.Bar = true;
            vm.Line = false;
            console.log('Donut and Bar status:', vm.Donut, vm.Bar);
            for (var i = 0; i < vm.taxiData.length; i++) {
                locationNames.push(vm.taxiData[i].location_name);
                taxiCounts.push(vm.taxiData[i].count);     
            }
            console.log('locationNames', locationNames);
            console.log('taxicount', taxiCounts);
            vm.myTaxiChart = new Chart(myTaxiChart, {
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
            
// ADVOCATE PER LOCATION MONTHLY - LINE CHART
        var myAdvChart = document.getElementById('myAdvChart').getContext('2d');
        vm.requestMonthlyAdvChart = function () {
            Chart.defaults.global.defaultFontSize = 11;
            var objectToSend = {
                selectedYear: vm.selectedYear
                            };
            var locmonthly = {};
            $http.post('/report/new/locmonthly', objectToSend).then(function (response) {
                console.log('success sending selected year');
            }).catch(function (error) {
                console.log('failure', error);
                
            })

            $http.get('/report/locmonthly').then(function(response) {
                locmonthly = response.data;
                console.log('locmonthly', locmonthly); 
                vm.displayAdvChart();             
            }).catch(function(error) {
                console.log('failure', error);              
            })
            // ADVOCATE PER LOCATION BAR CHART
            vm.displayAdvChart = function () {

                var locationNames = [];
                var numOfAdvocates = [];
                vm.Donut = false;
                vm.Bar = false;
                vm.Line = true;
                // console.log('Donut and Bar status:', vm.Donut, vm.Bar);
                for (var i = 0; i < locmonthly.length; i++) {
                    locationNames.push(locmonthly[i].location_name);
                    switch (vm.selectedMonth) {
                        case 'jan':
                            numOfAdvocates.push(locmonthly[i].jan);
                            break;
                        case 'feb':
                            numOfAdvocates.push(locmonthly[i].feb);
                            break;
                        case 'march':
                            numOfAdvocates.push(locmonthly[i].march);
                            break;
                        case 'april':
                            numOfAdvocates.push(locmonthly[i].april);
                            break;
                        case 'may':
                            numOfAdvocates.push(locmonthly[i].may);
                            break;
                        case 'june':
                            numOfAdvocates.push(locmonthly[i].june);
                            break;
                        case 'july':
                            numOfAdvocates.push(locmonthly[i].july);
                            break;
                        case 'aug':
                            numOfAdvocates.push(locmonthly[i].aug);
                            break;
                        case 'sept':
                            numOfAdvocates.push(locmonthly[i].sept);
                            break;
                        case 'oct':
                            numOfAdvocates.push(locmonthly[i].oct);
                            break;
                        case 'jan':
                            numOfAdvocates.push(locmonthly[i].nov);
                            break;
                        case 'nov':
                            numOfAdvocates.push(locmonthly[i].dec);
                            break;
                        case 'dec':
                            numOfAdvocates.push(locmonthly[i].jan);
                            break;
                    }

                }
                console.log('locationNames', locationNames);
                console.log('numOfAdvocates', numOfAdvocates);
                vm.myAdvChart = new Chart(myAdvChart, {
                    type: 'line', // bar,pie, line, horizontalBar
                    data: {
                        labels: locationNames,
                        datasets: [{
                            label: 'LocationName',
                            data: numOfAdvocates,
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
                            text: 'Number of Advocates sent to Hospitals Monthly',
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
        }
});