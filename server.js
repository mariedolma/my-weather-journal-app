// Create Endpoint for all project data
let projectData = {};
// Express to run server and routes
const express = require('express');

// Start up an instance of an app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
app.use(express.json());

const port = 8001;
// Spin up the server
const server = app.listen(port, listening);
// Call to debug
function listening() {
	console.log('server running');
	console.log(`running on localhost: ${port}`);
}

// GET route
app.get('/all', sendData);

function sendData(req,res) {
  res.send(projectData);
  console.log(projectData);
}

// POST route adding incoming data to projectData
app.post('/addData', addData);

function addData(req, res) {
	projectData['temp'] = req.body.temp;
	projectData['date'] = req.body.date;
	projectData['feelings'] = req.body.feelings;
	
	res.send(projectData)
	console.log(projectData)	
} 