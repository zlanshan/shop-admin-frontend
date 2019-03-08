<template>
  <div id="app">
    
     <!-- <login-a></login-a> -->
    <router-view></router-view>
    
  </div>
</template>

<script>
// import Login from './components/Login.vue';



export default { 
  name: 'app',
  mounted(){
    this.$axios.get('/admin/account/islogin').then(res=>{
      console.log(res);
      // 这个在每次刷新时都需要重新登录，接口有bug
      if(res.data.code==='nologin'){
        // console.log(res);
        this.$message({
          message:'请先登录',
          type:'danger'
        });
        // this.$router.push('/login');
      }else{

      }
    })
  }

//   mounted(){
//  this.$axios.get('https://api.github.com/users').then(res=>{
//        console.log(res.data);
//   })
//   }
 
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.mt20{
  margin-top:20px;
}
.mb20{
  margin-bottom:20px;
}
</style>
