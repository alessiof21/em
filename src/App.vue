<template>
  <my-nav />
  <router-view />
</template>

<script> 
  import axios from 'axios';
  export default {
    methods: {
      func() {
        axios.get('/getName').then((response) => {
          console.log(response.data);
        })
      }
    }
  }
</script>

<style>

</style>
