<template>
  <div class="admin-container">
    <el-container>
      <el-aside width="auto">
        <!-- 预留logo的位置 -->
        <div class="logo"></div>
          <admin-aside :isCollapse='isCollapse'></admin-aside>
          </el-aside>
      <el-container>
        <el-header><admin-header @onchange='handleE'></admin-header></el-header>
        <el-main>
          <!-- :dataSource这就是一个数组，如何传到子组件中，，props传值 -->
          <admin-breadcrump :dataSource='bread'></admin-breadcrump>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '../components/Aside';
import Header from '../components/Header';
import Breadcrump from '../components/Breadcrump';

export default {
  data(){
    // 父组件船只给子组件，，父组件的值又是通过触发事件后值更改了，因而还需绑定个父子组件事件传递采纳数
    return { isCollapse: false}
  },
    components:{
        'admin-aside':Aside,
        'admin-header':Header,
        'admin-breadcrump':Breadcrump
    },
    methods:{
      // 在这直接设置值取反，再到子组件中设置触发该事件后，传事件的方法
      handleE:function () {
        this.isCollapse=!this.isCollapse;
        }
    },
    computed:{
      // 计算监听 属性，computed用法是在概要设置的标签上添加属性值为bread，属性名就为传值的子组件的props
      bread(){
        // 返回数组，这个数组是this.$route.matched中的meta的信息，根据路径的多少获取几个meta信息
        // console.log(this.$route.matched);
        var arr=this.$route.matched.map(function (v) {return {src:v.path,title:v.meta }});
        // computed是返回数据的 
        return arr; 
        }
      
    }
};
</script>

<style>
/* 设置高度为100%，平铺整个屏幕的 固定定位fixed+top+bottom设置为0，高度就能设置为100%，width100%设置宽度 */
.admin-container{
    position: fixed;
    top:0;
    bottom: 0;
    width:100%;
}
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding:0 20px;
     /* background-color: #eee; */
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /* text-align: center; */
    /* line-height: 200px; */
    /* height: 100%; */
    /* 设置flex，和column是便于内部的标签布局，直接设置height：100%在预留logo时有点bug */
    display: flex;
    flex-direction: column;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 40px;
  }
  /* 设置height：100%继承admin-container中的高度 */
  body .el-container {
    margin-bottom: 40px;
    height: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .logo{
    height: 60px;
    background: #002144;
    /* border-right 设置为solid 1px #e6e6e6时  
    aside中不需要改，，否则是将其中的最大的aside标签设置border-right为none*/
        border-right: solid 1px #e6e6e6;
  }
</style>
