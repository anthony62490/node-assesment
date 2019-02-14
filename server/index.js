const express = require('express');
const {json} = require('body-parser');
const app = express();
const port = 3001;

const {
  getTrip,
  getDriver,
  getVehicle,
  getMusic,
  getAllTrips,
  getAllDrivers,
  getAllVehicles,
  getAllMusic,
  addTrip,
  addDriver,
  addVehicle,
  addMusic,
  editTrip,
  editDriver,
  editVehicle,
  editMusic,
  deleteTrip,
  deleteDriver,
  deleteVehicle,
  deleteMusic
} = require('./controller')

app.use(json());

app.get('/api/trip/:id', getTrip);
app.get('/api/driver/:id', getDriver);
app.get('/api/vehicle/:id', getVehicle);
app.get('/api/music/:id', getMusic);
app.get('/api/trips', getAllTrips);
app.get('/api/drivers', getAllDrivers);
app.get('/api/vehicles', getAllVehicles);
app.get('/api/music', getAllMusic);


app.post('/api/trip', addTrip);
app.post('/api/driver', addDriver);
app.post('/api/vehicle', addVehicle);
app.post('/api/music', addMusic);

app.put('/api/trip/:id', editTrip);
app.put('/api/driver/:id', editDriver);
app.put('/api/vehicle/:id', editVehicle);
app.put('/api/music/:id', editMusic);

//app.delete('/api/delete/:id', deleteStuff);

app.listen(port, () => console.log( `Listening for requests on port ${port}` ));