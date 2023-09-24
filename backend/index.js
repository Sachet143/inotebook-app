const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;

// Middlewares
app.use(express.json())
app.use(cors())

// Available Routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))

app.get('/', (req, res) => {
  res.send('Hello Sachet!')
})


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})