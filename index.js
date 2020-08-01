let express = require('express');
let bodyParser = require('body-parser')
let db = require('./db')
let authController = require('./controllers/authController')

app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user', authController.addUser);
app.delete('/user', authController.deleteUser);

db.connect('mongodb://localhost:27017')
  .then(() => {
    app.listen(3002, () => {
      console.log("App started on 3002 port");
    });
  })
  .catch(err => {
    return console.log(err);
  })

