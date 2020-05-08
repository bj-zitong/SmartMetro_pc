<template>
  <div class="container">
    <div class="main-content">
      <el-main class="button-head">
        <el-button
          type="info"
          @click="deleteAll"
          style="margin-top:30px;margin-left:60px;color:black;font-wight:bold"
        >删除</el-button>
        <!-- :header-cell-style="{background:'#0058A2'}" -->
        <div class="table-content">
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="changeFun"
            :header-cell-style="{background:'#0058A2'}"
            stripe
          >
            <el-table-column
              type="selection"
              width="65"
              prop="id"
              @selection-change="changeFun"
            ></el-table-column>
            <el-table-column prop="uuid" label="编号" width="150"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="120"></el-table-column>
            <el-table-column prop="homeworkPart" label="作业部位" width="120"></el-table-column>
            <el-table-column prop="homeworkNumber" label="作业人数" width="120"></el-table-column>
            <el-table-column prop="jobContent" label="作业内容" width="200"></el-table-column>
            <el-table-column prop="isSafety" label="安全防护用品配套使用" width="120"></el-table-column>
            <el-table-column prop="meetingContent" label="班前讲话内容" width="100"></el-table-column>
            <el-table-column prop="workerInfo" label="参加活动作业人员名单" width="200"></el-table-column>
            <el-table-column label="视频附件" width="100" fixed="right">
              <!--accessoryPath-->
              <template slot-scope="scope">
                <img
                  src="../../../static/image/shangchuan.png"
                  style="width:26px;height:26px"
                  @click="uploadVideo(scope.row)"
                />
                <el-input type="file" placeholder hidden="true"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" style="width:300px" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)" type="success">编辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.row)" type="info">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 total  //这是显示总共有多少数据，
                    pagesize //显示当前行的条数
                    sizes这是下拉框可以选择的，每选择一行，要展示多少内容
                     :page-sizes="[5, 10, 20, 40]" 下拉选择
                     layout="total, sizes, prev, pager, next, jumper"
        -->
        <el-pagination
          class="page-view"
          background
          @size-change="handleSizeChange"
          :current-page="page"
          layout="total, prev, pager,next"
          :page-size="pageSize"
          @prev-click="pre"
          @next-click="next"
          @current-change="handleCurrentChange"
          hide-on-single-page
          :total="total"
        ></el-pagination>
      </el-main>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: null, // token
      // 动态数据
      tableData: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 100, //总条数
      ids: null //选中的id
    };
  },
  created: function() {
    this.getTalks();
  },
  methods: {
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size;
      // this.getTalks()
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    handleCurrentChange: function(page) {
      this.page = page;
      this.getTalks();
      console.log(this.page); //点击第几页
    },
    pre(cpage) {
      this.page = cpage;
      console.log("cpage" + cpage);
      // this.getTalks()
    },
    //下一页
    next(cpage) {
      this.page = cpage;
      console.log("下一页" + cpage);
      // this.getTalks()
    },
    getTalks() {
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page
      });
      var url =
        "/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/team/meeting/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.total;
          var rows = res.rows;
          this.tableData = rows;
          this.total = total;
        }
      });

      var result = [
        {
          id: 1,
          uuid: "001",
          createTime: "2020-4-12",
          homeworkPart: "作业部位1",
          workerInfo: "安保部一",
          homeworkNumber: 12,
          jobContent: "内容一",
          isSafety: "安全防护用品配套使用",
          meetingContent: "eeeeeee",
          workNum: "44444444444",
          accessoryPath: "22222222"
        },
        {
          id: 2,
          uuid: "002",
          createTime: "2020-4-13",
          homeworkPart: "作业部位2",
          workerInfo: "安保部2",
          homeworkNumber: 23,
          jobContent: "内容2",
          isSafety: "安全防护用品配套使用2",
          meetingContent: "33333333",
          workNum: "44444322222",
          accessoryPath: "444323222"
        }
      ];
      this.tableData = result;
    },
    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].id;
        ids.push(id);
        // console.log("获得id"+arrays[i].userId);
      }
      return ids;
      // console.log("选中的ids"+ids);
      //  this.multipleSelection = val;
    },
    // 批量删除
    deleteAll() {
      var ids = this.changeFun();
      console.log(ids);
      var data = JSON.stringify(ids);
      var url =
        "/smart/worker/labour/" + sessionStorage.getItem("userId") + "/team/meeting";
      this.http.delete(url, data).then(res => {
        if (res.code == 200) {
          var total = res.total;
          var rows = res.rows;
          this.tableData = rows;
          this.total = total;
        }
      });

    },
    // 删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.id;
      console.log(uid);
      var ids=[];
      ids.push(uid);
      var data = JSON.stringify(ids);
      var url =
        "/smart/worker/labour/" + sessionStorage.getItem("userId") + "/team/meeting";
      this.http.delete(url, data).then(res => {
        if (res.code == 200) {
          var total = res.total;
          var rows = res.rows;
          this.tableData = rows;
          this.total = total;
        }
      });

    },
    uploadVideo(row) {
      var uid = row.id;
      console.log(uid);
    },
    //编辑
    handleEdit(row) {
      var uid = row.id;
      console.log(uid);
    }
  }
};
</script>
<style scoped lang="stylus">
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  padding: 0px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  color: #333;
  opacity: 1;
  border-radius: 10px;
  height: 100px;
}

.el-container {
  margin-bottom: 36px;
}

.glry {
  padding-top: 30px;

  .demo-form-inline {
    margin-left: 30px;
  }

  .region {
    margin-left: 60px;
  }

  el-input {
    width: 180px;
  }
}

.main-content {
  margin-top: 36px;
  margin-left: 30px;
  margin-right: 30px;

  .button-head {
    padding-left: 30px;
    padding-top: 30px;
    height: 600px;
  }

  .table-content {
    margin-top: 30px;
  }

  .page-view {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
