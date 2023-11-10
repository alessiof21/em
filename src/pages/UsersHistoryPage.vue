<template>
    <div class="main__grid">
        <div class="grid__search">
            <div class="search__flex">
                <button @click="showList" type="button" class="btn btn-success" data-bs-toggle="button" aria-pressed="false" autocomplete="off">История пользователей</button>
                <span :hidden="!search"> {{ answer }}</span>
                <div class="flex__input">
                    <div class="input__flex">
                        <input class="input__number" @input="inputValue = +$event.target.value" type="number" id="search" name="search" placeholder="Введите id"/>
                        <button @click="filter" type="button" class="btn btn-success" data-bs-toggle="button" aria-pressed="false" autocomplete="off">Отфильтровать</button>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="grid__list">
            <div class="list__flex">
                <p v-if="list['1']?.length == 0 || list['1'] == undefined" class="textClue">
                    Чтобы получить список всех пользователей, нажмите кнопку <b>История пользователей</b>. 
                    Чтобы получить информацию об определенном пользователе, введите его <i>ID </i>в <b>поле ввода</b> в верхнем правом углу и нажмите кнопку <b>Отфильтровать</b>.
                </p>
                <table class="table table-sm" v-else>
                    <thead>
                        <tr>
                            <th scope="col">ID пользователя</th>
                            <th scope="col">Универсальный ID</th>
                            <th scope="col">Событие</th>
                            <th scope="col">Время</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="elem in list[`${pageNumber+1}`]">
                            <td scope="row"> {{ elem.user_id }}</td>
                            <td> {{ elem.user_identificator }}</td>
                            <td> {{ elem.user_history }}</td>
                            <td> {{ elem.event_date }}</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        </div>
        <div class="grid__pages">
            <div class="pages__flex">
                <button :disabled="pageNumber == 0" @click="--pageNumber" type="button" class="btn btn-success" data-bs-toggle="button" aria-pressed="false" autocomplete="off">Назад</button>
                <span class="textID" :hidden="!search"> Страница <b> {{ pageNumber + 1 }}</b> </span> 
                <button :disabled="pageNumber == pages" @click="++pageNumber" type="button" class="btn btn-success" data-bs-toggle="button" aria-pressed="false" autocomplete="off">Вперед</button>
            </div>
        </div>   
    </div>    
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                pageNumber: 0,
                pages: 0,
                inputValue: 0,
                list: {},
                cache: [],
                search: false,
                answer: "Нет пользователей с таким id"
            }
        },
        props: {
            changeList: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            async showList() {
                if (this.changeList == true || this.cache.length == 0) { // Если кэш пуст или произошли изменения в списке
                    await axios.get('/getHistoryUsers') // Запрашиваем из базы данных список истории событий пользователей
                        .then((response) => {
                            this.search = true;
                            this.pages = 0;
                            this.list = {};
                            this.cache = response.data.slice(0);
                            this.$emit('changeFalse');
                        })
                        .catch(e => console.error(e.message));
                }
                this.pageNumber = 0;
                this.answer = 'История всех пользователей';
                this.paginate(this.cache); // Делаем пагинацию
            },
            filter() {
                if (this.inputValue == 0) return; // Если не введен id для фильтрования
                const filterList = [];
                for (let i = 0; i < this.cache.length; i++) {
                    if (this.cache[i].user_id == this.inputValue) {
                        filterList.push(this.cache[i]);
                    }
                }
                this.answer = filterList.length == 0 ? `Пользователь с id ${this.inputValue} не найден` : `История пользователя с id ${this.inputValue}`;
                this.paginate(filterList);
            },
            paginate(arr) {
                this.pages = 0;
                this.list = {};
                this.list[`${this.pages + 1}`] = [];
                for (let i = 0; i < arr.length; i++) {
                    if (this.list[`${this.pages + 1}`].length == 10) {
                        ++this.pages;
                        this.list[`${this.pages + 1}`] = [];
                    }
                    this.list[`${this.pages + 1}`].push(arr[i]);
                }
            }
        }
    }
</script>

<style scoped>
    .main__grid {
        padding-top: 2vh;
        width: 100vw;
        height: 90vh;
        display: grid;
        grid-template-columns: 100;
        grid-template-rows: 10% 80% 10%;
    }
    .grid__search {
        grid-column: 1/2;
        grid-row: 1/2;
    }
    .search__flex {
        display: flex;
        justify-content: space-between;
        padding: 0 2vw;
    }
    .input__flex {
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
    }
    .input__number {
        width: 50%;
    }
    .grid__list {
        grid-column: 1/2;
        grid-row: 2/3;
        width: 100%;
    }
    .list__flex {
        display: flex;
        justify-content: center;
    }
    .textClue {
        width: 70%;
        text-align: center;
    }
    .table {
        border: 2px solid teal;
        width: 80%;
    }
    td, th {
       text-align: center;
    }
    .grid__pages {
        grid-column: 1/2;
        grid-row: 3/4;
    }
    .pages__flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .textID {
        padding: 0 2vw;
    }
</style>