<template>
<div class='breadcrumb'>
 <el-breadcrumb separator-class="el-icon-arrow-right">
  <!-- <el-breadcrumb-item :to="{ path: '/' }">管理后台</el-breadcrumb-item> -->

  <el-breadcrumb-item :to='{path: item.src}' v-for='(item,index) in dataSource' :key='index' >{{item.title}}</el-breadcrumb-item>

</el-breadcrumb>
</div>
   
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

},
// (item,index) in routeInfo,这是采用computed监听的属性设置面包屑的内容，，但上面的方法就是通过组减传值
// computed:{
//     routeInfo:function () {
//         const matched=this.$route.matched;
//         const newArr=matched.map(v=>{
//             return {
//                 src:v.path,
//                 title:v.meta
//             }
//         })
//         return newArr;
//       }
// }
}
</script>

<style>
.breadcrumb{
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
}
</style>
