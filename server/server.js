const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const decorator = require('./database/decorator');

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

// decorate request with database
app.use(decorator);

// routes
app.use('/api', userRoutes);
app.get('/api/smoke', (req, res) => {
  res.json({ smoke: 'test' });
});

// start server
app.listen(PORT, () => {
  console.log(`Server stated on port: ${PORT}`);
});
