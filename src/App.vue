<template>
  <my-nav />
  <router-view :changeList="changeList" @changeTrue="changeList = true" @changeFalse="changeList = false"/>
</template>

<script> 
  export default {
    data() {
      return {
        changeList: false
      }
    }
  }
</script>

<style>

</style>
