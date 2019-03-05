<template>
    <div>
        <div class='detail'>
            <h4>订单详情</h4>
         <p><span>订单id：</span>{{orderinfo.id}}</p>
         <p><span>会员名称：</span>{{orderinfo.user_name}}</p>
         <p><span>地址：</span>{{orderinfo.area}}</p>
         <p><span>快递：</span>{{orderinfo.expressTitle}}</p>
         <p><span>状态</span>{{orderinfo.orderstatus}}</p>
         <p><span>购买时间：</span>{{orderinfo.complete_time}}</p> 
        </div>

       
 <h4 style="margin-top:20px;">订单商品列表</h4>
         <el-table
    :data="tableData"
    style="width: 100%">
    <!-- 商品 -->
     <el-table-column label="商品" width="350">
        <!-- template时存放自定义的列设置 -->
        <template slot-scope="scope" style='margin-bottom:0'>
          <!-- 需要在一行显示时，，需要用el-row -->
          <el-row type='flex' align='middle'>
            <img :src="`${scope.row.imgurl}`" alt="" class='goods_img'>
          <span>{{scope.row.goods_title}}</span>
          </el-row>    
          </template>
      </el-table-column>
        <el-table-column
        label="类型"
        width="180" prop='goods_no'>
        </el-table-column>
        <el-table-column
        label="价格"
        prop='real_price'>
        </el-table-column>
    </el-table>
       
        
    </div>
</template>

<script>
export default {
    data()
        {
            return{
                id:0,
                tableData:[],
                orderinfo:{}
            }
    },
mounted(){
    const id=this.$route.params.id;
    this.id=id;
     this.$axios.get(`/admin/order/getorderdetial/${id}`).then(res=>{
        // console.log(res);
        const {message}=res.data;
        this.orderinfo=message.orderinfo;
        this.tableData=message.goodslist;
       })
}
}
</script>

<style>
.detail{
    text-align: left;

}
.detail>p>span{
  width:100px;
  display: inline-block;
}
h4{
    color:#333;
    text-align: left;
}
.goods_img{
    width:64px;
    height: 64px;
    flex-shrink: 0;
}
</style>
