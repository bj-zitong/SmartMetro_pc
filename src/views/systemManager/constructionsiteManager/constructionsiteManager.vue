<template>
  <div class="main-box">
    <!-- 筛选 -->
    <el-container>
      <el-menu class="main-top-box pl30">
        <el-form :inline="true" ref="screenForm" :model="screenForm">
          <el-form-item label="项目中心：" prop="projectName">
            <el-input v-model="screenForm.projectName" placeholder="请输入"></el-input>
            <i
              class="el-icon-search"
              style="position: absolute;top:8px;right: 8px;"
              @click="getTable()"
            ></i>
          </el-form-item>
          <el-form-item label="标段/工地：" prop="section">
            <el-input v-model="screenForm.section" placeholder="请输入"></el-input>
                <i
              class="el-icon-search"
              style="position: absolute;top:8px;right: 8px;"
              @click="getTable()"
            ></i>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="onScreen">查询</el-button>
          </el-form-item> -->
        </el-form>
      </el-menu>
    </el-container>
    <!-- 主体 -->
    <el-container>
      <el-menu class="main-con-box">
        <div class="main-btn-box">
          <el-button class="T-H-B-DarkBlue" @click="addClick()">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteBatchClick()">删除</el-button>
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
          <el-table-column
            type="selection"
            fixed
            prop="orgSiteId"
            @selection-change="handleSelectionChange"
          ></el-table-column>
          <el-table-column prop="projectCenter" label="项目中心" min-width="100"></el-table-column>
          <el-table-column prop="line" label="线路" min-width="90"></el-table-column>
          <el-table-column prop="siteName" label="标段/工地" min-width="110"></el-table-column>
          <el-table-column prop="buildCorpName" label="承建单位" min-width="80"></el-table-column>
          <el-table-column prop="responsiblePersonName" label="项目负责人姓名" min-width="100"></el-table-column>
          <el-table-column prop="cellPhone" label="联系电话" min-width="100"></el-table-column>
          <el-table-column prop="location" label="所在位置" min-width="120"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="120"></el-table-column>
          <el-table-column label="操作" width="240" fixed="right">
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
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="pagination-box"
          layout="total, prev, pager,next"
          :current-page="page"
          :page-size="pageSize"
          :total="total"
          @prev-click="prev"
          @next-click="next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-menu>
    </el-container>

    <!-- 添加 -->
    <el-dialog
      width="450px"
      class="popupDialog abow_dialog"
      :title="titleLabor"
      :visible.sync="dialogVisibleLabor"
      :close-on-click-modal="false"
      :center="true"
      :show-close="false"
      :hide-required-asterisk="true"
    >
      <el-form
        ref="refLabor"
        :rules="rulesForm"
        :model="formLabor"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item prop="projectCenter" label="项目中心">
          <el-input v-model="formLabor.projectCenter"></el-input>
        </el-form-item>
        <el-form-item prop="line" label="线路">
          <el-input v-model="formLabor.line"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonPhone" label="标段/工地">
          <el-input v-model="formLabor.responsiblePersonPhone"></el-input>
        </el-form-item>
        <el-form-item prop="serviceCompany" label="承建单位">
          <el-input v-model="formLabor.serviceCompany"></el-input>
        </el-form-item>
        <el-form-item prop="projectCode" label="项目负责人姓名">
          <el-input v-model="formLabor.projectCode"></el-input>
        </el-form-item>
        <el-form-item prop="projectName" label="联系电话">
          <el-input v-model="formLabor.projectName"></el-input>
        </el-form-item>
        <el-form-item prop="contractCode" label="所在位置">
          <el-input v-model="formLabor.contractCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="F-Grey" round @click="cloneLaborForm('refLabor')">取消</el-button>
          <el-button class="F-Blue" round @click="submiLabortForm('refLabor')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 创建班组 -->
    <el-dialog
      width="450px"
      title="新增班组"
      class="popupDialog"
      :visible.sync="dialogVisibleTeam"
      :center="true"
      :show-close="false"
      :close-on-click-modal="false"
      :hide-required-asterisk="true"
    >
      <el-form
        method="post"
        ref="refTeam"
        label-width="100px"
        :rules="rulesForm"
        :model="formTeam"
        action
      >
        <el-form-item prop="pLabourCompanyId">
          <el-input v-model="formTeam.pLabourCompanyId" type="text" hidden></el-input>
        </el-form-item>
        <el-form-item prop="projectName" label="工程名称：">
          <el-input v-model="formTeam.projectName" type="text" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="teamName" label="班组名称：">
          <el-input v-model="formTeam.teamName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="teamType" label="班组类型：">
          <el-select v-model="formTeam.teamType">
            <el-option
              v-for="item in teamOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="teamLeaderName" label="班组长：">
          <el-input v-model="formTeam.teamLeaderName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="teamLeaderPhone" label="手机号码：">
          <el-input v-model="formTeam.teamLeaderPhone" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="F-Grey" round @click="cloneTeamForm('refTeam')">取 消</el-button>
          <el-button class="F-Blue" round @click="submitTeamForm('refTeam')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { handleCofirm } from "@/utils/confirm";

