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
    this.$axios({
      url:'/admin/account/islogin',
       withCredentials: true
      }).then(res=>{
      console.log(res);
      // 这个在每次刷新时都需要重新登录，接口有bug
      // 怎么这个再次未拦截呢，，这不是入口函数嘛2，所有的都要经此，但是直接输入网址也可以进来呢？？
      if(res.data.code==='nologin'){
        this.$message({
          message:'请先登录',
          type:'danger'
        });
        this.$router.push('/login');
      }else{
        //  this.$message({
        //    message:'你已登录，请不要重复登录的'
        //  })
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
