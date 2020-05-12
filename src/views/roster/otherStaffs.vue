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
            <el-button type="primary" @click="searchClick">查询</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="glry_bottonView">
      <el-main class="btnView">
        <div style="margin-bottom: 30px;">
          <el-button class="T-H-B-DarkBlue" @click="addStaffClick">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteAllClick">删除</el-button>
          <el-button class="T-H-B-Cyan" @click="exportStaffClick">导出</el-button>
          <el-upload
            style="display:inline-block; margin-left: 10px;"
            class="upload-demo"
            action
            :show-file-list="false"
          >
            <el-button class="T-H-B-Cyan" type="primary" @click="importStaffClick">导入</el-button>
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
            <el-table-column fixed type="selection"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="Jobnumber" label="工号"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="nativePlace" label="籍贯"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="workers" label="工人类别"></el-table-column>
            <el-table-column prop="phoneNumber" label="手机号码"></el-table-column>
            <el-table-column prop="PoliticalOutlook" label="政治面貌"></el-table-column>

            <el-table-column label="操作" fixed="right" width="240">
              <template slot-scope="scope">
                <el-button
                  class="T-R-B-Green"
                  size="mini"
                  @click="editRowClick(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  class="T-R-B-Grey"
                  size="mini"
                  @click="deleteRowClick(scope.$index, scope.row)"
                >删除</el-button>
                <el-button
                  class="T-R-B-Orange"
                  size="mini"
                  @click="detailsRowClick(scope.$index, scope.row)"
                >查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination background layout="prev, pager, next" :total="1000" class="paging"></el-pagination>
      </el-main>
    </div>
    <otherStaffsdialog v-if="changOrder" ref="turnOrder" />
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
      headClass: headClass,
      form: {
        major: "",
        name: ""
      },
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 100, //总条数
      formInline: {
        searchUname: null, // 搜索
        searchNum: null
      },
      changOrder: false, //查看详情
      tableData: [
        {
          corporateName: "2016-05-02",
          contractName: "王小虎",
          name: "上海",
          Jobnumber: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          gender: 200333,
          major: "dddd",
          post: "dddd",
          nativePlace: "dddd",
          numberId: "dddd",
          age: "dddd",
          phoneNumber: "dddd"
        },
        {
          corporateName: "2016-05-02",
          contractName: "王小虎",
          name: "上海",
          Jobnumber: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          gender: 200333,
          major: "dddd",
          post: "dd555dd",
          nativePlace: "dddd",
          numberId: "dddd",
          age: "dddd",
          phoneNumber: "dddd"
        }
      ]
    };
  },
  methods: {
    //查询
    searchClick() {},
    //新增
    addStaffClick() {
      this.$router.push({ path: "/AddOther" });
    },
    handleSelectionChange() {},
    handleClick(row) {
      console.log(row);
    },

    //  导入
    importStaffClick() {},
    //  表格操作
    //  编辑
    editRowClick() {
      this.$router.push({ path: "/AddOther" });
    },
    //批量删除
    deleteRowClick() {
      handleCofirm("确认删除吗？", "warning")
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
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
            "/manager";
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
          // this.$message({
          //   type: "success",
          //   message: "导出成功!"
          // });
          var uname = this.formInline.searchNum;
          var unum = this.formInline.searchUname;
          let _this = this;
          var data = JSON.stringify({
            name: uname,
            company: unum,
            pageSize: _this.pageSize,
            page: _this.page
          });
          var url =
            "/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/manager/export";
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
    //获取删除所有勾选项
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].id;
        ids.push(id);
      }
      return ids;
    },
    deleteAllClick() {
      var ids = this.changeFun();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确认删除")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/manager";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              // var total = res.total;
              // var rows = res.rows;
              // this.tableData = rows;
              // this.total = total;
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