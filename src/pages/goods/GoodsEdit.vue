<template>
  <div class="add">
    <!-- 配置表单 :model="formData"动态的数据对象，，其内部数据属性就根据此获取数据，v-model前不需添加冒号了-->
    <el-form :model="formData" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- 所属类别，分组选择器 -->
      <el-form-item label="所属类别">
        <!--分组选择器 ，存储表单中的数据是category_id的，，option中最终结果是与此有关的 -->
        <el-select v-model="formData.category_id" placeholder="请选择" class="choose">
          <!-- 大分组，循环  label是标签名即第一级菜单 -->
          <el-option-group v-for="(item,index) in categorys" :key="index" :label="item.title">
            <!-- 小分组，每个大分组的都具有多个小分组元素，且循环也在里面的 -->
            <el-option
              v-for="(item2,index2) in item.group"
              :key="index2"
              :label="item2.title"
              :value="item2.category_id"
            >
              <!-- 最后获取的就是category_id的值 -->
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <!-- 是否发布，，switch是一个开关按钮类型 -->
      <el-form-item label="是否发布" class="status">
        <el-switch v-model="formData.status"></el-switch>
        <span class="tips">*不发布前台则无法显示</span>
      </el-form-item>
      <!-- 推荐类型，，涉及到status状态 -->
      <el-form-item label="推荐类型" class="status">
        <el-checkbox v-model="formData.is_top">置顶</el-checkbox>
        <el-checkbox v-model="formData.is_hot">热门</el-checkbox>
      </el-form-item>
      <!-- 内容标题 -->
      <el-form-item label="内容标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <!-- 副标题 -->
      <el-form-item label="副标题">
        <el-input v-model="formData.sub_title"></el-input>
      </el-form-item>
      <!-- 封面图片，，这个也涉及接口，上传图片的接口，action指向路径，需加上http:127.0.0.1:8899
      因为前面定义的是关于axios的请求，on-success成功后的函数-->
      <el-form-item label="封面图片">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:8899/admin/article/uploadimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <!-- 若存在imageurl的值时，就显示图片了，路径就是imageUrl? -->
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <!-- v-else就是上面的不成立，就执行此 -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 商品货号 -->
      <el-form-item label="商品货号" class="number">
        <el-input v-model="formData.goods_no"></el-input>
      </el-form-item>
      <!-- 库存数量 -->
      <el-form-item label="库存数量" class="number">
        <el-input v-model="formData.stock_quantity"></el-input>
        <div class="autocreate">
          <!-- <span class="tips">*我不确定要不要自动生成</span> -->
        </div>
      </el-form-item>
      <!-- 市场价格 -->
      <el-form-item label="市场价格" class="number">
        <el-input v-model="formData.market_price"></el-input>
      </el-form-item>
      <!-- 销售价格 -->
      <el-form-item label="销售价格" class="number">
        <el-input v-model="formData.sell_price"></el-input>
      </el-form-item>
      <!-- 照片墙 on-success是成功后添加的钩子函数
      :file-list='formData.fileList'这是配置数据，方便拿到数据后能够匹配到路径并显示图片
          multiple是否显示多张图片-->
      <el-form-item label="图片相册" style="text-align:left">
        <el-upload
          action="http://127.0.0.1:8899/admin/article/uploadimg"
          list-type="picture-card"
          :file-list='formData.fileList'
          multiple
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleFileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- 这是图片能预览的 -->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogVisible" alt>
        </el-dialog>
      </el-form-item>

      <!-- 内容摘要 -->
      <el-form-item label="内容摘要">
        <el-input type="textarea" v-model="formData.zhaiyao"></el-input>
      </el-form-item>
      <!-- 内容描述 -->
      <el-form-item label="内容描述" class="editor">
        <quill-editor v-model="formData.content"/>
        <!-- <el-input type="textarea" v-model="ruleForm.desc"></el-input> -->
      </el-form-item>
      <!-- 按钮提交 -->
      <el-form-item style="text-align:left">
        <el-button type="primary" @click="submitForm(formData)">保存</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";


