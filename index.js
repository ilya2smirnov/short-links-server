let express = require('express');
let bodyParser = require('body-parser')
let passport = require('passport')
let db = require('./db')
let authController = require('./httpControllers/users')
let auth = require('./passport')

app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

let authUrlList = ['/api/user/delete'
  , '/api/user/get'];
let nonAuthUrlList = ['/api/user/add'];
auth.useLocalPassword(app, authUrlList);

app.post(nonAuthUrlList[0], authController.addUser);
app.post(authUrlList[0], authController.deleteUser);
app.post(authUrlList[1], authController.getUser);

db.connect('mongodb://localhost:27017')
  .then(() => {
    app.listen(3002, () => {
      console.log("App started on 3002 port");
    });
  })
  .catch(err => {
    return console.log(err);
  })

