const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
// TODO
const cookieParser = require('cookie-parser');
const url = 'mongodb://localhost/Wall-E';
const jobRouter = require('./routers/jobRouter');
const authRouter = require('./routers/authRouter');

// set express app
const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// TODO
app.use(cookieParser());

require('dotenv').config();

// connect DB
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
const connect = mongoose.connection;
connect.on('open', () => {
  console.log('Successfully connected with DB');
});

app.use(express.json());
// use routers
app.use('/', jobRouter);
app.use('/user', authRouter);


// running port
app.listen(9000, () => {
  console.log('server running on 9000');
})