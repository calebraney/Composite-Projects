// v1.0 LifexFunds Chart
document.addEventListener('DOMContentLoaded', function () {
  //////////////////////////////
  const chart = function () {
    const CHART_SELECTOR = '#chart-discount';
    //options
    const LINE_COLOR = '#00BAE1';
    const CHART_BORDER = '#C2D1D8';
    const BORDER_WIDTH = 2;
    const SHOW_GRID_LINES = false;

    const data = [
      { date: '09/15/2024', percent: 0 },
      { date: '09/16/2024', percent: -0.25 },
      { date: '09/19/2024', percent: 0 },
      { date: '09/22/2024', percent: 0.01 },
      { date: '09/26/2024', percent: -0.1 },
      { date: '09/30/2024', percent: 0.1 },
      { date: '10/01/2024', percent: 0 },
      { date: '10/03/2024', percent: 0.01 },
      { date: '10/04/2024', percent: 0.05 },
      { date: '10/04/2024', percent: -0.01 },
      { date: '10/05/2024', percent: -0.07 },
      { date: '10/05/2024', percent: 0.05 },
      { date: '10/07/2024', percent: 0.07 },
      { date: '10/09/2024', percent: 0 },
      { date: '10/11/2024', percent: 0.03 },
      { date: '10/13/2024', percent: 0.15 },
      { date: '10/14/2024', percent: -0.1 },
      { date: '10/15/2024', percent: -0.03 },
      { date: '10/15/2024', percent: 0.01 },
      { date: '10/17/2024', percent: 0.02 },
      { date: '11/01/2024', percent: 0.07 },
      { date: '11/05/2024', percent: 0.1 },
      { date: '11/01/2024', percent: 0.11 },
      { date: '11/02/2024', percent: 0.02 },
      { date: '11/03/2024', percent: -0.01 },
      { date: '11/04/2024', percent: -0.12 },
      { date: '11/10/2024', percent: 0 },
      { date: '11/10/2024', percent: 0.04 },
    ];

    console.log('hi');
    const chartElement = document.querySelector(CHART_SELECTOR);
    if (!chartElement) return;

    //set global defaults
    Chart.defaults.borderColor = CHART_BORDER;
    Chart.defaults.borderWidth = BORDER_WIDTH;
    Chart.defaults.scales.category.title = {
      ...Chart.defaults.scales.category.title,
      font: {
        size: 20,
      },
    };
    Chart.defaults.scales.linear.title = {
      ...Chart.defaults.scales.linear.title,
      font: {
        size: 20,
      },
    };

    const chart = new Chart(chartElement, {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: true,
        elements: {
          line: { borderColor: LINE_COLOR },
          point: { borderColor: LINE_COLOR, backgroundColor: LINE_COLOR, radius: 1 },
        },
        scales: {
          x: {
            ticks: { maxTicksLimit: 9 },
            grid: {
              //dont show grid lines
              drawOnChartArea: SHOW_GRID_LINES,
            },
          },
          y: {
            max: 1,
            min: -1,
            // backgroundColor: '#000',
            borderColor: '#000',
            ticks: {
              callback: (value) => `${value.toFixed(2)}%`,
            },
            title: {
              text: 'Premium Discount (%)',
              display: true,
            },
            grid: {
              //dont show grid lines

              drawOnChartArea: SHOW_GRID_LINES,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
      },
      data: {
        labels: data.map((row) => row.date),
        datasets: [
          {
            label: 'Premium Discount Percent',
            data: data.map((row) => row.percent),
          },
        ],
      },
    });
  };
  chart();
});
