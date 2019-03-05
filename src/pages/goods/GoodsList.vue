<template>
  <div>
    <!-- 新增删除的flex的layout布局 -->
    <el-row type="flex" justify="space-between" align="middle" class="mt20">
      <div >
        <el-button @click="handleAdd">新增</el-button>
        <el-button @click="handleDel(idstr)">删除</el-button>
      </div>
      <div>
        <el-input placeholder="请输入内容" v-model='searchValue' class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click='handleSearch(searchValue)'></el-button>
        </el-input>
      </div>
    </el-row>

    <!-- 表格的 -->
    <!-- data用于接收表格数据，tableData是data中的数据，由后台返回的 -->
     <el-table
     :data="tableData"
     tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      class="mt20">
     <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" width="350">
        <!-- template时存放自定义的列设置 -->
        <template slot-scope="scope" style='margin-bottom:0'>
          <!-- 需要在一行显示时，，需要用el-row -->
          <el-row type='flex' align='middle'>
            <img :src="`${scope.row.imgurl}`" alt="" class='goods_img'>
          <span>{{scope.row.title}}</span>
          </el-row>
         
          </template>
      </el-table-column>
      <!-- 每一列的数据, prop定义数据结构对象要显示的属性 -->
      <el-table-column prop="categoryname" label="类型" width="120"></el-table-column>
      <el-table-column prop="market_price" label="价格" show-overflow-tooltip>
        <!-- 自定义模板, slot-scope属性可以获取当前每一行数据，数据是一个对象，scoped.row可获取该对象-->
        <template slot-scope="scope">
            <span>{{scope.row.market_price  |  tofixed }}</span>
        </template>
      </el-table-column>
    
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDel(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   
      <!-- 分页组件 -->
    <!-- size-change: 切换页面数据显示条数的时候触发 -->
    <!-- current-change： 切换页面时候触发 -->
    <!-- current-page 代表当前页 -->
    <!-- total: 数据的总条数 -->
   <div class="block mt20">
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]" 
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          >
      </el-pagination>
      <!-- 这是设置最多可显示几页的 -->
     <!-- :pager-count='pageCount' -->
   </div>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      // 搜索条件
      searchValue:'',
      // 当前的页面
      pageIndex: 1,
      // pageCount: 5,
      // 当前显示的条数
      pageSize: 5,
      // 数据总条数
      totalCount: 0,
      idstr:''
    };
  },

  methods: {
    // 切换显示条数时触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 切换页数触发
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    // 处理多选框的,element-ui设置的可以直接获取选中的哪一行的数据信息，获取id设置删除操作的
    handleSelectionChange(val) {
        // console.log(val);
        var ids=val.map(v=>{
          return v.id;
        })
        var idstr=ids.join(',');
        // return idstr;
        this.idstr=idstr;
      },
    // 新增商品跳转页面
    handleAdd() {
      this.$router.push("/admin/goodsadd");
    },
    // 删除数据的
    handleDel(ids){
     this.$axios.get(`/admin/goods/del/${ids}`).then(res=>{
       if(res.data.status==0){
           this.$message({message:res.data.message,type:'success'});
           this.getList();
       }
     })
    },
    // 搜索数据
    handleSearch(str){
       this.pageIndex=1;
       this.getList();
    },
    // 
    getList() {
      // 请求商品类别数据
      // this.$axios.get(`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchvalue}`).then(res=>{})
      this.$axios({
        method: "get",
        url: "/admin/goods/getlist",
        // 传递的参数
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          searchvalue:this.searchValue
        }
      }).then(res => {
        // console.log(res);
        // 解构获取res内的各种值？相当于这个data=res.data
        // 获取返回的数据
        const {data}=res;
        // const { message, currentPage, pageSize, totalCount } = res.data;
      //  表格的数据
       this.tableData = data.message;
        // this.pageIndex = data.pageIndex;
        // this.pageSize = data.pageSize;
        // 修改总条数
        this.totalCount = data.totalcount;
      });
    }
  },

// 生命周期函数
  mounted(){
  		this.getList();
    },

    // 过滤器
  filters:{
    tofixed:function (data) {
     return Number(data).toFixed(2);
      }
  }
};
</script>

<style>
/* .option {
  margin-top: 30px;
  width: 100%; */
  /* 这是两边都设置了宽度，但是没有flex的值，他就不能展示想要的justify-content的形式，
    最后还得设置位置更改的，这就直接用定位也可 */
  /* display: flex;
    justify-content: space-between; */
  /* height: 40px;
} */
/* .content {
  width: 200px;
  display: block;
  height: 40px;
} */
.el-pager li{
  width:20px;
}
.block{
  text-align: left;
}

.goods_img{
  width:64px;
  height: 64px;
  display: block;
  margin-right: 10px;
  /* 图片和文字放置在一行容易被挤压 */
  flex-shrink: 0;
}
</style>
