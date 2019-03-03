<template>
  <div class="admin-container">
    <el-container>
      <el-aside width="auto">
        <!-- 预留logo的位置 -->
        <div class="logo"></div>
          <admin-aside></admin-aside>
          </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '../components/Aside';
export default {
    components:{
        'admin-aside':Aside
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
    line-height: 160px;
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
