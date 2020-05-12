<template>
  <!--
  Ctrl+f
  筛选 新增  导出 导入 编辑 删除 通过 驳回 催办
  -->
  <div class="main-box">
    <!-- 筛选 -->
    <div class="R-L-S screen-form">
      <el-form :inline="true" ref="screenForm" :model="screenForm" class="screen-form-h">
        <el-form-item label="实际开复工时间：">
          <el-date-picker
            v-model="screenForm.backWorkTime"
            type="datetime"
            placeholder="请选择"
            default-time="12:00:00"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onScreen">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="R-L-T table-main">
      <div style="margin-bottom: 30px;">
        <el-button class="T-H-B-DarkBlue" @click="addOpen = true">新增</el-button>
        <el-button class="T-H-B-Grey" @click="deleteBatchClick" style="margin-left:30px;">删除</el-button>
        <el-button class="T-H-B-Cyan" @click="exportStaffClick" style="margin-left:30px;">导出</el-button>
        <el-upload
          style="display:inline-block; margin-left: 10px;"
          class="upload-demo"
          action
          :show-file-list="false"
        >
          <el-button class="T-H-B-Cyan" type="primary" @click="importStaffClick(this)" style="margin-left:30px;">导入</el-button>
        </el-upload>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        :header-cell-style="headClass"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" fixed prop="id" @selection-change="handleSelectionChange"></el-table-column>
        <el-table-column prop="constructionPlantName" label="施工场地名称" min-width="100"></el-table-column>
        <el-table-column prop="engineerPlace" label="工程地点" min-width="90"></el-table-column>
        <el-table-column prop="projectType" label="工程状态类别" min-width="110"></el-table-column>
        <el-table-column prop="backWorkState" label="开复工手续办理情况" min-width="80"></el-table-column>
        <el-table-column prop="districtTime" label="开复工手续报区住建委时间（*月*日）" min-width="100"></el-table-column>
        <el-table-column prop="actualTime" label="实际开复工日期" min-width="100"></el-table-column>
        <el-table-column prop="todayManagerNum" label="现有管理人员总数量（今日累计数据）" min-width="120"></el-table-column>
        <el-table-column prop="yesterdayBeforeManagerNum" label="现有管理人员总数量（前日累计数据）" min-width="120"></el-table-column>
        <el-table-column prop="todayJobNum" label="现有作业人员总数量（今日累计数据）" min-width="120"></el-table-column>
        <el-table-column prop="yesterdayBeforeJobNum" label="现有作业人员总数量（前日累计数据）" min-width="120"></el-table-column>
        <el-table-column prop="todayWorkerNum" label="今天返京作业工人数量" min-width="120"></el-table-column>
        <el-table-column prop="todayleaveWorkerNum" label="今天撤场作业人员数量" min-width="120"></el-table-column>
        <el-table-column prop="todayHBNum" label="今天从湖北地区返京作业工人数量" min-width="120"></el-table-column>
        <el-table-column prop="isSatisfy" label="劳务人员数量是否满足开复工要求" min-width="120"></el-table-column>
        <el-table-column prop="restrictReasons" label="开复工制约因素" min-width="120"></el-table-column>
        <el-table-column prop="restrictReasonDetail" label="制约因素存在的具体原因" min-width="120"></el-table-column>
        <el-table-column prop="checkState" label="审核意见" min-width="120"></el-table-column>
        <el-table-column prop="createTime" label="生成时间" min-width="120"></el-table-column>
        <el-table-column label="操作" :width="tableWidth" fixed="right">
          <template slot-scope="scope">
            <div v-if="rowIndex!=scope.$index">
              <el-button class="T-R-B-Green" size="mini" @click="editRowClick(scope.row)">编辑</el-button>
              <el-button class="T-R-B-Grey" size="mini" @click="deleteRowClick(scope.row)">删除</el-button>
              <el-button
                class="T-R-B-Green"
                size="mini"
                @click="acrosstheClick(scope.$index, scope.row)"
              >......</el-button>
            </div>
            <div v-if="rowIndex==scope.$index">
              <el-button class="T-R-B-Green" size="mini" @click="editRowClick(scope.row)">编辑</el-button>
              <el-button class="T-R-B-Grey" size="mini" @click="deleteRowClick(scope.row)">删除</el-button>
              <el-button class="T-R-B-Green" size="mini" @click="passClick(scope.row)">通过</el-button>
              <el-button class="T-R-B-Red" size="mini" @click="NopassClick(scope.row)">驳回</el-button>
              <el-button class="T-R-B-Yellow" size="mini" @click="pressClick(scope.row)">催办</el-button>
              <el-button
                class="T-R-B-Green"
                size="mini"
                @click="acrosstClick(scope.$index, scope.row)"
              >......</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; padding-top:20px;">
        <el-pagination
          background
          layout="total, prev, pager,next"
          :page-size="pageSize"
          :current-page="page"
          :total="total"
          @prev-click="prev"
          @next-click="next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <!-- --------------------------------- -->
    <!-- 添加 -->
    <el-dialog
      title="中铁十二局"
      width="450px"
      :visible.sync="addOpen"
      :close-on-click-modal="false"
      class="popupDialog"
      :center="true"
      :show-close="false"
    >
      <el-form
        ref="addFormRef"
        :rules="rulesForm"
        :model="addLabor"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item prop="profession" label="施工场地名称">
          <el-select v-model="addLabor.profession" placeholder="请选择" @change="selectProfession">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="engineerPlace" label="工程地点">
          <el-input v-model="addLabor.engineerPlace"></el-input>
        </el-form-item>
        <el-form-item prop="projectType" label="工程状态类别">
          <el-input v-model="addLabor.projectType"></el-input>
        </el-form-item>
        <el-form-item prop="backWorkState" label="开复工手续办理情况">
          <el-input v-model="addLabor.backWorkState"></el-input>
        </el-form-item>
        <el-form-item prop="districtTime" label="开复工手续报区住建委时间">
          <el-date-picker
            v-model="addLabor.districtTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="actualTime" label="实际开复工日期">
          <el-date-picker
            v-model="addLabor.actualTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="isBackwork" label="是否开复工">
          <el-select v-model="addLabor.isBackwork" placeholder="请选择" @change="selectBState">
            <el-option
              v-for="item in isBackworks"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="restrictReasons" label="开复工制约因素" class="labelWidth">
          <el-input v-model="addLabor.restrictReasons"></el-input>
        </el-form-item>
        <el-form-item prop="restrictReasonDetail" label="制约因素存在的具体原因" class="labelWidth">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入交底内容"
            v-model="addLabor.restrictReasonDetail"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="F-Grey" round @click="cloneAddForm('addFormRef')">取消</el-button>
          <el-button class="F-Blue" round @click="addSubmitForm('addFormRef')" style="margin-left:60px;">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { handleCofirm } from "@/utils/confirm";
