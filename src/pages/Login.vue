<template>
    <div class='login-form'>
        <div class="login-form-title">登录</div>
        <el-form :model="loginData" status-icon label-width="60px" class="demo-ruleForm">
  <el-form-item label="账号">
    <el-input type="text" v-model="loginData.uname" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" >
    <el-input type="password" v-model="loginData.upwd" autocomplete="off"></el-input>
  </el-form-item>
 
  <el-form-item class='submit'>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
  export default {
    data() {    
      return {
        loginData: {
          uname:'',
          upwd:''
        },   
      };
    },
    methods: {
      // 提交的时候发送请求
      submitForm() {
        this.$axios({
        method:'post',
        url:'/admin/account/login',
        data: this.loginData,
      }).then(res=>{
        // console.log(res);
        // 或者是换成解构的思路  let {status,message}=res.data;
        // if(res.data.status===0){
        //   this.$message({
        //   message:'登录成功',
        //   type:'success'
        // })
        // this.$router.back();
        // }
      //  在这里message是用户登录的信息，，不是提示类的信息
       const {status,message}=res.data;
       if(status===0){
         this.$message({
           message:'登录成功',
           type:'success'
         })
         this.$router.back();
       }
      })
      },
      resetForm() {
       this.loginData={
          uname:'',
          upwd:''
       };
      },
    },
    mounted(){
    
    }
  }
</script>

<style>
.login-form{
    width:450px;
    position: absolute;
    top:50%;
    left: 50%;
    margin:-150px 0 0 -300px;
}
.login-form-title{
    text-align: center;
    margin-bottom: 20px;
    color:#66b1ff;
    padding-left:40px;
}
.submit{
    text-align: center;
}
</style>
