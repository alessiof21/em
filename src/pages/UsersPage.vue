<template>
    <div class="main__grid">
        <div class="grid__form">
            <div class="form__flex-container">
                <h5>Добавление нового пользователя</h5>
                <form @submit.prevent="createUser">
                    <label for="firstName">Имя</label> <br>
                    <input id="firstName" type="text" name="firstName" required/> <br>
                    <label for="nickName">Ник</label> <br>
                    <input id="nickName" type="text" name="nickName" required/> <br> <br>
                    <input type="submit" value="Создать" class="btn btn-success" />
                </form>
            </div>
        </div>
        <div class="grid__btn-lst">
            <div class="btn-list__flex-container">
                <h5>Вывод списка пользователей</h5>
                <button @click="showList" type="button" class="btn btn-success" data-bs-toggle="button" aria-pressed="false" autocomplete="off">Показать список</button>
            </div>
        </div>

        <div class="grid__list">
            <div v-if="isVisible">
                <p class="textClue">Чтобы изменить данные, отредактируйте текст и нажмите кнопку <b>Сохранить</b>.</p>
                <div v-for="user in users" class="list__flex-container">
                    <div class="user" :id="user.user_id" :key="user.user_id">
                        <div>id: {{ user.user_id }}</div>
                        <div>Имя: <span :id="`fn${user.user_id}`" contenteditable="true" @input="editUser(user.user_id)"> {{ user.firstName }}</span></div>
                        <div>Ник: <span :id="`nn${user.user_id}`" contenteditable="true" @input="editUser(user.user_id)"> {{ user.nickName }}</span></div>
                        <button :id="`btn${user.user_id}`" disabled @click="saveChanges(user.user_id)" type="button" class="btn btn-success" data-bs-toggle="button" aria-pressed="false" autocomplete="off">Сохранить</button>
                    </div>
                </div>
            </div>
            <p v-else class="textClue">
                Здесь будет отображаться список пользователей, если Вы нажмете кнопку <b>Показать список</b>.
            </p>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                isVisible: false,
                isEdit: false,
                users: [],
                cache: {}
            }
        },
        methods: {
            createUser() { // Создание пользователя, отправка формы
                const values = { // Можно добавить разные поля в форму, а потом в этот объект (где ключ - id input)
                    firstName: '',
                    nickName: ''
                }
                for (const key in values) {
                    const elem = document.getElementById(key);
                    values[key] = elem.value;
                    elem.value = ''; // Очищаем форму
                }
                axios.post('/', values)
                    .then(() => {
                        //Если у нас произошло добавление пользователя и мы это передали в базу данных, очищаем кэш
                        this.$store.commit('cached', []);
                        this.isVisible = false;
                        this.showList();
                    })
                    .catch(e => console.error(e.message));
            },
            showList() {
                if (!this.isVisible) {
                    axios.get('/getUsers')
                        .then(response => {
                            this.users = response.data.slice(0);
                            this.isVisible = true;
                        })
                        .catch(e => console.error(e.message));
                }
            },
            editUser(id) {
                const button = document.getElementById(`btn${id}`);
                button.disabled = false;
                if (this.cache[id] === undefined) {
                    this.cache[id] = {
                        firstName: document.getElementById(`fn${id}`).innerText,
                        nickName: document.getElementById(`nn${id}`).innerText,
                    }
                }
            },
            saveChanges(id) {
                const button = document.getElementById(`btn${id}`);
                button.disabled = true;
                let firstName = document.getElementById(`fn${id}`).innerText;
                let nickName = document.getElementById(`nn${id}`).innerText;
                if (firstName === '' || nickName === '') { 
                    // Если одно из полей пустое, то вернуть кэш для пустого поля и вернуть значение в инпут
                    firstName ||= this.cache[id].firstName;
                    nickName ||= this.cache[id].nickName;
                    document.getElementById(`fn${id}`).innerText = firstName;
                    document.getElementById(`nn${id}`).innerText = nickName;
                }
                if (this.cache[id].firstName !== firstName || this.cache[id].nickName !== nickName) {
                    // Отправляем данные только если они, действительно, обновились
                    const editUser = {
                        user_id: id,
                        firstName: firstName,
                        nickName: nickName
                    };
                    axios.post('/editUsers', editUser)
                        .then(() => {
                            //Если у нас произошло изменение пользователя и мы это передали в базу данных, очищаем кэш
                            this.$store.commit('cached', []);
                        })
                        .catch(e => console.error(e.message))
                }
                delete this.cache[id]; // Очищаем кэш
            }
        },
    }
</script>

<style scoped>
    .main__grid {
        padding-top: 2vh;
        width: 100%;
        height: 90vh;
        display: grid;
        grid-template-columns: 30% 70%;
        grid-template-rows: 70% 30%;
    }
    .grid__form {
        padding-left: 5%;
        grid-column: 1/2;
        grid-row: 1/2;
    }
    .textClue {
        text-align: center;
    }
    .grid__list {
        border: 2px solid teal;
        margin: 0 2vw;
        grid-column: 2/3;
        grid-row: 1/3;
        overflow-y: scroll;
    }
    .form__flex-container {
        border: 2px solid teal;
        padding: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .btn-list__flex-container {
        display: flex;
        padding: 4px;
        flex-direction: column;
        align-items: center;
        justify-content: center
    }
    .list__flex-container {
        display: flex;
        flex-direction: column;
    }
    .user {
        margin: 2px;
        padding: 2px;
        border: 2px solid teal;
    }
</style>