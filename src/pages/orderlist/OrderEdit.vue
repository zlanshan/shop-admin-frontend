<template>
  <div>
    <el-form ref="form" model='orderinfo' label-width="80px" class='mt20' style='text-align: left;'>
      <el-form-item label="订单id">{{orderinfo.id}}</el-form-item>
      <el-form-item label="快递单号">
        <el-input v-model="orderinfo.express_no"></el-input>
      </el-form-item>
      <el-form-item label="快递费用">
        <el-input v-model="orderinfo.express_fee"></el-input>
      </el-form-item>
      <el-form-item label="收件人" prop="accent_name">
        <el-input v-model="orderinfo.accent_name"></el-input>
      </el-form-item>
      <el-form-item label="收货电话">
        <el-input v-model="orderinfo.telphone"></el-input>
      </el-form-item>
      <el-form-item label="收货邮箱">
        <el-input v-model="orderinfo.email"></el-input>
      </el-form-item>
      <el-form-item label="收货地区">
        <el-input v-model="orderinfo.area"></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input v-model="orderinfo.address"></el-input>
      </el-form-item>
      <!-- 这是要插入文本域的 -->
       
      <el-form-item label="收货备注">
        <el-input  type="textarea" v-model="orderinfo.message"></el-input>
      </el-form-item>
      <el-form-item label="收货地区">
        <el-input type='textarea' v-model="orderinfo.area"></el-input>
      </el-form-item>
      <el-form-item label="总金额">
        <el-input v-model="orderinfo.order_amount"></el-input>
      </el-form-item>
       <el-form-item label="订单状态">
        <el-input v-model="orderinfo.orderstatus"></el-input>
      </el-form-item>
      
      <el-form-item style='text-align:left'>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      orderinfo:{
      id:0,
      express_no:'',
      express_fee:'',
      accept_name:'',
      telphone:'',
      mobile:'',
      email:'',
      area:'',
      address:'',
      message:'',
      order_amount:'',
      orderstatus:''
      }
    };
  },
  methods:{
   onSubmit(){
    //  因为orderinfo是动态变化的，这里就不用重新获取值的
        // this.orderinfo=this.orderinfo;
         // post请求传递参数是一个对象，如何获取id值的数据并将这数据全部渲染到页面上呢
    this.$axios.post(`/admin/order/updateorder/`,{orderinfo:this.orderinfo}).then(res => {
      console.log(res);
      if(res.meta.status===0){
        // ???
        const {message} =res.data;
        this.$message({
          message:'修改成功',
          type:'success'
        })

        setTimeout(()=>{
          this.$router.back();
        },1000)
      }
    });
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.id = id;
    this.$axios.get(`/admin/order/getorderdetial/${id}`).then(res=>{
        // console.log(res);
        const {message}=res.data;
        this.orderinfo=message.orderinfo;
        this.tableData=message.goodslist;
       })
    // console.log(id);
   
  }
};
</script>

<style scoped>
.el-input{
  width:80%;
 
}
</style>
