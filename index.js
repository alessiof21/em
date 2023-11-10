const express = require('express');
const path = require('path');

const { init, getUsers, getHistoryUsers, addUser, editUser } = require('./src/db/index.js')

const app = express();
const port = process.env.PORT || 8081;

app.use(express.static('dist'));

// Взаимодействия с основной страницей
app.route('/')
  .get(function(req, res) { // Открытие приложения
    try {
      res.statusCode = 200;
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    } catch(e) {
      res.statusCode = 500;
      console.error(e.message);
    }
    res.end();
  })

  .post(express.json(), function(req, res) { // Отправка формы
    try {
      res.statusCode = 200;
      if (!req.body.firstName || !req.body.nickName) return; // Если форма не полная, то не вносить такого "пользователя в базу"
      const json = JSON.stringify({firstName: req.body.firstName, nickName: req.body.nickName});
      addUser(json);
    } catch(e) {
      res.status = 500;
      console.error(e.message);
    }
    res.end();
  })

app.get('/history', function(req, res) { // Если пользователь хочет перейти на вкладку история - отправить его на основную страницу
  res.redirect('/');
});

// Получение списка пользователей из базы данных
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
  res.end();
});

// Получение списка истории событий для пользователей
app.get('/getHistoryUsers', async function(req, res) {
  try {
    res.statusCode = 200;
    const list = (await getHistoryUsers()).slice(0);
    res.end(JSON.stringify(list));
  } catch(e) {
    res.statusCode = 500;
    console.error(e.message);
    res.end();
  }
});

// Редактирование пользователя
app.post('/editUsers', express.json(), function(req, res) {
  try {
    res.statusCode = 200;
    const obj = req.body;
    const id = obj.user_id;
    delete obj.user_id;
    editUser(id, JSON.stringify(obj));
  } catch(e) {
    res.statusCode = 500;
    console.error(e.message);
  }
  res.end()
});


// Запуск сервера
app.listen(port, function(err) {
  if (err) return console.error('Error in server setup');
  init();
  console.log('Server started at http://localhost:' + port);
});
