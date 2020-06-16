<template>
  <div class="container">
    <el-container>
      <el-main class="main-content">
        <el-form :inline="true" :model="formInline" class="search-head">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getDateList()">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="table-main">
      <el-main class="table-head">
        <!-- <el-button class="T-H-B-SkyBlue">上传</el-button> -->
        <!-- <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
        >-->
        <el-button class="T-H-B-SkyBlue">上传</el-button>
        <!-- </el-upload> -->
        <div class="table-content">
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="changeFun"
            stripe
            :header-cell-style="{background:'#0058A2'}"
            style="width: 98%"
          >
            <el-table-column
              type="selection"
              width="65"
              prop="userId"
              @selection-change="changeFun"
            ></el-table-column>
            <el-table-column prop="company" label="所属单位"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <!-- <el-table-column prop="workType" label="工种"></el-table-column> -->
            <el-table-column prop="blackReason" label="拉黑原因"></el-table-column>
            <el-table-column prop="provePath" label="相关证明"></el-table-column>
            <el-table-column prop="status" label="审核状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status==0">在场</span>
                  <span v-if="scope.row.status==1">退场</span>
                  <span v-if="scope.row.status==2">培训通过</span>
                  <span v-if="scope.row.status==3">拉黑已提交</span>
                  <span v-if="scope.row.status==4">驳回</span>
                  <span v-if="scope.row.status==5">取消</span>
                  <span v-if="scope.row.status==6">已拉黑</span>
               </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="280">
              <template slot-scope="scope">
                <!-- class="T-R-B-Grey"
                size="mini"-->
                <el-button
                  class="T-R-B-Grey"
                  size="mini"
                  type="warning"
                  @click="cancelClick(scope.row)"
                  v-show="roleName=='普通管理员'?true:false"
                >取消</el-button>
                <el-button
                  class="T-R-B-BlackishGreen btn"
                  size="mini"
                  type="warning"
                  v-show="roleName=='Administrator'?true:false"
                  @click="throughClick(scope.row)"
                >通过</el-button>
                <el-button
                  class="T-R-B-Cyan"
                  size="mini"
                  type="warning"
                  v-show="roleName=='Administrator'?true:false"
                  @click="rejectClick(scope.row)"
                >驳回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pagination
          class="pagination-box"
          v-if="total>0"
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getDateList"
        />
      </el-main>
    </div>
    <!--新增-->
    <el-dialog :visible.sync="dialogFormVisible" width="20%" style="padding: 0px 0px;">
      <div class="addUser-content">
        <p>出入记录</p>
        <div style="border-bottom:1px solid #000">
          <h6>作业区域：</h6>
          <h6>考勤设备：</h6>
          <h6>打卡时间：2019/12/12 10：30：23 出</h6>
        </div>
        <div>
          <h6>作业区域：</h6>
          <h6>考勤设备：</h6>
          <h6>打卡时间：2019/12/12 10：30：23 出</h6>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import { handleCofirm } from "@/utils/confirm";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      dialogFormVisible: false,
      roleName:JSON.parse(sessionStorage.getItem("user")).roles[0].roleName,
      // 动态数据
      tableData: [],
      total: 10,
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
      formInline: {
        name: "" // 搜索
      }
    };
  },
  activated() {
    this.getDateList();
  },
  methods: {
    // 列表请求
    getDateList() {
      // 获得搜索的内容
      var data = JSON.stringify({
        name: this.formInline.name,
        status: "3",
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage
      });
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.rows;
          this.total = res.data.total;
        }
      });
    },
    //取消
    cancelClick(row) {
      var uid = row.uuid;
      var ids = [];
      ids.push(uid);
      console.log(ids);
      handleCofirm("确认取消")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/labour/basic/" +
            row.pinfoId;
          var data = new FormData();
          data.append("status",5);
          this.http.post(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
              this.$message({
                type: "success",
                message: "取消成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //通过
    throughClick(row) {
      handleCofirm("确认通过")
        .then(res => {
          var url =
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/labour/basic/" +
            row.pinfoId;
          var data = new FormData();
          data.append("status",2);
          this.http.put(url, data).then(res => {
            if (res.code == 200) {
              this.getDateList()
              this.$message({
                type: "success",
                message: "通过成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消通过"
          });
        });
    },
    //驳回
    rejectClick(row) {
      var uid = row.uuid;
      var ids = [];
      ids.push(uid);
      console.log(ids);
      handleCofirm("确认驳回")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/integrity/" +
            sessionStorage.getItem("userId") +
            "/black/change/3";
          this.http.post(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
              this.$message({
                type: "success",
                message: "驳回成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消驳回"
          });
        });
    },
    beforeRemove() {},
    changeFun() {}
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
  margin-bottom: 40px;
}

.main-content {
  padding-top: 30px;
  margin-left: 30px;
  margin-right: 30px;

  .search-head {
    margin-left: 30px;
  }

  .region {
    margin-left: 60px;
  }

  el-input {
    width: 180px;
  }
}

.table-main {
  margin-top: -30px;
  height: 500px;

  .table-head {
    padding-left: 30px;
    padding-top: 30px;
    height: 600px;

    .addStyle {
      width: 80px;
      height: 35px;
      background: linear-gradient(
        180deg,
        rgba(54, 130, 243, 1) 0%,
        rgba(0, 88, 162, 1) 100%
      );
      opacity: 1;
      border-radius: 4px;
      text-align: center;
    }

    .addStyle-title {
      color: #ffffff;
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }

    .deleteStyle {
      width: 80px;
      height: 35px;
      background: linear-gradient(
        180deg,
        rgba(225, 225, 225, 1) 0%,
        rgba(190, 190, 190, 1) 100%
      );
      opacity: 1;
      border-radius: 4px;
    }

    .deleteStyle-title {
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(99, 99, 99, 1);
      opacity: 1;
    }

    .exportStyle {
      width: 80px;
      height: 35px;
      background: linear-gradient(
        180deg,
        rgba(58, 222, 214, 1) 0%,
        rgba(0, 150, 143, 1) 100%
      );
      opacity: 1;
      border-radius: 4px;
    }

    .poiExcel-title {
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }

  .table-content {
    margin-top: 30px;
  }

  .page-end {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
