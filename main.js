// express
const express = require('express');
const app = express();
const port = 3000;

// cors
const cors = require('cors');
app.use(cors());

// public
app.use(express.static('public'));

// listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});