# em
Мини-приложение, позволяющее создавать пользователей (имя и ник), редактировать их данные

Можно получить список пользователей

Также можно получить список - историю событий пользователей 

Приложение реализовано на Vue3 и Express, в качестве базы данных для хранения информации используется PostgreSQL (postgres.js)

Backend:
файл index.js (папка проекта)

Frontend:
файлы в папке src

Взаимодействие с базой данных:
папка src/db (файл base.js - подключение postgres.js и подключение к базе данных PostgreSql и файл index.js - содержащий всю логику работы с базой данных)

Приложение уже готово к запуску (в папке dist хранится build проекта)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Start app
```
npm start
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
