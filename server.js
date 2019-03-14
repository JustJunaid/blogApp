const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is our MongoDB database
// const dbRoute = "mongodb://jelo:a9bc839993@ds151382.mlab.com:51382/jelotest";
const dbRoute = "mongodb://localhost:27017/Building";

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// API calls
app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/addData', (req, res) => {
  db.collection('Building').insertOne(
    { 'name': req.body.name, 
    'floors': req.body.floors, 
    'flats': req.body.flats }, 
        function(err, data) {
          if(err) throw err;
        });
    res.json({'result': 'Success', 'message': 'Data Added Successfully'})
    });

// Delete all the data from the DB

// db.collection('Building').deleteMany(
//   {}, function(err, data) {
//         if(err) throw err;
//         console.log(data)
//         //Doc saved
//       });


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
