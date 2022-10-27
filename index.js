const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

//
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Routes
const userRoutes = require('./routes/users')

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())
app.use(express.static('public'))

//index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//routes
app.use('/api', userRoutes);



// Port configuration
const port = process.env.PORT || 3000;

//
mongoose
  .connect(process.env.DATABASE)
  .then((result) => {
    app.listen(port, () =>
      console.log(`BD conectada || servidor en puerto ${port} || MASTER `)
    );
  })
  .catch((err) => {
    console.log((err) => console.log("Error de conexión en BD"));
  });
