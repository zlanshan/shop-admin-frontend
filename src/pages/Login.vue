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
        var name=this.loginData.uname;
        var pwd=this.loginData.upwd;
       
        if(this.checked=true){
          this.setCookie(name,pwd,7);
        }
        this.$axios({
        method:'post',
        url:'/admin/account/login',
        data: this.loginData,
        withCredentials: true,
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
       }else{
         this.$message({
           message:message,
           type:'warning'
         })
       }
      })
      },
      resetForm() {
       this.loginData={
          uname:'',
          upwd:''
       };
      },
      //设置cookie
  setCookie(c_name,c_pwd,exdays) {
    var exdate=new Date();//获取时间
    exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
    //字符串拼接cookie
    window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
    window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
  },
  //读取cookie
  getCookie:function () {
    if (document.cookie.length>0) {
      var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
      for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');//再次切割
        //判断查找相对应的值
        if(arr2[0]=='userName'){
          this.formData.uname=arr2[1];//保存到保存数据的地方
        }else if(arr2[0]=='userPwd'){
          this.formData.upwd=arr2[1];
        }
      }
    }
  },
  //清除cookie
  clearCookie:function () {
    this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
  }
},
//页面加载调用获取cookie值
    mounted(){
     this.getCookie()
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
