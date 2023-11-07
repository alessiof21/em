const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

let answer = 'Ничего не введено'

app.use(express.static('dist'));

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.post('/', urlencodedParser, function(req, res) {
  answer = req.body.textName;
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

app.get('/getUsers', function(req, res) {
  const arr = [                    
    {
      id: 1,
      firstName: "Alex",
      nickName: 'Alessiof21'
    },
    {
      id: 2,
      firstName: "Nick",
      nickName: 'RandonNickname'
    },
  ];
  res.end(JSON.stringify(arr));
});

app.post('/editUser', urlencodedParser, function(req, res) {

}) 



app.listen(port);
console.log('Server started at http://localhost:' + port);