<template>
  <div class="main-box">
    <!-- 筛选 -->
    <el-container>
      <el-menu class="main-top-box pl30">
        <el-form :inline="true" ref="screenForm" :model="screenForm">
          <el-form-item label="劳务公司：">
            <el-select v-model="screenForm.company">
              <el-option v-for="item in company" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人：">
            <el-input v-model="screenForm.responsiblePersonName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="合同类型：">
            <el-select v-model="screenForm.contractPeriodType">
              <el-option label="固定期限合同" value="0"></el-option>
              <el-option label="以完成一定工作为期限的合同" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onScreen">查询</el-button>
          </el-form-item>
        </el-form>
      </el-menu>
    </el-container>

    <!-- 主体 -->
    <el-container>
      <el-menu class="main-con-box">
        <div class="main-btn-box">
          <el-button class="T-H-B-DarkBlue" @click="addClick">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteBatchClick">删除</el-button>
          <el-button class="T-H-B-Cyan" @click="exportBatchClick">导出</el-button>
          <el-upload
            style="display:inline-block; margin-left: 10px;"
            class="upload-demo"
            action
            :show-file-list="false"
          >
            <el-button class="T-H-B-Cyan" type="primary" @click="importBatchClick">导入</el-button>
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
          <el-table-column
            type="selection"
            fixed
            prop="id"
            @selection-change="handleSelectionChange"
          ></el-table-column>
          <el-table-column prop="company" label="公司名称" min-width="100"></el-table-column>
          <el-table-column prop="responsiblePersonName" label="负责人" min-width="90"></el-table-column>
          <el-table-column prop="responsiblePersonPhone" label="联系方式" min-width="110"></el-table-column>
          <el-table-column prop="serviceCompany" label="服务单位" min-width="80"></el-table-column>
          <el-table-column prop="projectCode" label="项目编号" min-width="100"></el-table-column>
          <el-table-column prop="projectName" label="项目名称" min-width="100"></el-table-column>
          <el-table-column prop="contractCode" label="合同编号" min-width="120"></el-table-column>
          <el-table-column label="有效时间" min-width="200">
            <template slot-scope="scope">
              <span>{{scope.row.startDate}}</span> 至
              <span>{{scope.row.endDate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="contractPeriodType" label="合同期限类型" min-width="210"></el-table-column>
          <el-table-column prop="corpCode" label="组织机构代码" min-width="120"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column label="操作" width="240" fixed="right">
            <template slot-scope="scope">
              <el-button
                class="T-R-B-Green"
                size="mini"
                @click.native="editRowClick(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                class="T-R-B-Grey"
                size="mini"
                @click.native="deleteRowClick(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                class="T-R-B-Violet"
                size="mini"
                @click.native="createdTeamClick(scope.$index, scope.row)"
              >创建班组</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页& -->
        <pagination
          class="pagination-box"
          v-if="total>0"
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getTable"
        />
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
        <el-form-item prop="company" label="公司名称">
          <el-input v-model="formLabor.company"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonName" label="负责人">
          <el-input v-model="formLabor.responsiblePersonName"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonPhone" label="联系方式">
          <el-input v-model="formLabor.responsiblePersonPhone"></el-input>
        </el-form-item>
        <el-form-item prop="serviceCompany" label="服务单位">
          <el-input v-model="formLabor.serviceCompany"></el-input>
        </el-form-item>
        <el-form-item prop="projectCode" label="项目编号">
          <el-input v-model="formLabor.projectCode"></el-input>
        </el-form-item>
        <el-form-item prop="projectName" label="项目名称">
          <el-input v-model="formLabor.projectName"></el-input>
        </el-form-item>
        <el-form-item prop="contractCode" label="合同编号">
          <el-input v-model="formLabor.contractCode"></el-input>
        </el-form-item>
        <el-form-item label="有效时间" required>
          <el-col :span="11">
            <el-form-item prop="startDate">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="开始日期"
                v-model="formLabor.startDate"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-form-item prop="endDate">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="结束日期"
                v-model="formLabor.endDate"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop="contractPeriodType" label="合同期限类型">
          <el-select v-model="formLabor.contractPeriodType">
            <el-option label="固定期限合同" value="0"></el-option>
            <el-option label="以完成一定工作为期限的合同" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="corpCode" label="所属企业组织机构代码" class="labelWidth">
          <el-input v-model="formLabor.corpCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="F-Grey" round @click.native="cloneLaborForm('refLabor')">取消</el-button>
          <el-button class="F-Blue" round @click.native="submiLabortForm('refLabor')">确定</el-button>
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
      <el-form ref="refTeam" label-width="100px" :rules="rulesForm" :model="formTeam" action>
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
          <el-button class="F-Grey" round @click.native="cloneTeamForm('refTeam')">取 消</el-button>
          <el-button class="F-Blue" round @click.native="submitTeamForm('refTeam')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { handleCofirm } from "@/utils/confirm";
import Pagination from "@/components/pagination";

export default {
  name: "excelExport",
  components: {
    Pagination
  },
  data() {
    return {
      total:'',
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
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
        company: "",
        responsiblePersonName: "",
        contractPeriodType: ""
      },
      company: [
        { id: 0, name: "第一公司" },
        { id: 1, name: "第二公司" }
      ],
      // 新增/编辑 劳务人员
      formLabor: {
        id: null,
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
  activated() {
    // 页面加载时获取信息
    this.getTable();
  },
  methods: {
    // 表格加载请求
    getTable() {
      var data = JSON.stringify({
        company: this.screenForm.company,
        responsiblePersonName: this.screenForm.responsiblePersonName,
        contractPeriodType: this.screenForm.contractPeriodType,
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage
      });
      //请求
      var url =
        "/bashUrl/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/company/management";
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
          company: "第一公司",
          responsiblePersonName: "张三",
          responsiblePersonPhone: "13888779977",
          serviceCompany: "第一单位",
          projectCode: "007124241",
          projectName: "第一项目",
          contractCode: "HT123456",
          startDate: "2019-10-01",
          endDate: "2020-10-07",
          contractPeriodType: "固定期限合同",
          corpCode: "354163831",
          status: "未提交"
        },
        {
          id: 2,
          company: "第二公司",
          responsiblePersonName: "李四",
          responsiblePersonPhone: "13881234123",
          serviceCompany: "第二单位",
          projectCode: "558244568",
          projectName: "第二项目",
          contractCode: "HT654321",
          startDate: "2019-10-01",
          endDate: "2020-10-07",
          contractPeriodType: "以完成一定工作为期限的合同",
          corpCode: "68461684",
          status: "未提交"
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
      }
      return ids;
    },
    // 查询
    onScreen() {
      let data = JSON.stringify(this.screenForm);
      let url =
        "/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/company/management";
      this.http.post(url, data).then(res => {
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
            let url =
              "/smart/worker/labour/" +
              sessionStorage.getItem("userId") +
              "/company/management";
            let data = JSON.stringify(this.formLabor);
            this.http
              .post(url, data)
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
            let url =
              "/smart/worker/labour/" +
              sessionStorage.getItem("userId") +
              "/company/management";
            let data = JSON.stringify(this.formLabor);
            this.http
              .put(url, data)
              .then(res => {
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                }
              })
              .catch(res => {
                console.log("error!");
                return false;
              });
            this.dialogVisibleLabor = false;
          }
          this.cloneLaborForm(refLabor);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //  新增/编辑   关闭
    cloneLaborForm(refLabor) {
      this.$refs[refLabor].resetFields();
      Object.assign(this.$data.formLabor, this.$options.data().formLabor); // 初始化data
      this.dialogVisibleLabor = false;
    },
    //  新增劳务公司
    addClick() {
      this.titleLabor = "新增劳务公司";
      this.dialogVisibleLabor = true;
    },
    //  编辑回显
    editRowClick(inedx, row) {
      this.titleLabor = "编辑劳务公司";
      this.formLabor = JSON.parse(JSON.stringify(row));
      this.dialogVisibleLabor = true;
    },

    //  批量删除
    deleteBatchClick() {
      let ids = this.handleSelectionChange();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确定删除吗？")
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
    //  导出
    exportBatchClick() {
      let company = this.screenForm.company;
      let responsiblePersonName = this.screenForm.responsiblePersonName;
      let contractPeriodType = this.screenForm.contractPeriodType;
      let _this = this;
      let data = JSON.stringify({
        company: company,
        responsiblePersonName: responsiblePersonName,
        contractPeriodType: contractPeriodType,
        pageSize: _this.listQuery.pageSize,
        page: _this.listQuery.currentPage
      });
      let url =
        "/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/company/management/export";
      this.http.post(url, data).then(res => {
        let d = new Date();
        let month = d.getMonth() + 1;
        let excelName =
          "劳务公司人员-" +
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
      });
    },
    //  导入
    importBatchClick() {
      let url =
        "/smart/worker/labour/" +
        sessionStorage.getItem("userId") +
        "/company/management/import";
      let params = new FormData();
      params.append("file", this.file.uploadFile[0].raw);
      this.http.get(url, params).then(res => {
        if (res.code == 200) {
          this.getTable();
        }
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
    //  班组
    createdTeamClick(index, row) {
      this.formTeam.pLabourCompanyId = JSON.parse(JSON.stringify(row.id));
      this.dialogVisibleTeam = true;
    },
    // 班组提交
    submitTeamForm(refTeam) {
      this.$refs[refTeam].validate(valid => {
        if (valid) {
          let form = this.$refs[refTeam].model;
          let data = JSON.stringify(this.formTeam);
          let url =
            "/smart/worker/labour/" +
            sessionStorage.getItem("userId") +
            "/team";
          this.http
            .post(url, data)
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
      this.$refs[refTeam].resetFields();
    },
    cloneTeamForm(refTeam) {
      this.$refs[refTeam].resetFields();
      this.dialogVisibleTeam = false;
    },
    // 表头样式
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    }
  }
};
</script>