export default {
  data() {
    return {
      //  初始化页面
      id: null, // 当前选中的id
      ids: null, // 选中的id
      page: 1, // 初始页
      pageSize: 10, // 默认每页数据量
      total: 0, //总条数
      rowIndex: null, //选中当前行下标
      tableData: [], // 初始化表格
      addOpen: false, // 添加弹窗初始隐藏
      tableWidth:'300',
      addLabor: {
        profession: "",
        engineerPlace: "",
        projectType: "",
        id: null,
        backWorkState: "",
        districtTime: "",
        actualTime: "",
        isBackwork: "",
        restrictReasons: "",
        restrictReasonDetail: ""
      },
      // 自定义表单验证
      rulesForm: {
        profession: [
          { required: true, message: "请选择施工场地名称", trigger: "change" }
        ],
        engineerPlace: [
          { required: true, message: "请输入工程地点", trigger: "blur" }
        ],
        projectType: [
          { required: true, message: "请输入工程状态类别", trigger: "blur" }
        ],
        backWorkState: [
          {
            required: true,
            message: "请输入开复工手续办理情况",
            trigger: "blur"
          }
        ],
        districtTime: [
          { required: true, message: "请输入时间", trigger: "change" }
        ],
        actualTime: [
          { required: true, message: "请输入时间", trigger: "change" }
        ],
        isBackwork: [{ required: true, message: "请选择", trigger: "change" }],
        restrictReasons: [
          { required: true, message: "请输入开复工制约因素", trigger: "blur" }
        ],
        restrictReasonDetail: [
          {
            required: true,
            message: "请输入制约因素存在的具体原因",
            trigger: "blur"
          }
        ]
      },
      screenForm: {
        backWorkTime: null
      },
      //施工场地
      options: [
        { id: "", name: "请选择" },
        { id: 1, name: "施工场地一" },
        { id: 2, name: "施工场地二" },
        { id: 3, name: "施工场地三" }
      ],
      isBackworks: [
        { id: "", name: "请选择" },
        { id: 1, name: "是" },
        { id: 2, name: "否" }
      ]
    };
  },
  created() {
    // 页面加载时获取用户信息
    this.getLocalStorage();
    this.getTable();
  },
  components: {},
  methods: {
    acrosstheClick(index, scope) {
      console.log("mouseover");
       this.tableWidth = "600";
      this.rowIndex = index;
    },
    acrosstClick(index, scope) {
      var index = null;
      this.tableWidth = "300";
      this.rowIndex = index;
    },
    // 获取本地存储用户信息
    getLocalStorage() {
      this.username = window.localStorage.getItem("username");
      this.userId = window.localStorage.getItem("userId");
      this.admin = window.localStorage.getItem("admin");
      this.token = window.localStorage.getItem("token");
    },
    // 每页显示多少条 @size-change
    handleSizeChange(size) {
      this.pageSize = size;
      this.getTable();
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    // 点击跳转第几页 @current-change
    handleCurrentChange(page) {
      this.page = page;
      this.getTable();
    },
    // 上一页 @prev-click
    prev(cpage) {
      this.page = cpage;
      this.getTable();
    },
    // 下一页 @next-click
    next(cpage) {
      this.page = cpage;
      this.getTable();
    },
    // 表格加载请求
    getTable() {
      var data = JSON.stringify({
        backWorkDate: this.screenForm.backWorkTime,
        pageSize: this.pageSize,
        page: this.page
      });
      //请求
      // var url =
      //   "/smart/worker/labour/" +
      //   sessionStorage.getItem("userId") +
      //   "/company/management";
      // this.http.post(url, data).then(res => {
      //   if (res.code == 200) {
      //     var total = res.total;
      //     var rows = res.rows;
      //     this.tableData = rows;
      //     this.total = total;
      //   }
      // });
      var result = [
        {
          id: 1,
          constructionPlantName: "广联达昌平08南延线",
          engineerPlace: "昌平线",
          projectType: "建设中",
          backWorkState: "审核中",
          districtTime: "2023-4-15",
          actualTime: "2023-4-15",
          contractCode: "HT123456",
          start: "2019-10-10",
          end: "2020-10-09",
          todayManagerNum: "1526人",
          yesterdayBeforeManagerNum: "1226人",
          todayJobNum: "526人",
          yesterdayBeforeJobNum: "555人",
          todayWorkerNum: "550人",
          todayleaveWorkerNum: "52人",
          todayHBNum: "44人",
          isSatisfy: "满足",
          restrictReasons: "xxxxxxxxxx",
          restrictReasonDetail: "xxxxxxxxxxxxxxxxxxxxxxxx",
          checkState: "通过",
          createTime: "2020-4-15"
        },
        {
          id: 2,
          constructionPlantName: "广联达昌平08南延线",
          engineerPlace: "昌平线",
          projectType: "建设中",
          backWorkState: "审核中",
          districtTime: "2022-4-15",
          actualTime: "2023-4-15",
          contractCode: "HT123456",
          start: "2019-10-10",
          end: "2020-10-09",
          todayManagerNum: "1526人",
          yesterdayBeforeManagerNum: "1226人",
          todayJobNum: "526人",
          yesterdayBeforeJobNum: "555人",
          todayWorkerNum: "550人",
          todayleaveWorkerNum: "52人",
          todayHBNum: "44人",
          isSatisfy: "满足",
          restrictReasons: "xxxxxxxxxx",
          restrictReasonDetail: "xxxxxxxxxxxxxxxxxxxxxxxx",
          checkState: "通过",
          createTime: "2020-4-15"
        }
      ];
      this.tableData = result;
      this.total = result.length;
    },
    //获得表格前面选中的id值
    handleSelectionChange() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].id;
        ids.push(id);
        // console.log("获得id"+arrays[i].id);
      }
      return ids;
    },
    // 查询
    onScreen() {
      var data = JSON.stringify(this.screenForm.backWorkTime);
      // console.log("data" + data);
      // this.http.post('/smart/worker/labour/1/company/management', data)
      // .then(res => {
      //     console.log(res)
      // })
    },
    // 添加
    addSubmitForm(addFormRef) {
      // 验证
      this.$refs[addFormRef].validate(valid => {
        if (valid) {
          var form = this.$refs["addFormRef"].model;
          if (form.id == null) {
            console.log("新增");
          } else {
            console.log(form.id);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // 添加劳务人员请求
      // var params = JSON.stringify({
      //   name: form.userName2,
      //   cellPhone: form.phone2,
      //   idNum: form.idNum,
      //   account: form.account,
      //   password: form.password2
      // });
      // this.http
      //   .post("smart/worker/labour/" + userId + "/company/management", params)
      //   .then(res => {
      //     if (res.code == 200) {
      //       this.$message("添加成功");
      //     }
      //   })
      //   .catch(res => {});
    },
    // 关闭添加弹窗
    cloneAddForm(addFormRef) {
      this.$refs[addFormRef].resetFields();
      this.addOpen = false;
    },
    //  批量删除
    deleteBatchClick() {
      var ids = this.handleSelectionChange();
      console.log("ids" + ids);
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确定删除吗？")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/company";
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
    //  导出
    exportStaffClick() {},
    //  导入
    importStaffClick() {},
    //  表格操作
    //  编辑回显
    editRowClick(row) {
      var id = row.id;
      this.addLabor.id = id;
      this.addOpen = true;
      this.addLabor.engineerPlace = "1111";
      console.log("id" + id);
    },
    //  删除
    deleteRowClick(row) {
      console.log(row.id);
      this.$confirm("确定删除该信息吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
        roundButton: true
      })
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //通过 pass
    passClick(row) {
      console.log(row.id);
    },
    //驳回
    NopassClick(row) {
      console.log(row.id);
    },
    //催办
    pressClick(row) {
      console.log(row.id);
    },
    //  数据表格-表头样式
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    },
    // 下拉框获得值 施工场地
    selectProfession(vid) {
      let obj = {};
      obj = this.options.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.addLabor.profession = obj.id;
    },
    selectBState(vid) {
      let obj = {};
      obj = this.isBackworks.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.addLabor.isBackwork = obj.id;
    }
  }
};
</script>

<style lang="stylus" scoped>
.R-L-wrap {
  width: 100%;
  height: 100%;
}

.R-L-S, .R-L-T {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
}

.screen-form-h {
  height: 36px;
}
.app-wrapper{
    padding-left: 0;
    padding-top: 140px;
}
</style>

