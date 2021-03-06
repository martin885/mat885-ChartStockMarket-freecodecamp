function formatter() {
    return `${this.value > 0 ? ' + ' : ''}${this.value}%`;
}

function updateChart(series) {
    Highcharts.stockChart('chart', {
        rangeSelector: {
            selected: 5
        },
        yAxis: {
            labels: {
                formatter
            },
            plotLines: [{
                value: 0,
                width: 2,
          
          
                color: 'silver'
            }]
        },
        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },
        tooltip: {
            pointFormat: '<span  style="color:{series.color}">{series.name}</span>:<b>{point.y}</b> ({point.change}%)</br>',
            valueDecimals: 2,
            split: true
        },
        series
    });


}