const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { NotFoundError } = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const internalServerErrorHandler = require('./middlewares/internalServerErrorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use('*', (req, res, next) => next(new NotFoundError('Задан неправильный путь')));

app.use(errorLogger);

app.use(errors());

app.use(internalServerErrorHandler);

app.listen(PORT);
