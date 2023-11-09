<template>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button @click="$router.push('/')" class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Сервис пользователей</button>
        </li>
        <li class="nav-item" role="presentation">
            <button @click="$router.push('/history')" class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Сервис истории пользователей</button>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'my-nav',
    }
</script>

<style scoped>

</style>