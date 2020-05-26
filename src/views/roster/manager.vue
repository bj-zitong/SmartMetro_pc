<template>
  <div class="roster" v-loading="loading">
    <!-- 头部 -->
    <el-container>
      <el-menu class="main-top-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="人员类型" class="region">
            <el-select v-model="formInline.workerType" placeholder="请选择人员类型">
              <el-option label="企业自有职工" value="企业自有职工"></el-option>
              <el-option label="劳务派遣人员" value="劳务派遣人员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getDatalist">查询</el-button>
          </el-form-item>
        </el-form>
      </el-menu>
    </el-container>
    <!-- 主体 -->
    <el-container>
      <el-menu class="main-con-box">
        <div class="main-btn-box">
          <el-button class="T-H-B-DarkBlue" @click="AddEditClick('add')">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteAllClick">删除</el-button>
          <el-button class="T-H-B-Cyan" @click="exportStaffClick">导出</el-button>
          <el-button class="T-H-B-Cyan" type="primary" @click="importStaffClick()">导入</el-button>
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
              prop="pInfoId"
              @selection-change="handleSelectionChange"
            ></el-table-column>
            <el-table-column fixed prop="buildCorpName" label="承建单位"></el-table-column>
            <!-- <el-table-column prop="department" label="部门"></el-table-column> -->
            <el-table-column prop="jobType" label="岗位/职责"></el-table-column>
            <el-table-column prop="workerType" label="人员类型"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="birthPlace" label="籍贯"></el-table-column>
            <el-table-column prop="idNum" label="身份证号"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="cellPhone" label="手机号码"></el-table-column>
            <el-table-column prop="address" label="住址"></el-table-column>
            <el-table-column prop="politicsType" label="政治面貌"></el-table-column>
            <el-table-column fixed="right" label="操作" width="270">
              <template slot-scope="scope">
                <el-button
                  class="T-R-B-Green"
                  size="mini"
                  @click="AddEditClick(scope.row,'edit')"
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
        <pagination
          class="pagination-box"
          v-if="total>10"
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getDatalist"
        />
      </el-menu>
    </el-container>
    <managerDialog v-if="changOrder" ref="turnOrder" />
    <el-dialog :visible.sync="csvVisible" width="50%">
      <div>
        <el-form ref="file" label-width="120px">
          <el-form-item label="文件导入：" prop="uploadFile">
            <el-upload
              class="upload-demo"
              v-model="file.uploadFile"
              action
              :on-change="handleChange"
              :file-list="fileList"
              :auto-upload="false"
              :limit="1"
              :show-file-list="true"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">上传csv文件</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="csvVisible = false">取消</el-button>
        <el-button type="primary" @click="importCsv()">导入</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
