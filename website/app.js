/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?'
const apiKey = '';

// Async GET Request to OpenWeatherMap API
const getWeather = async (zip) => {
  const res = await fetch(baseURL + 'zip=' + zip + '&appid=' + apiKey)
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

// Create an event listener with a callback function to execute when it is clicked
function submit(e) {
  document.getElementById('generate').addEventListener('click', submit);

  let srollToContent = document.getElementById('content');
  srollToContent.scrollIntoView({behavior: 'smooth', block: 'end'});
  console.log('Jumped to most recent entry.');

  let feelings = document.getElementById('feelings').value;
  let zip = document.getElementById('zip').value;

  // API Call 
  getWeather(zip + '&units=imperial')
    .then(function(data) {
      // Add data
      console.log('API returned:', data);

      let toSave = {};
      let d = new Date();
      var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      toSave['date'] = months[d.getMonth()] + '.' + d.getDate() + '.' + d.getFullYear();
      toSave['temp'] = data.main.temp;
      toSave['feelings'] = feelings;

      postData(toSave).then(function(retrieveSavedData) {
        console.log('Returned from /all: ', retrieveSavedData);
        updateUI(retrieveSavedData);
      });
    });
}

// Async POST
const postData = async (data = {}) => {

  console.log('What is being sent: ', data);

  const res = await fetch('http://localhost:8001/addData', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type match "Content-Type" header
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Async POST retrieve data
const retrieveSavedData = async (url = '') => {
  const res = await fetch('http://localhost:8001/all', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type match "Content-Type" header
  });

  try {
    const allData = await res.json();
    return allData;
  } catch (error) {
    console.log("error", error);
  }
}

// Update UI
const updateUI = async (allData) => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    console.log(allData);
    document.getElementById('date').innerHTML = 'Today, ' + allData.date + ',';
    document.getElementById('temp').innerHTML = 'the temperature is ' + allData.temp + ' Fahrenheit.';
    document.getElementById('content').innerHTML = allData.feelings;
  } catch (error) {
    console.log("error", error);
  }
}