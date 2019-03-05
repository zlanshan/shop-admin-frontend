<template>
  <div class="option">
    <!-- 会员名称搜索 -->
    <el-row class="input-with-select" type="flex" justify="end">
      <el-select v-model="select" placeholder="请选择" style='margin-right:40px'>
        <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
      </el-select>

      <el-input placeholder="会员名称" class="usersearch" style="width:250px">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      class="mt20"
      @selection-change="handleSelectionChange(data)"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="订单id" width="120" prop="id"></el-table-column>
      <el-table-column prop="user_name" label="会员名称" width="120"></el-table-column>
      <el-table-column prop="area" label="地址" width='200'></el-table-column>
      <el-table-column prop="expressTitle" label="快递"></el-table-column>
      <el-table-column prop="statusName" label="状态"></el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row.id)">编辑</el-button>
          <!-- 为什么查看的时a链接，不可以时处理事件函数进入一个界面嘛，应该可以把？？ -->
          <!-- <router-link :to="`orderdetail/${scope.row.id}`"> -->
        <el-button
          size="mini"
          type="danger"
          @click="handleLook(scope.row.id)">查看</el-button>
          <!-- </router-link> -->
       
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :pager-count="pageCount"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      class="block mt20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      select:'',
      pageIndex: 1,
      pageCount: 5,
      pageSize: 5,
      totalCount: 0
    };
  },

  methods: {
    // 每页该显示的条数的处理函数
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 当前页跳转到另一页的处理函数
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    handleSelectionChange(data) {
      console.log(data);
    },
    handleEdit(id){
      // console.log(id);
      this.$router.push(`/admin/orderedit/${id}`);
     
    },
    handleLook(id){
      // console.log(id);
      this.$router.push(`/admin/orderdetail/${id}`);
    },
    getOrderlist(){
      this.$axios.get("http://127.0.0.1:8899/admin/order/getorderlist?orderstatus=2&vipname=ivanyb&pageIndex=1&pageSize=10").then(res=>{
        console.log(res);
        const {data}=res;
        this.totalCount=data.totalcount;
        this.tableData=data.message;
      })
    }
  },
  mounted(){
    this.getOrderlist();
  }
};
</script>

<style>
.option {
  margin-top: 30px;
  width: 100%;
  /* 这是两边都设置了宽度，但是没有flex的值，他就不能展示想要的justify-content的形式，
    最后还得设置位置更改的，这就直接用定位也可 */
  /* display: flex;
    justify-content: space-between; */
  height: 40px;
  position: relative;
}
.choose{
  /* margin-right:40px; */
  /* width:200px; */
}
</style>
