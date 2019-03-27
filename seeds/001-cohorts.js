exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'UX17' },
        { name: 'WEB17' },
        { name: 'DS17' }
      ]);
    });
};
