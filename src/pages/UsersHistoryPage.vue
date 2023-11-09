<template>
    <div class="main__grid">
        <div class="grid__search">
            <div class="search__flex">
                <input type="text" id="search" name="search" placeholder="Введите id"/>
            </div>
        </div>
        <div class="grid__list">

        </div>
        <div class="grid__pages">
            <div class="pages__flex">
                <button :disabled="pageNumber == 1" @click="--pageNumber" type="button" class="btn btn-success" data-bs-toggle="button" aria-pressed="false" autocomplete="off">Назад</button>
                <button :disabled="pageNumber > pageCount-1" @click="++pageNumber" type="button" class="btn btn-success" data-bs-toggle="button" aria-pressed="false" autocomplete="off">Вперед</button>
            </div>
        </div>   
    </div>    
</template>

<script>
    export default {
        data() {
            return {
                pageNumber: 1,
                pageCount: 10,
            }
        }
    }
</script>

<style scoped>
    .main__grid {
        padding-top: 2vh;
        width: 100%;
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
        justify-content: space-around;
    }
    .grid__list {
        grid-column: 1/2;
        grid-row: 2/3;
    }

    .grid__pages {
        grid-column: 1/2;
        grid-row: 3/4;
    }
    .pages__flex {
        display: flex;
        justify-content: center;
    }
</style>