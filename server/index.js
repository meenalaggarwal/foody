const express = require("express");
const path = require('path');
const routes = require('./routes');
var cors = require('cors')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())

// Have Node serve the files for built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// parse requests of content-type - application/json
app.use('/api', express.json());
app.use('/api/meals', routes.meals)

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});