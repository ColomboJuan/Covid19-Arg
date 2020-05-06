
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';




function getData() {
  fetch("https://damianra.pythonanywhere.com/api/v1/ult-actualization")
    .then(response => response.json())
    .then(data => {
      console.log(data["data"])
       lastConfirmed = data.casos;
       console.log(lastConfirmed)
       lastDeaths = data.data.muertes;
       lastRecovered = data.data.recuperados;
    });
}