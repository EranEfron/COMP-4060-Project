<template >
  <Header />
    <h1>Welcome to Car Web</h1>

</template>

<script>
import Header from './Header.vue'
export default{
  name:'Home',
  components:{
    Header
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>