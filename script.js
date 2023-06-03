
axios.get('https://mindicador.cl/api')
.then(function (response) {
  const indicators = response.data;
  console.log(response.data)
  const selector = document.getElementById('indicator-selector');
  
  for (const key in indicators) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = indicators[key].nombre;
    selector.appendChild(option);
  }

  // Agrega un evento de escucha al selector
  selector.addEventListener('change', function () {
    const selectedIndicator = this.value;
    getIndicatorData(selectedIndicator);
  });
})
.catch(function (error) {
  console.log(error);
});

function getIndicatorData(indicator) {
axios.get(`https://mindicador.cl/api/${indicator}`)
  .then(function (response) {

    document.getElementById("indicatorTitle").value = response.data.nombre;
    document.getElementById("indicatorSymbol").value = response.data.codigo;
    document.getElementById("indicatorDate").value = response.data.fecha;

    const indicatorData = response.data.serie;
    const indicatorContainer = document.getElementById('indicator-container');
    
    // Limpia el contenido anterior
    indicatorContainer.innerHTML = '';

    // Crea elementos HTML y muestra la información del indicador
    for (let i = 0; i < indicatorData.length; i++) {
      const date = new Date(indicatorData[i].fecha);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const value = indicatorData[i].valor;

      const paragraph = document.createElement('p');
      paragraph.textContent = `${formattedDate}: ${value}`;
      indicatorContainer.appendChild(paragraph);
    }

    // Crear el gráfico
    createChart(indicator, indicatorData);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function createChart(indicator, indicatorData) {
const dates = [];
const values = [];

// Obtén las fechas y valores del último año
for (let i = 0; i < indicatorData.length; i++) {
  const date = new Date(indicatorData[i].fecha);
  dates.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
  values.push(indicatorData[i].valor);
}
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: dates,
    datasets: [{
      label: indicator,
      data: values,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true
  }
});
}

//js2
(() => {
    'use strict'
  
    feather.replace({ 'aria-hidden': 'true' })
  
    // Graphs
    const ctx = document.getElementById('chart')
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        datasets: [{
          data: [
            15339,
            21345,
            18483,
            24003,
            23489,
            24092,
            12034
          ],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            boxPadding: 3
          }
        }
      }
    })
  })
  
  //js3
  indicador.serie.forEach(function (data) {

  var row = indicadorTable.insertRow();

  var fechaCell = row.insertCell(0);
  var valorCell = row.insertCell(1);

  fechaCell.innerHTML = fecha;
  valorCell.innerHTML = valor;
});

$('.datepicker').datepicker({
    format: 'yyyy-mm-dd'
  });