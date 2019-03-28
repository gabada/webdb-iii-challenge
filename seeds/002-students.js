exports.seed = function(knex, Promise) {
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Geroge', cohort_id: 1 },
        { name: 'Frank', cohort_id: 2 },
        { name: 'Lucy', cohort_id: 3 }
      ]);
    });
};
