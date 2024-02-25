require('dotenv').config();
const express = require('express');

//cors
const cors = require('cors');

//database connection
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:admin123@cluster0.dx0evqu.mongodb.net/claractdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database connected');
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

//access routes
const routes = require('./routes/routes');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});