// import {quillEditor} from "vue-quill-editor"; //调用编辑器
// 富文本组件
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      id:0,
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      categorys: [],
      // categorys:[{title:'',group:[{}]}],
      formData: {
        category_id: "",
        status: true,
        title: "",
        sub_title: "",
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        is_slide: false,
        is_top: false,
        is_hot: false,
        zhaiyao: "",
        content: "",
        imgList: [],
        fileList: []
      }
    };
  },
  methods: {
    // on-success
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // imgList是数组，获取的肯定也是数组，进而把res用数组符号包裹起来
      this.formData.imgList = [res];
    },
    // 上传之前判断图片的格式
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // return isJPG && isLt2M;
      return isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 图片墙
    handleFileList(res) {
      // this.formData.fileList.push({...res})
      this.formData.fileList.push(res);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 立即创建修改的
    submitForm(formData) {
      const id=this.$route.params.id;
      this.id=id;
      this.$axios({
        method: "post",
        url: `/admin/goods/edit/${id}`,
        data: this.formData,
        // axios请求中设置跨域的
        withCredentials: true
      }).then(res => {
        // console.log(res);
        const {message,status}=res.data;
        if(status==0){
          this.$message({
            message:'修改成功',
            type:'success'
          });
          // 箭头函数是指向上一作用域的this
          // 用function的话定时器 this指向window
          setTimeout(()=>{
            this.$router.push('/admin/goodslist');
          },1000)
        }
      });
    },
    // 返回到前一页
    resetForm() {
      this.$router.push('/admin/goodslist');
    },

    //  获取商品的所有分类信息
    choose:function (){
        this.$axios({
        method: "get",
        url: "/admin/category/getlist/goods"
        }).then(res => {
        // console.log(res);
        if (status == 0) {
        const { message, status } = res.data;
        // this.categorys=message;
        let options = [];
        message.forEach(v => {
          if (v.parent_id == 0) {
            // 给该元素添加属性，该属性为数组形式的
            v.group = [];
            options.push(v);
          } else {
            options.forEach(item => {
              if (item.category_id == v.parent_id) {
                item.group.push(v);
              }
            });
          }
        });
        // 这是设置的分类数组，用于循环的
        this.categorys = options;
      }
    });
    }
  
  },
  // 结构生成创建的
  mounted() {
    // 所属类别的选择
   this.choose();
   console.log(this.$route.params)
   const id=this.$route.params.id;
   this.id=id;
   this.$axios({
     method:'get',
    //  这个直接能写id是因为前面定义了id，而不仅仅是data中的id
     url:`/admin/goods/getgoodsmodel/${id}`,
     data:this.formData
   }).then(res=>{
     console.log(res);
    const {message,status}=res.data;
    if(status==0){
      // 直接这样是加载不出封面图片和图片墙的，，因为两者是数组，不直接是图片路径
      this.formData=message;
      // 封面图片是有个单独设置图片路径src的，只要获取到封面图片url路径即可显示
      this.imageUrl=message.imgList[0].url;
      // 照片墙的话还没有设置有图片的单独属性，，只能是获取url路径来输出了
      this.formData.fileList=message.fileList.map(v=>{
        // 直接获取fileList中的url时，不能显示到完整的路径，不能自己匹配到，只能手动添加的
        // var file=v;
        // // 若是不设置这个，再次编辑更改提交后没有端口的话，就找不到图片的，这样的是将数据的name和shorturl属性无
        // file.url='http://127.0.0.1:8899'+file.shorturl;
        // v=file;
        // return {v};
        return {
          ...v,
          url:`http://127.0.0.1:8899${v.shorturl}`
        }
      })
    
    }
   })
  }
}
</script>
<style>
.add {
  margin-top: 30px;
}
.avatar-uploader {
  width: 180px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.editor .el-form-item__content {
  line-height: unset;
}
.choose {
  position: absolute;
  left: 0;
}
.status {
  width: 300px;
  text-align: left;
}
.number {
  width: 500px;
  text-align: left;
}
.tips {
  color: #bbb;
  margin-left: 10px;
}

.goodsnumber > .el-form-item__content {
  display: flex;
  height: 40px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.autocreate > .tips {
  display: block;
  width: 337px;
  text-align: left;
  font-size: 12px;
  margin-left: 10px;
}
</style>
