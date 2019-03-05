<template>
 
    
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"   
      :collapse="isCollapse"
       text-color="#fff"
      active-text-color="#f00"
    >

      <el-submenu v-for='(item,index) in menus' :key='index' :index="`${index+1}`">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <!-- <span slot="title">分组一</span> -->
          <el-menu-item v-for='(subItem,subIndex) in item.group' :key='subIndex' :index="`${index+1}-${subIndex+1}`">
              <router-link :to='subItem.src'>{{subItem.content}}</router-link></el-menu-item>
          <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
        </el-menu-item-group>
       
      </el-submenu>
     
    </el-menu>
  
</template>
<script>
export default {
    props:['isCollapse'],
  data() {
    return {
     
      menus:[
          {
            icon:'el-icon-menu',title:'购物商城',
            group:[{src:'/admin/goodslist',content:'商品管理'},{src:'/admin/categorylist',content:'栏目管理'}]
          },
          {
            icon:'el-icon-service',title:'会员管理',
            group:[{src:'/admin/accountlist',content:'会员列表'}]
          },
          {
            icon:'el-icon-tickets',title:'商城订单',
            group:[{src:'/admin/orderlist',content:'订单列表'}]
          },
      ]
    };
  },
 
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
/* 在admin中el-aside中设置display：flex和logo的高度，在这就可占卜剩下的所有高度 */
.el-menu-vertical-demo{
    flex: 1;
    background: #002144;
}
.el-submenu__title{
    color:#ddd;
}
.el-submenu__title:hover{
    background: #00152a;
}
.el-menu-item-group__title{
    display: none;
}
.el-submenu .el-menu-item{
    background: #000c18;
   
}
/* .el-menu-item .is_active{
  color:yellow;
} */

.el-submenu .el-menu-item> a{
        cursor:pointer;
        color:#aaa;
        text-decoration: none;
    }
</style>

