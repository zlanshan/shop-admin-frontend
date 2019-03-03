<template>
    <el-row type="flex"  justify='space-between' align='middle'>
  <i class='el-icon-back' @click='handleClick' ></i>
  <div>Admin</div>
</el-row>
</template>

<script>
export default {
methods:{
    handleClick(){
        this.$emit('onchange')
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
</style>
