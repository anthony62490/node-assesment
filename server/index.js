const express = require('express');
const {json} = require('body-parser');
const app = express();
const port = 3001;

const {
  getStuff,
  addStuff,
  changeStuff,
  deleteStuff
} = require('./controller')

app.use(json());

app.get('/api/get', getStuff);
app.post('/api/add', addStuff);
app.put('/api/change/:id', changeStuff);
app.delete('/api/delete/:id', deleteStuff);

app.listen(port, () => console.log( `Listening for requests on port ${port}` ));