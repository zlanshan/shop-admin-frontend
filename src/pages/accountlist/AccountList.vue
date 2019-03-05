<template>
    <div class='option'> 
       <div class="input-with-select">
            <el-input
            placeholder="会员名称"    
            clearable class='content'>
            </el-input>
            <el-button  icon="el-icon-search"></el-button>
       </div>  
        <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
        prop="name"
        label="姓名"
        width="120">
        </el-table-column>
        <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
        </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :pager-count="pageCount"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount" class="block" >
        </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          
        tableData: [],
        multipleSelection: [],
        currentPage:1,
        pageCount:5,
        pageSize:5,
       totalCount:0,
      
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style>
.option{
    margin-top:30px;
    width:100%;
    /* 这是两边都设置了宽度，但是没有flex的值，他就不能展示想要的justify-content的形式，
    最后还得设置位置更改的，这就直接用定位也可 */
    /* display: flex;
    justify-content: space-between; */
    height:40px;
    position: relative;
}
.input-with-select>.content{
    width:200px;
    display: block;
    height: 40px;
}

.input-with-select{
    width: 256px;
   position: relative;

}
.content >.el-input__inner{
    display: block;
    position: absolute;
    left: 0;
}
.block{
    text-align: left;
    margin-top:10px;
}
</style>
