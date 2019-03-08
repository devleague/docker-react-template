const express = require('express');
const bodyParser = require('body-parser');
const User = require('./database/models/User');

// data vars
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME;

if (!PORT) { console.log('No Port Found'); }
if (!SESSION_SECRET) { console.log('No Session Secret Found'); }
if (!REDIS_HOSTNAME) { console.log('No Redis Hostname Found'); }
if (!PORT || !SESSION_SECRET || !REDIS_HOSTNAME) { return process.exit(1); }

// setup server middleware
const app = express();
app.use(bodyParser.json({ extended: true }));

// routes
app.get('/api/smoke', (req, res) => {
  res.json({ smoke: 'test' });
});

app.get('/api/users', (req, res) => {
  return new User().fetchAll()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/api/users', (req, res) => {
  const username = req.body.username;
  return new User({ username }).save()
    .then((user) => {
      return res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
})

// start server
app.listen(PORT, () => {
  console.log(`Server stated on port: ${PORT}`);
});
