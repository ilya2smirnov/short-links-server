let express = require('express');
let bodyParser = require('body-parser')
let passport = require('passport')
let db = require('./db')
let usersController = require('./httpControllers/users')
let shortLinksController = require('./httpControllers/shortLinks')
let auth = require('./passport')

app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

let authUrlList = ['/api/user/delete'
  , '/api/user/get'
  , '/api/short-links/get'
  , '/api/short-links/add'
  , '/api/short-links/delete'
];
let nonAuthUrlList = ['/api/user/add'];
auth.useLocalPassword(app, authUrlList);

app.post(nonAuthUrlList[0], usersController.addUser);
app.post(authUrlList[0], usersController.deleteUser);
app.post(authUrlList[1], usersController.getUser);

app.post(authUrlList[2], shortLinksController.getAllByUser);
app.post(authUrlList[3], shortLinksController.add);
app.post(authUrlList[4], shortLinksController.deleteByLinkId);

db.connect('mongodb://localhost:27017')
  .then(() => {
    app.listen(3002, () => {
      console.log("App started on 3002 port");
    });
  })
  .catch(err => {
    return console.log(err);
  })

