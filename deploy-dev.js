const nodemon = require('nodemon');
const knex = require('./server/database/knex');

const DELAY = 3000;

function testConnection() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Polling for DB Connection...');
      knex.migrate.latest()
      .then(resolve)
      .catch((err) => {
        console.log(err);
        resolve(testConnection());
      });
    }, DELAY);
  })
}

// migrate db
testConnection()
// run seeds
.then(() => { knex.seed.run(); })
// print status
.then(() => {
  console.log('Migration and Seeds Finished');
})
// run server using nodemon
.then(() => {
  nodemon({
    script: './server/server.js',
    ext: 'js json',
    ignore: ['src/'],
  });

  nodemon.on('start', function () {
    console.log('App has started');
  }).on('quit', function () {
    console.log('App has quit');
    process.exit();
  }).on('restart', function (files) {
    console.log('App restarted due to: ', files);
  });
})
.catch((err) => {
  console.log(err);
  process.exit(1);
});
