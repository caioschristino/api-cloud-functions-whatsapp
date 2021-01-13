const app = require('express')();
const bodyParser = require('body-parser');

const authRoute = require('./util/routes/auth');
const userRoute = require('./util/routes/user');
const chatRoute = require('./util/routes/chat');

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/chat', chatRoute);

module.exports = app;