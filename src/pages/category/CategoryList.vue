<template>
  <div class="custom-tree-container">
    <el-row type="flex" justify="space-between" align="middle" class="mt20">
      <div class="mb20">
        <el-button @click="handleCategoryAdd">新增</el-button>
      </div>
    </el-row>
    <el-row class="tree-header" type="flex" justify="space-between">
      <span>类别</span>
      <span>排序</span>
      <span>操作</span>
    </el-row>
    <!-- 树形控件 -->
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <input class="kinds" size="mini" v-model="data.sort_id" @blur='handleEnter(data)'>
        </span>
        <span>
          <el-button type="text" size="mini" @click="() => edit(data)">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    handleCategoryAdd() {
      this.$router.push("/admin/categoryadd");
    },
    edit(data){
        // data返回本身身上具有的所有信息，如子级，title，label等
        // console.log(data);
        this.$router.push(`/admin/categoryedit/${data.category_id}`);
    },
    handleEnter(data){
         this.$axios({
            method:'post',
            url:`/admin/category/edit/${data.category_id}`,
            data
        }).then(res=>{
             const { status, message } = res.data;
             if(status===0){
             this.$message({
                message:'排序数值已更改',
                type:'success'
            })
             }
           
        })
    }
  },
  mounted() {
    this.$axios("/admin/category/getlist/goods").then(res => {
      console.log(res);
      let { message } = res.data;
      let arr = [];
      message=message.sort((a,b)=>{
           return a.category_id - b.category_id;
      })
      function loop(arr, v) {
        arr.forEach(val => {
          if (val.category_id === v.parent_id) {
            if (!val.children) {
              val.children = [];
            }
            val.children.push({
              ...v,
              id: v.category_id,
              label: v.title
            });
          }
          if (val.children) {
            loop(val.children, v);
          }
        });
      }

      message.forEach(v => {
        if (v.parent_id === 0) {
          arr.push({
            ...v,
            id: v.category_id,
            label: v.title
          });
        } else {
          loop(arr, v);
        }
      });
        this.data = arr;

    });
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 20px;
}
.tree-header {
  background: #fff;
  padding: 0 10px;
  font-size: 14px;
  color: #333;
}
.el-row {
  margin-bottom: 0;
}
.kinds {
  width: 40px;
  height: 17px;
  text-align: center;
}
</style>
