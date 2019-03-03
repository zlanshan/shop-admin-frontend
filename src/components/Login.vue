<template>
  <div class='login'>
      <div class="title">登录</div>
    <el-row class='user'>
       <span>账号 </span> <el-input  placeholder="请输入账号" v-model="name"  name='username'></el-input>
    </el-row>
    <el-row class='pwd'>
       <span>密码 </span> <el-input placeholder="请输入密码" v-model="pwd" show-password name='password'></el-input>
    </el-row>
    <el-row class='sub'>
      <el-button type="primary" class='submit' v-on:click='handleSubmit'>提交</el-button>
      <el-button class='reset' v-on:click='handleReset'>重置</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
data() {
    return {
        name:'',
        pwd:''
  }
},
methods:{
   handleSubmit:function () {
      var name=this.name;
      var pwd=this.pwd;
      if(name==''||pwd==''){
          this.$message({
              message:'账号或密码不能为空',
              type:'error'
          })
          return;
      }
      if(!/^1[34578]\d{9}$/.test(name)){
         this.$message({message:'账号只能是十一位的数字组合'});
         return;
      }
      if(!/^[\w_-]{6,16}$/.test(pwd)){
         this.$message({message:'密码位数为6-16位'});
         return;
      }
      alert('name='+name+'&password='+pwd)
    //  alert(name+pwd);这返回的是一个字符串
     } ,
     handleReset:function () {
         this.name='',
         this.pwd=''
       }

}
}
</script>

<style >
.login{
    width:500px;
    margin:50px auto;
}
.title{
    color:rgb(8, 137, 243);
    text-align: center;
}
.user,.pwd{
display: flex;
width:100%;
margin-top:20px;

}
span{
    display: flex;
    justify-content: center;
    align-items: center;
    width:60px;
}


.sub{
    margin-top:20px;
   text-align: center;
}
</style>
