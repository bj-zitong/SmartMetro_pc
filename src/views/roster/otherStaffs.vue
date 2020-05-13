<template>
  <div class="roster">
    <el-container>
      <el-main class="glry">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="专业" class="region">
            <el-input v-model="form.major" placeholder="请输入专业"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getOtherStaffs()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="glry_bottonView">
      <el-main class="btnView">
        <div style="margin-bottom: 30px;">
          <el-button class="T-H-B-DarkBlue" @click="addStaffClick()">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteAllClick()">删除</el-button>
          <el-button class="T-H-B-Cyan" @click="exportStaffClick()">导出</el-button>
          <el-upload
            style="display:inline-block; margin-left: 10px;"
            class="upload-demo"
            action
            :show-file-list="false"
          >
            <el-button class="T-H-B-Cyan" type="primary" @click="importStaffClick()">导入</el-button>
          </el-upload>
        </div>
        <div class="tableView">
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            :header-cell-style="headClass"
            tooltip-effect="dark"
            style="width: 97%;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="65"
              prop="id"
              @selection-change="handleSelectionChange"
            ></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="jobNum" label="工号"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="birthPlace" label="籍贯"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="workerType" label="工人类别"></el-table-column>
            <el-table-column prop="cellPhone" label="手机号码"></el-table-column>
            <el-table-column prop="politicsType" label="政治面貌"></el-table-column>

            <el-table-column label="操作" fixed="right" width="240">
              <template slot-scope="scope">
                <el-button class="T-R-B-Green" size="mini" @click="editRowClick(scope.row)">编辑</el-button>
                <el-button class="T-R-B-Grey" size="mini" @click="deleteRowClick(scope.row)">删除</el-button>
                <el-button
                  class="T-R-B-Orange"
                  size="mini"
                  @click="detailsRowClick(scope.$index, scope.row)"
                >查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          :current-page="page"
          layout="total, prev, pager,next"
          :page-size="pageSize"
          @prev-click="pre"
          @next-click="next"
          @current-change="handleCurrentChange"
          :total="total"
          background
        ></el-pagination>
      </el-main>
    </div>
    <otherStaffsdialog v-if="changOrder" ref="turnOrder" />
    <!-- -->
    <el-dialog
    :title="csvTitle"
    :visible.sync="csvVisible"
    width="50%">
    <div>
        <el-form ref="file" label-width="120px">
        <el-form-item label="文件导入：">
            <el-upload
                class="upload-demo"
                ref="upload"
                drag
                accept="."
                action=""
                :multiple="false"
                :limit="1"
                :auto-upload="false"
                :on-change="handleChange">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传csv文件</div>
            </el-upload>
        </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="csvVisible = false">取消</el-button>
    <el-button type="primary" @click="importCsv">导入</el-button>
    </span>
</el-dialog>
  </div>
</template>
<script>
import options from "@/common/options";
import { handleCofirm } from "@/utils/confirm";
import { headClass } from "@/utils";
import otherStaffsdialog from "./dialog/otherStaffsdialog";
export default {
  name: "echarts",
  components: {
    otherStaffsdialog
  },
  data() {
    return {
      csvVisible:false,
      headClass: headClass,
      form: {
        major: "",
        name: ""
      },
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 100, //总条数
      changOrder: false, //查看详情
      tableData: [],
      ids: []
    };
  },
  created() {
    this.getOtherStaffs();
  },
  methods: {
    //列表
    getOtherStaffs() {
      //获得搜索内容
      var name = this.form.name;
      var major = this.form.major;
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page,
        name: name,
        workerType: major
      });
      var url =
        "/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/other/management";
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
          name: "上海",
          jobNum: "普陀区",
          gender: "男",
          age: 35,
          cellPhone: "15236985369",
          politicsType: "党员",
          workerType: "瓦工",
          birthPlace: "北京"
        },
        {
          id: 2,
          name: "xxx",
          jobNum: "普陀区",
          gender: "男",
          age: 45,
          cellPhone: "15236985369",
          politicsType: "党员",
          workerType: "瓦工",
          birthPlace: "河北"
        }
      ];
      this.total = result.length;
      this.tableData = result;
    },
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size; //每页下拉显示数据
      // this.getOtherStaffs()
    },
    handleCurrentChange: function(page) {
      this.page = page;
      this.getOtherStaffs(); //点击第几页
    },
    pre(cpage) {
      this.page = cpage;
      // this.getOtherStaffs()
    },
    //下一页
    next(cpage) {
      this.page = cpage;
      // this.getOtherStaffs()
    },
    //新增
    addStaffClick() {
      this.$router.push({
        name: "AddOther",
        params: {
          id: 0
        }
      });
    },
    handleSelectionChange() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].id;
        ids.push(id);
      }
      return ids;
    },
    handleClick(row) {
      console.log(row);
    },
    //  导入
    importStaffClick() {},
    //  表格操作
    //  编辑
    editRowClick(row) {
      this.$router.push({
        name: "AddOther",
        params: {
          id: row.id
        }
      });
    },
    //批量删除
    deleteAllClick() {
      var ids = this.handleSelectionChange();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确认删除吗？", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/other";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              var total = res.total;
              var rows = res.rows;
              this.tableData = rows;
              this.total = total;
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除
    deleteRowClick(row) {
      var uid = row.id;
      var ids = [];
      ids.push(uid);
      handleCofirm("确认删除吗？", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/other";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    exportStaffClick() {
      handleCofirm("确认导出")
        .then(res => {
          var name = this.form.name;
          var major = this.form.major;
          let _this = this;
          var data = JSON.stringify({
            name: uname,
            workerType: unum,
            pageSize: _this.pageSize,
            page: _this.page
          });
          var url =
            "/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/other/export";
          this.http.post(url, data).then(res => {
            // // 创建Blob对象，设置文件类型
            // let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
            // let objectUrl = URL.createObjectURL(blob) // 创建URL
            // location.href = objectUrl;
            // URL.revokeObjectURL(objectUrl); // 释放内存
            // 创建Blob对象，设置文件类型
            // 自定义文件下载名称  Subway-User-20191223114607
            var d = new Date();
            var month = d.getMonth() + 1;
            var excelName =
              "Subway-User-" +
              d.getFullYear() +
              month +
              d.getDate() +
              d.getHours() +
              d.getMinutes() +
              d.getSeconds();
            let blob = new Blob([res.data], {
              type: "application/vnd.ms-excel"
            });
            let objectUrl = URL.createObjectURL(blob); // 创建URL
            link.href = objectUrl;
            link.download = excelName; // 自定义文件名
            link.click(); // 下载文件
            URL.revokeObjectURL(objectUrl); // 释放内存
            // alert("调用导出！");
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消导出"
          });
        });
    },
    detailsRowClick() {
      let _this = this;
      _this.changOrder = true;
      _this.$nextTick(() => {
        _this.$refs.turnOrder.init();
      });
    }
  }
};
</script>
<style scoped lang="stylus">
.roster {
  margin: 0 25px;
}

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

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
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

.glry_bottonView {
  margin-top: 30px;

  .btnView {
    padding-left: 30px;
    padding-top: 30px;
    height: 100%;
  }

  .tableView {
    margin-top: 30px;
  }

  .paging {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