import managerDialog from "./dialog/managerdialog";
import Pagination from "@/components/pagination";
export default {
  name: "roster",
  components: {
    managerDialog,
    Pagination
  },
  data() {
    return {
      csvVisible: false,
      formInline: {
        name: "",
        workerType: ""
      },
      changOrder: false, //查看详情
      total: 11,
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
      file: {
        uploadFile: ""
      },
      fileList: [],
      loading: true,
      tableData: [
        {
          pInfoId: 0,
          buildCorpName: "北京公司",
          jobType: "司机",
          workerType: "司机",
          name: "王小虎",
          gender: "男",
          birthPlace: "河北省张家口",
          idNum: "6932589565555747888",
          age: 0,
          cellPhone: "1234568793",
          address: "河北省张家口",
          politicsType: "群众"
        },
        {
          pInfoId: 1,
          buildCorpName: "北京公司",
          jobType: "司机",
          workerType: "司机",
          name: "王小虎",
          gender: "男",
          birthPlace: "河北省张家口",
          idNum: "6932589565555747888",
          age: 0,
          cellPhone: "1234568793",
          address: "河北省张家口",
          politicsType: "群众"
        },
        {
          pInfoId: 2,
          buildCorpName: "北京公司",
          jobType: "司机",
          workerType: "司机",
          name: "王小虎",
          gender: "男",
          birthPlace: "河北省张家口",
          idNum: "6932589565555747888",
          age: 0,
          cellPhone: "1234568793",
          address: "河北省张家口",
          politicsType: "群众"
        },
        {
          pInfoId: 3,
          buildCorpName: "北京公司",
          jobType: "司机",
          workerType: "司机",
          name: "王小虎",
          gender: "男",
          birthPlace: "河北省张家口",
          idNum: "6932589565555747888",
          age: 0,
          cellPhone: "1234568793",
          address: "河北省张家口",
          politicsType: "群众"
        },
        {
          pInfoId: 4,
          buildCorpName: "北京公司",
          jobType: "司机",
          workerType: "司机",
          name: "王小虎",
          gender: "男",
          birthPlace: "河北省张家口",
          idNum: "6932589565555747888",
          age: 0,
          cellPhone: "1234568793",
          address: "河北省张家口",
          politicsType: "群众"
        },
        {
          pInfoId: 5,
          buildCorpName: "北京公司",
          jobType: "司机",
          workerType: "司机",
          name: "王小虎",
          gender: "男",
          birthPlace: "河北省张家口",
          idNum: "6932589565555747888",
          age: 0,
          cellPhone: "1234568793",
          address: "河北省张家口",
          politicsType: "群众"
        }
      ]
    };
  },
  mounted() {
    // alert("98888")
    // this.pageTotal = {
    //   total: 10,
    //   page:2,
    //   pageNum: 8
    // };
  },
  methods: {
    onSubmit() {
      this.getDatalist()
    },
    handleClick(row) {
      console.log(row);
    },
    addStaffClick() {
      this.$router.push({ path: "/AddAdministration" });
    },
    // queryClick(){
    //    this.getDatalist()
    // },
    //列表请求
    getDatalist() {
      var name = this.formInline.name;
      var workerType = this.formInline.workerType;
      //   // 获得当前用户的id
      var params = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        name: name,
        workerType: workerType
      });
      var url =
        "/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/manager/management";
      this.http.post(url, params).then(res => {
        if (res.code == 200) {
        }
      });
    },
    //  导出
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
    //  导入
    importStaffClick() {
      this.csvVisible = true;
    },
    //  导入
    importCsv() {
      // console.log(this.file.uploadFile[0].raw);
      var url =
        "/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/other/import";
      var data = new FormData();
      data.append("file", this.file.uploadFile[0].raw);
      this.http.get(url, data).then(res => {
        if (res.code == 200) {
          // this.getOtherStaffs();
        }
      });
    },
    //  编辑+新增通过传参判断
    AddEditClick(row, par) {
      console.log(row.pInfoId, par);
      if (par != undefined) {
        this.$router.push({
          name: "AddAdministration",
          params: {
            id: "0"
          }
        });
      } else {
        this.$router.push({
          name: "AddAdministration",
          params: {
            id: row.pInfoId
          }
        });
      }
    },
    // editRowClick() {
    //   this.$router.push({ path: "/AddAdministration" });
    // },
    //获得表格前面选中的id值
    handleSelectionChange() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].pInfoId;
        ids.push(id);
      }
      return ids;
    },
    // 批量删除
    deleteAllClick() {
      var ids = this.handleSelectionChange();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确认删除吗")
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
    handleChange(file, fileList) {
      this.$refs.file.clearValidate();
      this.file.uploadFile = fileList;
    },
    detailsRowClick() {
      let _this = this;
      _this.changOrder = true;
      _this.$nextTick(() => {
        _this.$refs.turnOrder.init();
      });
    },
    seeSubRowClick() {},
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
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

.roster {
  margin: 0 30px;
}

.glry_bottonView {
  margin-top: 25px;

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
    margin-bottom: 15px;
  }
}
</style>
