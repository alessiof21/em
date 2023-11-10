const sql = require('./base.js');

// Создание таблиц, если это необходимо
async function init() {
    try {
        // Создаем таблицу users - хранящую id пользователей в колонке user для связи с другими таблицами
        await sql`
          CREATE TABLE IF NOT EXISTS users(
            user_id serial primary key,
            user_identificator varchar(20) not null
          );
        `
        // Создаем таблицу users_info, которая хранит информацию о пользователе и связана внешним ключем user_id с таблицей users
        await sql`
            CREATE TABLE IF NOT EXISTS users_info(
              id serial primary key,
              user_id integer references users(user_id) ON DELETE CASCADE,
              user_info json
            );
        `
        // Создаем таблицу
        await sql`
              CREATE TABLE IF NOT EXISTS users_history(
                id serial primary key,
                user_id integer references users(user_id) ON DELETE CASCADE,
                user_history varchar(40) not null,
                event_date timestamp without time zone
              );
        `
      } catch(e) {
        console.error(e.message);
      }
}

// Получение списка пользователей
async function getUsers() {
    const users = await sql`
        SELECT user_id, user_info FROM users_info;
    `
    return users;
}

// Получение списка истории событий пользователей
async function getHistoryUsers() {
    const users = await sql`
        SELECT user_id, user_identificator, user_history, event_date 
        FROM users_history
        INNER JOIN users USING(user_id);
    `;
    return users;
}

// Добавление пользователя в базу данных
async function addUser(json) {
    const id = `${Date.now()}`;
    await sql`
        INSERT INTO users(user_identificator) VALUES( ${id} );
    `

    await sql`
        INSERT INTO users_info(user_id, user_info) VALUES(
            (SELECT user_id FROM users WHERE user_identificator = ${ id }), ${ json }
        );
    `

    await sql`
        INSERT INTO users_history(user_id, user_history, event_date) VALUES(
            (SELECT user_id FROM users WHERE user_identificator = ${ id }), 'Пользователь создан', ${ Date.now() }
        );
    `
    

}

// Редактирование строки пользователя в базе данных
async function editUser(id, json) {
    await sql`
        UPDATE users_info
        SET user_info = ${ json }
        WHERE user_id = ${ id };
    `

    await sql`
        INSERT INTO users_history(user_id, user_history, event_date) VALUES(
            ${ id }, 'Обновление информации о пользователе', ${ Date.now() }
        );
    `

}

module.exports = {
    init, getUsers, getHistoryUsers, addUser, editUser
}