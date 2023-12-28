const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const usersRouter = require('./routes/v1/users-router');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const headersMiddleware = require('./middlewares/headers-middleware');
const errorHandlerMiddleware = require('./middlewares/error-handler-middleware');
const correlationalIdMiddleware = require('./middlewares/logger-middleware');
const { swaggerOptions } = require('./config/swagger');
const app = express();

const V1 = 'v1';
//Swagger

const specs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//Morgan logger middleware
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Geolocation user middleware
app.use(headersMiddleware);

// Middleware correlationalId in request to log traces
app.use(correlationalIdMiddleware);

//Routers
app.use(`/${V1}/users`, usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandlerMiddleware);

module.exports = app;
