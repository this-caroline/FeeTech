import palette from 'theme/palette';

export const data = {
  labels: ['1 Dez', '2 Dez', '3 Dez', '4 Dez', '5 Dez', '6 Dez'],
  datasets: [
    {
      label: 'Este ano',
      backgroundColor: palette.primary.main,
      data: [1000.00, 600.00, 600.00, 930.00, 800.00, 500.00, 650.00]
    },
    {
      label: 'Último ano',
      backgroundColor: palette.error.main,
      data: [600.00, 739.33, 500.00, 650.00, 900.00, 500.00, 490.00]
    }
  ]
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};
