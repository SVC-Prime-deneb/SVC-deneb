myApp.controller('ReportController', function (ReportService, $http) {
    console.log('ReportController created');
    var vm = this;
    vm.reportService = ReportService;

    // CHART
    vm.chartData = [];

    vm.myChart = document.getElementById('myChart').getContext('2d');

    // Chart: Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 15;
    Chart.defaults.global.defaultFontColor = '#777';

    // GET CHART
    vm.requestChart = function () {
        hospitalName = ['HCMC', 'St.Francis', 'Fairview', 'Northeastern'];
        advocateData = [15,20,24,30];

        vm.hospitalChart = new Chart(myChart, {
            type: 'bar',
            data: {
                labels: hospitalName,
                datasets: [{
                    label: 'Advocates',
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
                    text: 'The Number of Advocates in Each Hospital',
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
    
});