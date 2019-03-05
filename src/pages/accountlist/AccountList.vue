<template>
  <div class="option">
    <!-- 会员名称搜索 -->
    <el-row class="input-with-select" type='flex' justify='end'>
      <el-input placeholder="会员名称" class='usersearch' style='width:200px'>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      class='mt20'
      @selection-change="handleSelectionChange(data)"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="姓名" width="120" prop='user_name'>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" ></el-table-column>
      <el-table-column prop="add_time" label="时间"></el-table-column>
       <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleLook(scope.row.user_name)">查看</el-button>
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
      tableData: [{
        user_name:'lili',
        mobile:13434343536,
        email:'13434345@qq.com',
        time:'2019-02-14'
      }],
      multipleSelection: [],
      pageIndex: 1,
      pageCount: 5,
      pageSize: 5,
      totalCount: 0
    };
  },

  methods: {
    handleLook(id){
      this.$router.push(`/admin/orderedit/${id}`);
    },
    // 每页该显示的条数的处理函数
    handleSizeChange(val){
      this.pageSize=val;
    },
    // 当前页跳转到另一页的处理函数
    handleCurrentChange(val){
      this.pageIndex=val;
    },
    handleSelectionChange(data){
      console.log(data);
    }
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

</style>
