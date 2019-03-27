const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true
};

const db = knex(knexConfig);
const server = express();
const port = 5000;

const cohortsRoutes = require('./cohorts/cohorts-router.js');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use('/api/cohorts', cohortsRoutes);

server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
