import { ChartType } from '../../../core/models/dashboard';

const emailSentBarChart: ChartType = {
    chart: {
        height: 359,
        type: 'bar',
        stacked: true,
        toolbar: {
            show: false
        },
        zoom: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '15%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },

    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    colors: ['#556ee6', '#f1b44c', '#34c38f'],
    legend: {
        position: 'bottom',
    },
    fill: {
        opacity: 1
    },
};


export { emailSentBarChart };
