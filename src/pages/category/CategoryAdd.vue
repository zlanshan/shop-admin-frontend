<template>
  <el-form ref="form" :model="form" label-width="80px" class="mt20">
    <el-form-item label="所属类别">
       <el-cascader
        expand-trigger="hover"
        :options="data"
        :show-all-levels="false"
         @change="handleChange" 
       ></el-cascader>  
     <span class='tips'>当前分类的id为：{{form.category_id}}</span>
         <!-- v-model="form.category_id" -->
    </el-form-item>
    <el-form-item label="排序数字">
      <el-input v-model="form.sort_id"></el-input>
      <span class="tips">栏目排序，排序不能小于0</span>
    </el-form-item>
    <el-form-item label="类别名称">
      <el-input v-model="form.title"></el-input>
      <span class="tips">类别中文名称，100字符内</span>
    </el-form-item>
    <el-form-item label="类别级别">
      <el-input v-model="form.class_layer"></el-input>
      <span class="tips">类别的级别。1:1级菜单 2：二级菜单 以此类推</span>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click='handleBack'>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
          title:'',
          sort_id:'',
          category_id:0,
          class_layer:''
      },
      data: [],
    };
  },
  methods: {
    // 这是获取当前的category_id，data指的是父级子级的所有的category_id，子级是在最后的
    handleChange(data) {
    //   console.log(data);
    this.form.category_id=data[data.length-1];
    },
    // 新建保存提交事件
    onSubmit(){
      this.$axios({
          method:'post',
          url:'/admin/category/add/goods',
          data:this.form
      }).then(res=>{
          const {message,status}=res.data;
          if(status===0){
            // 数据保存成功
               this.$message({
              message,
              type:'success'
          })
          setTimeout(()=>{
          this.$router.replace('/admin/categorylist');
          },1000);
          }
         
      })
    },
    // 去下后的回退或是直接跳转到另一界面
    handleBack(){
        this.$router.push('/admin/categorylist');
    }
  },

  // 生命周期函数，页面结构形成后就出现的
  mounted() {
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      let { message} = res.data;
      // 先将数组的数据进行排序，，主要是通过category_id的，sort方法类似三元表达式的，从小到大的排列
      message=message.sort((a,b)=>{
           return a.category_id - b.category_id;
      })
      // console.log(res); 
        var arr = [];
      //  递归函数
        function loop(arr, v) {
          arr.forEach(val => {
            if (val.category_id === v.parent_id) {
              if (!val.children) {
                val.children = [];
              }
              val.children.push({
                ...v,
                value: v.category_id,
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
            value: v.category_id,
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

<style scoped>
.el-form-item {
  text-align: left;
}
.el-input {
  width: 50%;
}
</style>
