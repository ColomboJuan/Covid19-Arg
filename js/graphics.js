let xLabels = []
let xCasesConfirmed = []
let xCasesDeaths = []
let xCasesRecovered = []
let xActives = []
let xCommunityTransmission =[]
let xImported =[]
let xTests = []

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

var layout = {
  title:''
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
var config = {responsive: true}

var data = [Confirmados, Activos,CasosRecuperados,CasosMuertes,config];
var data2 = [TestConfirmados, TestsTotales,config];
var data3 = [CasosRecuperados, CasosMuertes,config];
var data4 = [CasosImportados, CasosTrasmisionComunitaria,config];

Plotly.newPlot('plot', data, layout);


}

function getData() {
  fetch("https://damianra.pythonanywhere.com/api/v1/alldata")
  .then(response => response.json())
  .then(function(data){
    console.log(data)
    if (data["data"]){
      return data;
    }else{
      getData();
    }
  })
  .then(data => {
      console.log(data)
      data["data"].forEach(({date,cases,deaths,recovered,tests,communityTransmission,imported}) => {
      xCasesConfirmed.push(cases)
      xCasesDeaths.push(deaths)
      xCasesRecovered.push(recovered)
      xActives.push(cases - deaths- recovered)
      xLabels.push(date)
      xTests.push(tests)
      xImported.push(imported)
      xCommunityTransmission.push(communityTransmission)
  
    });

    
  
    plotly()
    SetData(xCasesConfirmed[xCasesConfirmed.length-1],xCasesDeaths[xCasesDeaths.length-1],xCasesRecovered[xCasesRecovered.length-1],xActives[xActives.length-1])
  });
  function SetData(confirmed, deaths, recovered, actives) {
    document.getElementById('confirmedLast').textContent = confirmed
    document.getElementById('deathsLast').textContent = deaths
    document.getElementById('recoveredLast').textContent = recovered
    document.getElementById('activesLast').textContent = actives
  }
  }