export default {
  name: "excelExport",
  data() {
    return {
      //  初始化页面
      page: 1, // 初始页
      pageSize: 10, // 默认每页数据量
      total: 0, //总条数
      tableData: [], // 初始化表格
      gridData: [], // 查看下属表格初始化
      dialogVisibleLabor: false, // 添加/编辑弹窗
      dialogVisibleTeam: false, // 班组
      formTeam: {
        //班组初始化
        pLabourCompanyId: null,
        projectName: "",
        teamName: "",
        teamType: "",
        teamLeaderName: "",
        teamLeaderPhone: ""
      },
      teamOptions: [
        { id: 0, name: "班组1" },
        { id: 0, name: "班组2" }
      ],
      titleLabor: "", // 标题
      seeBranch: false, // 创建班组弹窗
      screenForm: {
        //  筛选
        projectName: "",
        section: "" //标段
      },
      screenCompany: [
        { id: 0, name: "第一公司" },
        { id: 1, name: "第二公司" }
      ],
      // 新增/编辑
      formLabor: {
        orgSiteId: null,
        company: "",
        responsiblePersonName: "",
        responsiblePersonPhone: "",
        serviceCompany: "",
        projectCode: "",
        projectName: "",
        contractCode: "",
        startDate: "",
        endDate: "",
        contractPeriodType: "",
        corpCode: ""
      },
      // 自定义表单验证
      rulesForm: {
        company: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        responsiblePersonName: [
          { required: true, message: "请输入负责人", trigger: "blur" }
        ],
        responsiblePersonPhone: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ],
        serviceCompany: [
          { required: true, message: "请输入服务单位", trigger: "blur" }
        ],
        projectCode: [
          { required: true, message: "请输入项目编号", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        contractCode: [
          { required: true, message: "请输入合同编号", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "请选择开始日期", trigger: "change" }
        ],
        endDate: [
          { required: true, message: "请选择结束日期", trigger: "change" }
        ],
        contractPeriodType: [
          { required: true, message: "请选择合同期限类型", trigger: "change" }
        ],
        corpCode: [
          { required: true, message: "请输入组织机构代码", trigger: "blur" }
        ],
        teamName: [
          { required: true, message: "请输入班组名称", trigger: "blur" }
        ],
        teamType: [
          { required: true, message: "请选择班组类型", trigger: "change" }
        ],
        teamLeaderName: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        teamLeaderPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // 页面加载时获取信息
    this.getTable();
  },
  components: {},
  methods: {
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
        pageSize: this.pageSize,
        page: this.page,
        projectCenter:this.screenForm.projectName,
        siteName:this.screenForm.section
      });
      //请求
      ///smart/auth/{userId}/org/management
      var url =
        "/smart/auth/" +
        sessionStorage.getItem("userId") +
        "/org/management";
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
          orgSiteId: 1,
          projectCenter: "第一公司",
          status: "未提交",
          line: "13号线",
          siteName: "霍营",
          buildCorpName: "第一单位",
          responsiblePersonName: "张三",
          cellPhone: "15236985965",
          location: "xxxxx",
          createTime: "2019-10-01"
        },
        {
          orgSiteId: 2,
          projectCenter: "第二公司",
          status: "未提交",
          line: "12",
          siteName: "xxxxx",
          buildCorpName: "第二单位",
          responsiblePersonName: "王五",
          cellPhone: "15236985697",
          contractCode: "HT654321",
          location: "xxxxx",
          createTime: "2020-10-07"
        }
      ];
      this.tableData = result;
      this.total = result.length;
    },
    //获得表格前面选中的id值
    handleSelectionChange() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      console.log(arrays);
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].orgSiteId;
        ids.push(id);
        // console.log("获得id"+arrays[i].userId);
      }
      return ids;
      //  this.multipleSelection = val;
    },
    // 查询
    onScreen() {
      let data = JSON.stringify(this.screenForm);
      this.http
        .post("/smart/worker/labour/1/company/management", data)
        .then(res => {
          console.log(res);
        });
    },

    //  添加/编辑 提交
    submiLabortForm(refLabor) {
      // 验证
      this.$refs[refLabor].validate(valid => {
        if (valid) {
          let form = this.$refs[refLabor].model;
          // 判断id是否为空
          if (form.id == null) {
            let data = JSON.stringify(this.formLabor);
            this.http
              .post("smart/worker/labour/1/company/management", data)
              .then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                }
              })
              .catch(res => {
                console.log("error!");
                return false;
              });
            this.dialogVisibleLabor = false;
          } else {
            let data = JSON.stringify(this.formLabor);
            this.http
              .put("smart/worker/labour/1/company/management", data)
              .then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                }
              })
              .catch(res => {
                console.log("error!");
                return false;
              });
            this.dialogVisibleLabor = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //  新增/编辑   关闭
    cloneLaborForm(refLabor) {
      this.$refs[refLabor].resetFields();
      this.dialogVisibleLabor = false;
    },
    //  新增劳务公司
    addClick() {
      this.titleLabor = "添加";
      this.dialogVisibleLabor = true;
    },
    //  编辑回显
    editRowClick(inedx, row) {
      this.titleLabor = "编辑劳务公司";
      this.formLabor = row;
      this.dialogVisibleLabor = true;
    },

    //  批量删除
    deleteBatchClick() {
      var ids = this.handleSelectionChange();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确定删除该员工信息吗？")
        .then(res => {
          let data = JSON.stringify(ids);
          let url =
            "/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/company";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              let total = res.total;
              let rows = res.rows;
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
    //  删除
    deleteRowClick(index, row) {
      let ids = [];
      ids.push(row.id);

      handleCofirm("确定删除该员工信息吗？")
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
    //  班组提交
    createdTeamClick(index, row) {
      this.dialogVisibleTeam = true;
    },
    submitTeamForm(refTeam) {
      // 验证
      console.log(this.id);
      this.$refs[refTeam].validate(valid => {
        if (valid) {
          let form = this.$refs[refTeam].model;
          let data = JSON.stringify(this.formTeam);
          let url =
            "/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team";
          this.http
            .post("url", data)
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
              }
            })
            .catch(res => {
              console.log("error!");
              return false;
            });
          this.dialogVisibleTeam = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cloneTeamForm(refTeam) {
      this.$refs[refTeam].resetFields();
      this.dialogVisibleTeam = false;
    },
    //  表头样式
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
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
</style>

<style lang="stylus"></style>
