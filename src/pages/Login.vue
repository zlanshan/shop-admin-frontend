<template>
    <div class='login-form'>
        <div class="login-form-title">登录</div>
        <el-form :model="ruleForm2" status-icon label-width="60px" class="demo-ruleForm">
  <el-form-item label="账号">
    <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" >
    <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
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
        ruleForm2: {
          username:'',
          password:''
        },   
      };
    },
    methods: {
      submitForm() {
       alert(this.ruleForm2);
      },
      resetForm() {
       this.ruleForm2={
             username:'',
          password:''
       };
      }
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
