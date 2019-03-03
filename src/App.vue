<template>
  <div id="app">
    
     <!-- <login-a></login-a> -->
    
    
  </div>
</template>

<script>
// import Login from './components/Login.vue';



export default { 
  name: 'app',
  // components:{
  //   'login-a':Login
  // },

  mounted(){
 this.$axios.get('https://api.github.com/users').then(res=>{
       console.log(res.data);
  })
  }
 
}
</script>

<style>

</style>
