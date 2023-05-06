// Récupération des données du fichier CSV
async function getData() {
  const response = await fetch('boite_noir.csv');
  const data = await response.text();
  const rows = data.split('\n').slice(1);
  const xLabels = [];
  const yData = [];
  const yData2 = [];
  rows.forEach(row => {
    const cols = row.split(';');
    const x = cols[0];
    const y = cols[1];
    const y2 = cols[4];

    xLabels.push(x);
    yData.push(y);
    yData2.push(y2);
  });
  return {xLabels, yData, yData2};
}

// Création du graphique
async function createChart_SingleAxis(canvasID) {
  const data = await getData();
  const ctx = document.getElementById(canvasID).getContext('2d');
  var data1 = {
      labels: data.xLabels,
      datasets: [{
        label: 'Vitesse',
        data: data.yData,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Vitesse',
        data: data.yData2,
        fill: true,
        borderColor: 'rgb(75, 92, 192)',
        tension: 0.1,
      }]
    }
  var options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      plugins: {
        legend: {
          title: {
            display: true,
            text: 'Titre de légendes'
          }
        }
      },
      elements: {
        point: {
          radius: 0
        }
      }
    }
  var config = {
    type: 'line',
    data: data1,
    options: options
  }

  const myChart = new Chart(ctx, config);
}


async function createChart_DoubleAxis() {
  const data = await getData();
  const ctx = document.getElementById('myChart').getContext('2d');
  var data1 = {
      labels: data.xLabels,
      datasets: [{
        label: 'Va',
        data: data.yData,
        yAxisID: 'y',
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Vz',
        data: data.yData2,
        yAxisID: 'y1',
        fill: false,
        borderColor: 'rgb(75, 92, 192)',
        tension: 0.1,
      }]
    }
  var options = {
      responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis'
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
    elements: {
        point: {
          radius: 0
        }
      }
  }

var config = {
  type: 'line',
  data: data1,
  options: options
  }

const myChart = new Chart(ctx, config);

}
