const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { init, getUsers, getHistoryUsers, addUser, editUser } = require('./src/db/index.js')

init();

const app = express();
const port = process.env.PORT || 5000;

const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});




app.use(express.static('dist'));

app.get('/', function(req, res) {
  try {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } catch(e) {
    res.statusCode = 500;
    console.error(e.message);
  }
  res.end();
});

app.post('/', urlencodedParser, function(req, res) {
  try {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    if (!req.body.firstName || !req.body.nickName) return; // Если форма не полная, то не вносить такого "пользователя в базу"
    const json = JSON.stringify({firstName: req.body.firstName, nickName: req.body.nickName});
    addUser(json);
  } catch(e) {
    res.status = 500;
    console.error(e.message);
  }

});

app.get('/getUsers', async function(req, res) {
  try {
    res.statusCode = 200;
    const arr = (await getUsers()).slice(0);
    arr.map(elem => {
      const info = JSON.parse(elem.user_info);
      elem.firstName = info.firstName;
      elem.nickName = info.nickName;
      delete elem.user_info;
    });
    res.end(JSON.stringify(arr));
  } catch(e) {
    res.statusCode = 500;
    console.error(e.message);
  }
});


app.post('/editUsers', urlencodedParser, function(req, res) {
  try {
    res.statusCode = 200;
    const obj = JSON.parse(Object.keys(req.body)[0]);
    const id = obj.user_id;
    delete obj.user_id;
    editUser(id, JSON.stringify(obj));
  } catch(e) {
    res.statusCode = 500;
    console.error(e.message);
  }
  res.end()
});



app.listen(port);
console.log('Server started at http://localhost:' + port);