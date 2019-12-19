var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');
var forecast = document.querySelector('.forecast');
var h1 = document.querySelector('.five');

var d = new Date();
var weekday = new Array();
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
weekday[7] = "Sunday";
weekday[8] = "Monday";
weekday[9] = "Tuesday";
weekday[10] = "Wednesday";
weekday[11] = "Thursday";
weekday[12] = "Friday";
weekday[13] = "Saturday";


button.addEventListener('click', function(name) {
fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=12da1bd78b10c17045bad1477a40dc7c&units=metric')
.then(response => response.json())
.then(data => {
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];
  var cloudsValue = data['weather'][0]['icon'];
  

  main.innerHTML = nameValue;
  desc.innerHTML = descValue;
  temp.innerHTML = 'Temperature: ' + tempValue + ' °C';
  clouds.setAttribute('src', 'http://openweathermap.org/img/w/' + cloudsValue + '.png');
  clouds.innerHTML = cloudsValue;
  
  input.value ='';

  h1.innerHTML = '5 days forecast';

})

.catch(err => alert('Wrong city name!'));
})

var div = document.createElement('div');
div.setAttribute('class', 'fivedays');
var div1 = document.createElement('div');
div1.setAttribute('class', 'days');

button.addEventListener('click', function(name) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input.value + '&appid=12da1bd78b10c17045bad1477a40dc7c&units=metric')
  .then(response => response.json())
  .then(data => {
    
    for (var i = 1; i < 6; i++) {
      var tminValue = data['list'][i]['main']['temp_min'];
      var tmaxValue = data['list'][i]['main']['temp_max'];
      var cloudValue = data['list'][i]['weather'][0]['icon'];

      var n = weekday[d.getDay() + i];
      var day = document.createElement('h1');
      day.setAttribute('class', 'day');
      day.innerHTML = n;
      div1.appendChild(day);

      var line = document.createElement('hr');

      var tmpmin = document.createElement('p');
      tmpmin.setAttribute('class', 'tempmin');
      tmpmin.innerHTML = 'Min. temp.: ' + tminValue + ' °C';
      
      div.appendChild(tmpmin);

      var tmpmax = document.createElement('p');
      tmpmax.setAttribute('class', 'tempmax');
      tmpmax.innerHTML = 'Max. temp.: ' + tmaxValue + ' °C';
      div.appendChild(tmpmax);

      var cloudimg = document.createElement('img');
      cloudimg.setAttribute('src', 'http://openweathermap.org/img/w/' + cloudValue + '.png')
      cloudimg.innerHTML = cloudValue;
      cloudimg.appendChild(line);
      div.appendChild(cloudimg);

      
      
      
      
    }
    
    input.value ='';
    
    forecast.appendChild(div1);
    forecast.appendChild(div);
  })
  .catch(err => alert('Wrong city name!'));
})

