const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const port = 5000;

const cohortsRoutes = require('./cohorts/cohorts-router.js');
const studentsRoutes = require('./students/students-router.js');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use('/api/cohorts', cohortsRoutes);
server.use('/api/students', studentsRoutes);

server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
