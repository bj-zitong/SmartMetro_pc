<template>
  <div class="roster">
    <!-- 头部 -->
    <el-container>
      <el-menu class="main-top-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="人员类型" class="region">
            <el-select v-model="formInline.workerType" placeholder="请选择人员类型">
              <el-option label="企业自有职工" value="0"></el-option>
              <el-option label="劳务派遣人员" value="1"></el-option>
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
          <el-button class="T-H-B-DarkBlue" @click="AddEditClick(0,'add')">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteAllClick">删除</el-button>
          <el-button class="T-H-B-Cyan" @click="exportStaffClick">导出</el-button>
          <div class="uploading">
            <el-upload
              class="avatar-uploader"
              action="string"
              :show-file-list="false"
              :http-request="uploadImage"
              :before-upload="beforeAvatarUpload"
            >
              <el-button class="T-H-B-Cyan" type="primary">导入</el-button>
            </el-upload>
          </div>
        </div>
        <div class="tableView">
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            :header-cell-style="headClass"
            tooltip-effect="dark"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              prop="pinfoId"
              @selection-change="handleSelectionChange"
            ></el-table-column>
            <el-table-column fixed prop="buildCorpName" label="承建单位"></el-table-column>
            <el-table-column prop="jobType" label="岗位/职责">
              <template slot-scope="scope">
                <span v-if="scope.row.jobType==0">xxxx1</span>
                <span v-if="scope.row.jobType==1">xxxx2</span>
              </template>
            </el-table-column>
            <el-table-column prop="workerType" label="人员类型">
              <template slot-scope="scope">
                <span v-if="scope.row.workerType==0">企业自有职工</span>
                <span v-if="scope.row.workerType==1">劳务派遣人员</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="birthPlaceCode" label="籍贯"></el-table-column>
            <el-table-column prop="idCardCode" label="证件编号"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="cellPhone" label="手机号码"></el-table-column>
            <el-table-column prop="address" label="住址"></el-table-column>
            <el-table-column prop="politicsType" label="政治面貌">
              <template slot-scope="scope">
                <span v-if="scope.row.politicsType==0">党员</span>
                <span v-if="scope.row.politicsType==1">团员</span>
              </template>
            </el-table-column>
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
    <managerDialog v-if="changOrder" ref="turnOrder" :data="bindData"/>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
import managerDialog from "./dialog/managerdialog";
import Pagination from "@/components/pagination";
import axios from "axios";
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
      form: {
        photo: ""
      },
      formParams:null,
      fileList: [],
      loading: true,
      tableData: [],
      bindData:"99999dzfgdsgfdsg9999"
    };
  },
  activated() {
    this.getDatalist();
  },
  methods: {
    onSubmit() {
      this.getDatalist();
    },
    handleClick(row) {
      console.log(row);
    },
    addStaffClick() {
      this.$router.push({ path: "/AddAdministration" });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传前校验
    beforeAvatarUpload(file) {
      console.log(file);
      let fileName = file.name;
      let pos = fileName.lastIndexOf(".");
      let lastName = fileName.substring(pos, fileName.length);
      if (
        lastName.toLowerCase() !== ".xlsx" &&
        lastName.toLowerCase() !== ".xls" &&
        lastName.toLowerCase() !== ".docx" &&
        lastName.toLowerCase() !== ".doc"
      ) {
        this.$message.error(
          "上传失败 文件必须为.xlsx或者.xls类型或者.docx类型或者.doc类型"
        );
        return;
      }
    },
    // 上传图片方法
    uploadImage(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/manager/import";
      this.http.get(url, formData).then(res => {
        console.log(res);
      });
    },
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
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/manager/management";
      this.http.post(url, params).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.rows;
          this.total = res.data.total;
        }
      });
    },
    //  导出
    exportStaffClick() {
      var name = this.formInline.name;
      var workerType = this.formInline.workerType;
      var data = JSON.stringify({
        name: name,
        company: workerType,
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage
      });

      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/manager/export";
      this.http.post(url, data).then(res => {
        // if (res.code == 200) {
          const blob = new Blob([res]); //new Blob([res])中不加data就会返回下图中[objece objece]内容（少取一层）
          const fileName = "统计.xlsx"; //下载文件名称
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        // }
      });
    },
    //  导入
    importCsv() {
      console.log(this.file.uploadFile);
      var url =
        "/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/other/import";
      var data = new FormData();
      // data.append("file", this.file.uploadFile[0].raw);
      this.http.get(url, data).then(res => {
        if (res.code == 200) {
          // this.getOtherStaffs();
        }
      });
    },
    //  编辑+新增通过传参判断
    AddEditClick(row, par) {
      console.log(row.pinfoId, par);
      if (par == 'add') {
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
            id: row.pinfoId
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
        var id = arrays[i].pinfoId;
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
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getDatalist();
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
    deleteRowClick(rowIndex, row) {
      var uid = row.pinfoId;
      var ids = [];
      ids.push(uid);
      handleCofirm("确认删除吗？", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/manager";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getDatalist();
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
      // this.$refs.file.clearValidate();
      // this.file.uploadFile = fileList;
      // console.log(file.raw[0]);
      // var url =
      //   "/smart/worker/roster/" +
      //   sessionStorage.getItem("userId") +
      //   "/equipment/import";
      // var data = new FormData();
      // data.append("file", this.file.uploadFile[0].raw);
      // this.http.post(url, data).then(res => {
      //   if (res.code == 200) {
      //   }
      // });
    },
    detailsRowClick(index,row) {
      // console.log(row.pinfoId);
      ///smart/worker/roster/{userId}/manager/{id}
      let _this =this
      _this.changOrder = true;
      _this.$nextTick(() => {
        _this.$refs.turnOrder.init();
      });
      // _this.$nextTick(() => {
      //   _this.$refs.turnOrder.init();
      // });
      // this.getDetail(row);
    },
    getDetail(row){
       let _this = this;
      _this.changOrder = true;
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/manager/"+row.pinfoId;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          console.log(res);
          this.formParams=res.data;
          return this.formParams;
        }
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

.uploading {
  float: left;
  margin-left: 10px;
}
</style>
