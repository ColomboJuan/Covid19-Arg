let xLabels = []
let xCasesConfirmed = []
let xCasesDeaths = []
let xCasesRecovered = []
let xActives = []
let xCommunityTransmission =[]
let xImported =[]
let xTests = []
let lastConfirmed;
let lastDeaths;
let lastRecovered;
let lastActives;

getData()

async function plotly(){
var Confirmados = {
  x: xLabels,
  y:  xCasesConfirmed,
  name: 'Confirmados',
  mode: 'lines+markers'
};

var Activos= {
  x: xLabels,
  y: xActives,
  name: 'Activos',
  mode: 'lines+markers'
};
var CasosMuertes = {
  x: xLabels,
  y: xCasesDeaths,
  mode: 'lines+markers',
  name: 'Muertes'

};

var TestConfirmados = {
  x: xLabels,
  y:  xCasesConfirmed,
  mode: 'lines+markers',
  name: 'Test Positivos'
};

var TestsTotales = {
  x: xLabels,
  y: xTests,
  mode: 'lines+markers',
  name: 'Tests Totales'
};
var CasosRecuperados = {
  x: xLabels,
  y: xCasesRecovered,
  mode: 'lines  ',
  name: 'Recuperados'
};

var CasosImportados = {
  x: xLabels,
  y: xImported,
  mode: 'lines+markers',
  name: 'Recuperados'
};
var TestsTotales = {
  x: xLabels,
  y: xTests,
  mode: 'lines+markers',
  name: 'Tests Totales'
};
var CasosRecuperados = {
  x: xLabels,
  y: xCasesRecovered,
  mode: 'lines+markers',
  name: 'Recuperados'
};

var CasosImportados = {
  x: xLabels,
  y: xImported,
  mode: 'lines+markers',
  name: 'Casos Importados'
};

var CasosTrasmisionComunitaria = {
  x: xLabels,
  y: xCommunityTransmission,
  mode: 'lines+markers',
  name: 'Casos trasmisión coomunitaria'
};


var layout2 = {
  title:'Grafico tests positivos vs tests totales'
};
var layout3 = {
  title:'Grafico muertes vs recuperados'
};
var layout4 = {
  title:'Grafico casos importados vs casos trasmisión comunitaria '
};

var data = [Confirmados, Activos,CasosRecuperados,CasosMuertes];
var data2 = [TestConfirmados, TestsTotales];
var data3 = [CasosRecuperados, CasosMuertes];
var data4 = [CasosImportados, CasosTrasmisionComunitaria];

Plotly.newPlot('plot', data);


}

function charPor(){

  var ctx = document.getElementById("myPieChart");
  
  var myPieChart = new Chart(ctx, {
    
    type: 'doughnut',
    data: {
      labels: ["Confirmados", "Muertes", "Recuperados"],
      datasets: [{
        data: [lastConfirmed, lastDeaths, lastRecovered],
        backgroundColor: ['#36b9cc', '#e74a3b', '#1cc88a'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
  
  }

function getData() {
fetch("https://damianra.pythonanywhere.com/api/v1/alldata")
.then(response => response.json())
.then(data => {
    console.log(data)
    data["data"].forEach(({date,cases,deaths,recovered,totalTests,communityTransmission,imported}) => {
    xCasesConfirmed.push(cases)
    xCasesDeaths.push(deaths)
    xCasesRecovered.push(recovered)
    xActives.push(cases - deaths- recovered)
    xLabels.push(date)
    xTests.push(totalTests)
    xImported.push(imported)
    xCommunityTransmission.push(communityTransmission)

  });
    lastConfirmed =xCasesConfirmed[xCasesConfirmed.length-1]
    lastDeaths = xCasesDeaths[xCasesDeaths.length-1]
    lastRecovered = xCasesRecovered[xCasesRecovered.length-1],xActives[xActives.length-1]
    lastActives = xActives[xActives.length-1]
  plotly()
  SetData(lastConfirmed,lastDeaths,lastRecovered,lastActives)
  charPor()

});
function SetData(confirmed, deaths, recovered, actives) {
  document.getElementById('confirmedLast').textContent = confirmed
  document.getElementById('deathsLast').textContent = deaths
  document.getElementById('recoveredLast').textContent = recovered
  document.getElementById('activesLast').textContent = actives
}
}


