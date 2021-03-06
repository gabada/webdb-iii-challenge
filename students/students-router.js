const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true
};
const db = knex(knexConfig);

router.get('/', async (req, res) => {
  try {
    const students = await db('students');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await db('students')
      .innerJoin('cohorts', 'students.cohort_id', '=', 'cohorts.id')
      .select('students.id', 'students.name', 'cohorts.name as cohort')
      .where({ 'students.id': req.params.id })
      .first();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const [id] = await db('students').insert(req.body);

    const student = await db('students')
      .where({ id })
      .first();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const count = await db('students')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const student = await db('students')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await db('students')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

module.exports = router;
