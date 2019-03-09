<template>
    <el-row type="flex"  justify='space-between' align='middle'>
  <i class='el-icon-back' @click='handleClick' ></i>
  <div>{{username}} {{identity}}</div>
  <a href="javascript:void(0);" class='exit' @click='handleExit'>退出</a>
</el-row>
</template>

<script>
import {mapState} from 'vuex';
export default {
    computed:{
      ...mapState('user',{
          username:'username',
          identity:state=>state.identity
      })
    },
methods:{
    handleClick(){
        this.$emit('onchange')
    },
    handleExit(){
        // 引用user中的方法,dispatch中可以传方法和数据？？
        this.$store.dispatch('user/exit',()=>{
            // console.log('44555');
            this.$router.push('/login');
        })
    }
}
}
</script>

<style>

 .el-row {
    margin-bottom: 20px;  
  }
.el-icon-back{
    font-size: 20px;
    cursor:pointer;
}
.exit{
    color:#333;
    text-decoration: none;
}
</style>
