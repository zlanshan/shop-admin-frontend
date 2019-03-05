<template>
    <div>
        <el-row class='option'> 
           <div class="adddel">
             <el-button plain @click='handleAdd'>新增</el-button>  <el-button plain>删除</el-button>

           </div>
       <div class="search">
 <el-input
  placeholder="请输入内容"
 
  clearable class='content'>
  </el-input>
<el-button  icon="el-icon-search"></el-button>
       </div>  
        </el-row>

         <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="标题"
      width="400">
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      prop="categoryname"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="market_price"
      label="价格"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      label="操作" align='right'
      show-overflow-tooltip>
      <template>
          <el-button  size='mini'>编辑</el-button>
          <el-button type='danger' size='mini'>删除</el-button>
      </template>
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
       totalCount:0
      }
    },
 
    methods: {
         handleSizeChange(val) {
        this.pageSize=val;

      },
      handleCurrentChange(val) {
      this.currentPage=val;
      },
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
      },
     handleAdd(){
         this.$router.push('/admin/goodsadd');
     },  getList(){
        this.$axios({
            method:'get',
            url:'/admin/goods/getlist',
            params:{
                currentPage:this.currentPage,
                pageSize:this.pageSize,

            }
        }).then(res=>{
            console.log(res);
            const {message,currentPage,pageSize,totalCount}=res.data;
            this.tableData=message;
            this.currentPage=currentPage;
            this.pageSize=pageSize;
            this.totalCount=totalCount;
        })
    }
    },
  
    // mounted(){
	// 		this.getList();
	// 	}
   
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
}
.content{
    width:200px;
    display: block;
    height: 40px;
}

.adddel{
    width: 150px;
    position: absolute;
    left:0;
}
.search{
    width: 256px;
    display: flex;
    position: absolute;
    right: 0;

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
