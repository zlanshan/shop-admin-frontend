<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <!-- <el-breadcrumb-item :to="{ path: '/' }">管理后台</el-breadcrumb-item> -->

  <el-breadcrumb-item v-for='(item,index) in dataSource' :key='index' >{{item}}</el-breadcrumb-item>

</el-breadcrumb>
</template>

<script>
export default {
    // 父组件向子组件传值，且该值是个数组形式的
    props:['dataSource'],
data(){
    return {
       
    }
},
methods:{

}
}
</script>

<style>

</style>
