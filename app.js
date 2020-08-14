const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const url = 'mongodb://localhost/Wall-E';
const jobRouter = require('./routers/job');
const app = express();
app.use(cors())

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
const connect = mongoose.connection;
connect.on('open', () => {
  console.log('Successfully connected with DB');
});
app.use(express.json());
app.use('/', jobRouter);
app.listen(9000, () => {
  console.log('server running on 9000');
})