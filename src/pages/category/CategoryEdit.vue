<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" class="mt20">
    <el-form-item label="所属类别">
       <el-cascader
        expand-trigger="hover"
        :options="data"
        :show-all-levels="false"
         @change="handleChange" 
       ></el-cascader>  
     <span class='tips'>当前分类的id为：{{form.id}}</span>
         <!-- v-model="form.category_id" -->
    </el-form-item>
    <el-form-item label="类别频道">
      <el-input v-model="form.channel_id"></el-input>
      <!-- <span class="tips">栏目排序，排序不能小于0</span> -->
    </el-form-item>
    <el-form-item label="父类别">
      <el-input v-model="form.parent_id"></el-input>
      <span class="tips">栏目排序，排序不能小于0</span>
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
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click='handleBack'>取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
        id:'',
        // 编辑所需要的请求体
      form: {
        //   类别名称
          title:'',
        //   类别id
          id:'',
         // 类别所属的频道，，但这主要是goods
          channel_id:'',
        //   父级别
          parent_id:'',
        //   类别排序号
          sort_id:'',
        //   类别的级别
          class_layer:''
      },
    //   级联选择器
      data: [],
    };
  },


  methods: {
      //  级联选择器动态变化数据
      handleChange(data){
          // 选中分类的id数据
         this.form.id = data[data.length -1];
      },
    //   取消按钮的事件函数
      handleBack(){
        this.$router.push('/admin/categorylist');
      },
    //   修改保存后添加的数据
      onSubmit(){
        //   获取当前的编辑数据的id
          this.id=this.$route.params.id;
        //   post请求多数会涉及到跨域的问题，这需具体情况具体在分析的
          this.$axios({
            method:'post',
            url:`/admin/category/edit/${this.id}`,
            data:this.form
        }).then(res=>{
            // 解构
             const { status, message } = res.data;
             if(status===0){
                //  成功后返回的提示信息
             this.$message({
                message,
                type:'success'
            })
            // 成功后就间隔一会在跳转页面
            setTimeout(()=>{
                // 这就是回退，相当于回到栏目管理列表页
               this.$router.back();
            },1000)
             }
           
        })
      }
  },

// 这是页面打开时，就可以生成的数据，mounted就是生命周期函数
  mounted() {
      this.id=this.$route.params.id;
    //   打开页面后，该分类数据都填写在输入框内
      this.$axios({
         url:`/admin/category/getcategorymodel/${this.id}`
       }).then(res=>{
         console.log(res);
         const {message,status}=res.data;
         if(status===0){
            //  message是一个数组，在这要获取就需是通过索引获取，，而不直接是message
             this.form=message[0];
         }
     })

//    这是级联选择器的获取所有的分类数据，用到递归才能遍历出所有的数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      const { message } = res.data;
      // 最终的结果的数组
      let arr = [];

      // 递归函数
      function loop(arr, item) {
        arr.forEach(v => {
          // 最重要的判断，判断item的id是否和父级的category_id相等，
          // 如果相等的话就把item加入到当前分类下children
          if (v.category_id == item.parent_id) {
            // 判断当前的分类是否有children属性
            if (!v.children) {
              //没有的话初始化为空数组
              v.children = [];
            }

            // 加入到当前分类下children，value，label都需是在比较判断的子项，而不是父项的
            v.children.push({
              ...item,
              value: item.category_id,
              label: item.title
            });
            return;
          }

          // 如果不符合上面的条件，继续递归判断当前分类的子元素，知道所有的数据便利玩，条件都不成立后就退出
          if (v.children) {
            loop(v.children, item);
          }
        });
      }

    //  对当前获取到的数据就行判断并用递归函数遍历的
      message.forEach(v => {
        // 如果是顶级的分类直接加入到arr
        if (v.parent_id === 0) {
            // 这是一级菜单分组的
          arr.push({
            ...v,
            value: v.category_id,
            label: v.title
          });
        } else {
          // 如果不是顶级分类，通过递归函数去查找父级分类
          loop(arr, v);
        }
      });
    // 最后遍历完后，，将当前数组的信息完全复制给this.data中
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
