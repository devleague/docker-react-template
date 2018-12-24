const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// data vars
const PORT = process.env.EXPRESS_CONTAINER_PORT;
const User = require('./db/models/user');

// setup server middleware
app.use(bodyParser.json({ extended: true }));
app.use(express.static('server/public'));

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
