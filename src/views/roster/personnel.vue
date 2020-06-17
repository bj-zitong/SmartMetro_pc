<template>
  <div class="main-box">
    <!-- 头部 -->
    <el-container>
      <el-menu class="main-top-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <!-- 劳务公司 -->
          <el-form-item label="劳务公司：">
            <el-select v-model="formInline.company">
              <el-option
                v-for="item in screenCompany"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 姓名 -->
          <el-form-item label="姓名：">
            <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <!-- 工种 -->
          <el-form-item label="工种：" class="region">
            <el-select
              v-model="formInline.workerType"
              placeholder="请选择工种"
              filterable
              clearable
              @change="handleButton"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 查询按钮 -->
          <el-form-item>
            <el-button type="primary" @click="getDataFun()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-menu>
    </el-container>
    <!-- 主体 -->
    <el-container>
      <el-menu class="main-con-box">
        <div class="main-btn-box">
          <!-- <el-main class="btnView"> -->
          <el-button class="T-H-B-DarkBlue" @click="addStaffClick">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteAll">删除</el-button>
          <el-button class="T-H-B-Cyan" @click="exportExcelClick">导出</el-button>
          <el-button class="T-H-B-Cyan" type="primary" @click="importStaffClick()">导入</el-button>
          <!-- <el-button type="success" class="T-H-B-DarkGreen" @click="PassTraining">培训通过</el-button> -->
        </div>

        <div>
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
              fixed
              type="selection"
              prop="pinfoId"
              @selection-change="handleSelectionChange"
            ></el-table-column>
            <el-table-column prop="company" label="劳务公司" width="150"></el-table-column>
            <el-table-column prop="teamName" label="班组" width="100"></el-table-column>
            <el-table-column prop="workType" label="工种" width="100"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="gender" label="性别" width="120">
              <template slot-scope="scope">
                  <span v-if="scope.row.gender==0">男</span>
                  <span v-if="scope.row.gender==1">女</span>
               </template>
            </el-table-column>
            <!-- <el-table-column prop="jobNum" label="工号" width="120"></el-table-column> -->
            <el-table-column prop="birthPlaceCode" label="籍贯" width="200"></el-table-column>
            <el-table-column prop="age" label="年龄" width="100"></el-table-column>
            <el-table-column prop="cellPhone" label="手机号码" width="120"></el-table-column>
            <el-table-column prop="politicsType" label="政治面貌" width="100">
                 <!-- <template slot-scope="scope">
                  <span v-if="scope.row.politicsType==0">党员</span>
                  <span v-if="scope.row.politicsType==1">团员</span>
               </template> -->
            </el-table-column>
            <el-table-column prop="createTime" label="进场日期" width="100"></el-table-column>
            <el-table-column prop="exitTime" label="退场日期" width="100"></el-table-column>
            <el-table-column label="状态" width="100" prop="status">
                <template slot-scope="scope">
                  <span v-if="scope.row.status==0">在场</span>
                  <span v-if="scope.row.status==1">退场</span>
                  <span v-if="scope.row.status==2">培训通过</span>
                  <span v-if="scope.row.status==3">拉黑</span>
                  <span v-if="scope.row.status==4">已提交</span>
                  <span v-if="scope.row.status==5">已拉黑</span>
               </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="tableWidth">
              <template slot-scope="scope">
                <div v-if="rowIndex!=scope.$index">
                  <el-button
                    class="T-R-B-Green"
                    size="mini"
                    @click="editRowClick(scope.$index, scope.row)"
                  >{{operation.conversionCompile}}</el-button>
                  <el-button
                    class="T-R-B-Grey"
                    size="mini"
                    @click="handleDelete(scope.row)"
                  >{{operation.conversionDelete}}</el-button>
                  <!-- <el-button
                    @click="evaluateClick(scope.row)"
                    type="primary"
                    size="mini"
                    class="T-R-B-Grey"
                  >{{operation.evaluateVonversion}}</el-button> -->
                  <el-button
                    @click.native="acrosstheClick(scope.$index, scope.row)"
                    type="success"
                    size="mini"
                    class="T-R-B-BlackishGreen"
                  >......</el-button>
                </div>
                <div v-if="rowIndex==scope.$index">
                  <el-button
                    @click="PassTrainingClick(scope.row)"
                    type="success"
                    size="mini"
                    class="T-R-B-BlackishGreen btn"
                  >培训通过</el-button>
                  <el-button
                    @click="blockClick(scope.row)"
                    type="success"
                    size="mini"
                    class="F-black btn"
                  >拉黑</el-button>
                  <el-button
                    @click="exitClick(scope.row)"
                    type="success"
                    size="mini"
                    style="background:#BB2D28"
                  >退场</el-button>
                  <el-button
                    class="T-R-B-Orange"
                    @click="handleClick(scope.row)"
                    type="warning"
                    size="mini"
                  >查看详情</el-button>
                  <el-button
                    @click="acrosstClick(scope.$index, scope.row)"
                    type="success"
                    size="mini"
                    class="T-R-B-BlackishGreen"
                  >......</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            class="pagination-box"
            v-if="total>0"
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            @pagination="getDataFun"
          />
          <!-- </el-main> -->
        </div>
      </el-menu>
    </el-container>

    <!-- 拉黑原因弹出框 -->
    <el-dialog title="拉黑原因" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="from" :rules="rules" :model="from" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="Reason" label="原因描述">
          <el-input type="textarea" v-model="from.Reason"></el-input>
        </el-form-item>
        <el-form-item prop="photo" label="证明材料">
          <el-upload
            class="upload-demo"
            v-model="from.photo"
            action
            :on-change="schandleChange"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="F-Grey" round @click="centerDialogVisible = false">取消</el-button>
        <el-button class="F-Blue" round @click="addSubmitForm('from')">确定</el-button>
      </span>
    </el-dialog>

    <!-- 评价弹出框 -->
    <el-dialog
      title="评价记录"
      :show-close="false"
      :visible.sync="evaluatDialogVisible"
      width="30%"
      center
    >
      <div>
        <div>
          <el-form :rules="Rules" :model="formEevaluate" ref="formEevaluate" label-width="80px">
            <el-form-item prop="evaluate" label="评价记录">
              <el-input type="textarea" v-model="formEevaluate.evaluate" placeholder="请输入评价记录"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="F-Grey" round @click="cloneTeamForm()">取 消</el-button>
        <el-button class="F-Blue" round @click="submitTeamForm('formEevaluate')">确 定</el-button>
      </span>
    </el-dialog>
    <personneldialog v-if="changOrder" ref="turnOrder" :data="bindData"/>
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
import options from "@/common/options";
import { handleCofirm } from "@/utils/confirm";
import { headClass } from "@/utils";
import personneldialog from "./dialog/personneldialog";
import Pagination from "@/components/pagination";
import overallUploadFile from "@/components/Upload";
export default {
  name: "echarts",
  components: {
    personneldialog,
    Pagination,
    overallUploadFile
  },
  data() {
    return {
      formInline: {
        company: "",
        name: "",
        jobNum: "",
        workerType: ""
      },
      bindData:null,
      QualificationInput: false,
      from: {
        Reason: "",
        photo: ""
      },
      //
      formEevaluate: {
        evaluate: "",
        pinfoId:null
      },
      operation: {
        conversionCompile: "编辑",
        conversionDelete: "删除",
        // evaluateVonversion: "评价"
      },
      screenCompany: [],
      headClass: headClass,
      centerDialogVisible: false,
      evaluatDialogVisible: false,
      total: null,
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
      options: options,
      btnShow: false,
      tableWidth: "300",
      evaluate: "", //拉黑原因描述,
      rowIndex: null, //选中当前行下标
      changOrder: false, //查看详情
      pinfoId: "", //点击拉黑获取当前行ID
      Rules: {
        evaluate: [{ required: true, message: "请输入评价", trigger: "blur" }]
      },
      UploadFileFileList: [],
      tableData: [],
      rules: {
        Reason: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        photo: [
          { required: true, message: "请上传证明材料", trigger: "change" }
        ]
      },
      file: {
        uploadFile: ""
      },
      fileList: [],
      csvVisible: false
    };
  },
  activated() {
    this.getDataFun();
    this.screenCompany = [];
    var data = JSON.stringify({
      pageSize: 100,
      page: 1
    });
    //请求
    var url =
      "/bashUrl/smart/worker/labour/" +
      sessionStorage.getItem("userId") +
      "/company/management";
    this.http.post(url, data).then(res => {
      if (res.code == 200) {
        var rows = res.data.rows;
        for (var i = 0; i < rows.length; i++) {
          this.screenCompany.push({
            id: rows[i].pLabourCompanyId,
            name: rows[i].company
          });
        }
      }
    });
  },
  methods: {
    //新增
    addStaffClick() {
      this.$global_msg.uId = 0
      // this.$router.push({ path: "/LabourNewlyadded" });
         this.$router.push({
        name: "LabourNewlyadded",
        params: {
          id: 0
        }
      });
    },
    //  listQuery: {
    //     currentPage: 1, //与后台定义好的分页参数
    //     pageSize: 10
    //   },
    //表格渲染
    getDataFun() {
      let _this = this;
      var data = JSON.stringify({
        company: _this.formInline.company,
        name: _this.formInline.id,
        jobNum: _this.formInline.jobNum,
        workType: _this.formInline.workerType,
        pageSize: _this.listQuery.pageSize,
        page: _this.listQuery.currentPage
      });
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.data.total;
          var rows = res.data.rows;
          this.tableData = rows;
          this.total = total;
        }
      });
    },
    //删除
    deleteRowClick() {
      handleCofirm("确认删除吗", "warning")
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
    //获得表格前面选中的id值
    handleSelectionChange() {
      var ids = new Array();
      console.log(this.$refs.multipleTable);
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].pinfoId;
        ids.push(id);
      }
      console.log(ids);
      return ids;
    },
    //批量删除
    deleteAll() {
      var ids = this.handleSelectionChange();
      console.log(ids);
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确认删除吗")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/labour";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getDataFun();
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
    //表格每条培训通过
    PassTrainingClick(row) {
      handleCofirm("请确认是否培训通过", "warning")
        .then(res => {
          var data = row.pinfoId;
          var url =
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/labour/evaluate/" +
            data +
            "/approve/" +
            2;
            var dataform=new FormData();
          this.http.post(url, dataform).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "通过成功!"
              });
              this.getDataFun();
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
    //单个删除
    handleDelete(row) {
      // 删除用户id
      var uid = row.pinfoId;
      var ids = [];
      ids.push(uid);
      handleCofirm("确认删除", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/labour";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getDataFun();
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
    //培训通过
    PassTraining() {
      var ids = this.handleSelectionChange();
      if (ids.length <= 0) {
        this.$message("请选择培训通过的数据！");
        return;
      }
      handleCofirm("请确认是否培训通过", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/labour/basic/" +
            data;
          this.http.post(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "通过成功!"
              });
              this.getDataFun();
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
    //退场
    exitClick(row) {
      handleCofirm("请确认是否退场", "warning")
        .then(res => {
          var data = row.pinfoId;
          var url =
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/labour/evaluate/" +
            data +
            "/approve/" +
            1;
             var dataform=new FormData();
          this.http.post(url, dataform).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "退场成功!"
              });
              this.getDataFun();
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
    acrosstheClick(index, scope) {
      this.tableWidth = "400";
      this.rowIndex = index;
    },
    acrosstClick(index, scope) {
      var index = null;
      this.tableWidth = "300";
      this.rowIndex = index;
      // this.btnShow =
    },
    //导入
    importCsv() {
      console.log(this.file.uploadFile[0].raw);
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/other/import";
      var data = new FormData();
      data.append("file", this.file.uploadFile[0].raw);
      this.http.get(url, data).then(res => {
        if (res.code == 200) {
          this.getOtherStaffs();
        }
      });
    },
    handleChange(file, fileList) {
      console.log(this.$rules);
      this.$refs.photoImage.clearValidate();
      this.file.uploadFile = fileList;
    },
    schandleChange(file, fileList) {
      this.$refs.from.clearValidate();
      this.from.photo = fileList;
    },
    //  导入
    importStaffClick() {
      this.csvVisible = true;
    },
    //导出
    exportExcelClick() {
      handleCofirm("确认导出吗", "warning").then(res => {
        let _this = this;
        var data = JSON.stringify({
          company: _this.formInline.company,
          name: _this.formInline.name,
          jobNum: _this.formInline.jobNum,
          workerType: _this.formInline.workerType,
          pageSize: _this.pageSize,
          page: _this.page
        });
        var url =
          "/bashUrl/smart/worker/roster/" +
          sessionStorage.getItem("userId") +
          "/labour/export";
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
      });
    },
    //拉黑
    blockClick(row) {
      this.pinfoId = row.pinfoId;
      this.centerDialogVisible = true;
    },
    handleButton() {
      console.log(this.formInline.region);
    },
    //评价
    evaluateClick(row) {
      this.formEevaluate.pinfoId=row.pinfoId;
      this.evaluatDialogVisible = true;
    },
    //取消评价
    cloneTeamForm() {
      this.evaluatDialogVisible = false;
    },
    //确认评价
    submitTeamForm(Rules) {
      this.$refs[Rules].validate(valid => {
        if (valid) {
          var _this = this;
          var data = JSON.stringify({
            pinfoId: _this.formEevaluate.pinfoId,
            evaluate: _this.formEevaluate.evaluate
          });
          this.evaluatDialogVisible = false;
          var url =
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/labour/evaluate";
          this.http.put(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "提交成功!"
              });
              this.getDataFun();
            }
          });
        } else {
        }
      });
    },
    //文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //查看详情
    handleClick(row) {
      let _this = this;

      _this.bindData=row.pinfoId;
      _this.changOrder = true;
      _this.$nextTick(() => {
        console.log(_this.$refs.turnOrder);
        _this.$refs.turnOrder.init();
      });
    },
    //编辑
    editRowClick(indexer,row) {
      console.log(row.pinfoId);
      this.$global_msg.uId = row.pinfoId;
      // this.$router.push({ path: "/LabourNewlyadded" });
      this.$router.push({
        name: "LabourNewlyadded",
        params: {
          id:row.pinfoId
        }
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
    //点击确认拉黑
    addSubmitForm(from) {
      // 验证
      this.$refs[from].validate(valid => {
        if (valid) {
          var form = this.$refs["from"].model;
          var data = new FormData();
          data.append("blackReason", form.Reason);
          data.append("evidence", form.photo[0].raw);
          var url =
            "/bashUrl/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/labour/evaluate/" +
            this.pinfoId +
            "/approve/" +
            4;
          this.http.post(url, data).then(res => {
            if (res.code == 200) {
             this.$message({
                type: "success",
                message: "已拉黑!"
              });
              this.centerDialogVisible=false;
              this.getDataFun();
            }
          });
          // this.addOpen = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
