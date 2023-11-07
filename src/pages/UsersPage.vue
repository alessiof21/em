<template>
    <div class="main__grid">
        <div class="grid__form">
            <div class="form__flex-container">
                <h5>Добавление нового пользователя</h5>
                <form class="userForm" action="/" method="post">
                    <label for="firstName">Имя</label> <br/>
                    <input id="firstName" type="text" name="firstName" /> <br/>
                    <label for="nickName">Ник</label> <br/>
                    <input id="nickName" type="text" name="nickName" /> <br/> <br/>
                    <button type="button" class="btn btn-success" data-bs-toggle="button" aria-pressed="false" autocomplete="off">Создать</button>
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
            <div v-if="isVisible" v-for="user in users" class="list__flex-container">
                <div class="user" :id="user.id" :key="user.id">
                    <div>id: {{ user.id }}</div>
                    <div>Имя: <span :id="`fn${user.id}`" contenteditable="true" @input="editUser(user.id)"> {{ user.firstName }}</span></div>
                    <div>Ник: <span :id="`nn${user.id}`" contenteditable="true" @input="editUser(user.id)"> {{ user.nickName }}</span></div>
                    <button :id="`btn${user.id}`" disabled @click="saveChanges(user.id)" type="button" class="btn btn-success" data-bs-toggle="button" aria-pressed="false" autocomplete="off">Сохранить</button>
                </div>
            </div>
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
                users: []
            }
        },
        methods: {
            showList() {
                axios.get('/getUsers').then(response => {
                    this.users = response.data.slice(0);
                    this.isVisible = true;
                });
            },
            editUser(id) {
                const button = document.getElementById(`btn${id}`);
                button.disabled = false;
            },
            saveChanges(id) {
                const button = document.getElementById(`btn${id}`);
                button.disabled = true;
                const editUser = {
                    id: id,
                    firstName: document.getElementById(`fn${id}`).innerText,
                    nickName: document.getElementById(`nn${id}`).innerText
                };
                axios.post('/editUser');
            }
        }
    }
</script>

<style scoped>
    .main__grid {
        padding-top: 2vh;
        width: 100%;
        height: 80vh;
        display: grid;
        grid-template-columns: 30% 70%;
        grid-template-rows: 70% 30%;
    }
    .grid__form {
        padding-left: 5%;
        grid-column: 1/2;
        grid-row: 1/2;
    }
    .grid__btn-list {
        padding-left: 5%;
        grid-column: 1/2;
        grid-row: 2/3;
    }
    .grid__list {
        border: 2px solid teal;
        margin: 0 2vw;
        grid-column: 2/3;
        grid-row: 1/3;
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