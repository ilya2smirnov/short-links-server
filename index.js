let express = require('express');
let bodyParser = require('body-parser')
let passport = require('passport')
let db = require('./db')
let authController = require('./controllers/authController')
let auth = require('./auth')

app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

auth.useLocalPassword(app);

app.post('/api/user/add', authController.addUser);
app.post('/api/user/delete', authController.deleteUser);

db.connect('mongodb://localhost:27017')
  .then(() => {
    app.listen(3002, () => {
      console.log("App started on 3002 port");
    });
  })
  .catch(err => {
    return console.log(err);
  })

