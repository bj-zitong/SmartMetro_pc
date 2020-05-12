<template>
  <!-- 
  Ctrl+f
  筛选 新增 批量删除 导出 导入 编辑 删除 查看下属
  -->
  <div class="main-box">
    <!-- 筛选 -->
    <div class="R-L-S screen-form">
      <el-form :inline="true" ref="screenForm" :model="screenForm" class="screen-form-h">
        <el-form-item label="劳务公司：">
          <el-select v-model="screenForm.company" placeholder="请选择劳务公司">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人：">
          <el-input v-model="screenForm.responsiblePersonName" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="合同类型：">
          <el-select v-model="screenForm.contractPeriodType" placeholder="请选择合同类型">
            <el-option label="劳务分包" value="0"></el-option>
            <el-option label="专业分包" value="1"></el-option>
          </el-select>
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
        <el-button class="T-H-B-Grey" @click="deleteBatchClick">删除</el-button>
        <el-button class="T-H-B-Cyan" @click="exportStaffClick">导出</el-button>
        <el-upload
          style="display:inline-block; margin-left: 10px;"
          class="upload-demo"
          action
          :show-file-list="false"
        >
          <el-button class="T-H-B-Cyan" type="primary" @click="importStaffClick(this)">导入</el-button>
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
        <el-table-column prop="company" label="公司名称" min-width="100"></el-table-column>
        <el-table-column prop="responsiblePersonName" label="负责人" min-width="90"></el-table-column>
        <el-table-column prop="responsiblePersonPhone" label="联系方式" min-width="110"></el-table-column>
        <el-table-column prop="serviceCompany" label="服务单位" min-width="80"></el-table-column>
        <el-table-column prop="projectCode" label="项目编号" min-width="100"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="100"></el-table-column>
        <el-table-column prop="contractCode" label="合同编号" min-width="120"></el-table-column>
        <el-table-column label="有效时间" min-width="200">
            <template slot-scope="scope">
                <span>{{scope.row.start}} </span> 至 <span> {{scope.row.end}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="contractPeriodType" label="合同期限类型" min-width="200"></el-table-column>
        <el-table-column prop="mechanismCode" label="组织机构代码" min-width="120"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
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
            <el-button
              class="T-R-B-Violet"
              size="mini"
              @click="seeSubRowClick()"
            >查看下属</el-button>
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
      title="添加劳务公司"
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
        <el-form-item prop="company" label="公司名称">
          <el-input v-model="addLabor.company"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonName" label="负责人">
          <el-input v-model="addLabor.responsiblePersonName"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonPhone" label="联系方式">
          <el-input v-model="addLabor.responsiblePersonPhone"></el-input>
        </el-form-item>
        <el-form-item prop="serviceCompany" label="服务单位">
          <el-input v-model="addLabor.serviceCompany"></el-input>
        </el-form-item>
        <el-form-item prop="projectCode" label="项目编号">
          <el-input v-model="addLabor.projectCode"></el-input>
        </el-form-item>
        <el-form-item prop="projectName" label="项目名称">
          <el-input v-model="addLabor.projectName"></el-input>
        </el-form-item>
        <el-form-item prop="contractCode" label="合同编号">
          <el-input v-model="addLabor.contractCode"></el-input>
        </el-form-item>
        <el-form-item label="有效时间" required>
          <el-col :span="11">
            <el-form-item prop="start">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="开始日期"
                v-model="addLabor.start"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-form-item prop="end">
              <el-date-picker
                type="date"
                :editable="false"
                placeholder="结束日期"
                v-model="addLabor.end"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop="contractPeriodType" label="合同期限类型">
          <el-select v-model="addLabor.contractPeriodType">
            <el-option label="固定期限合同" value="0"></el-option>
            <el-option label="以完成一定工作为期限的合同" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="corpCode" label="所属企业组织机构代码" class="labelWidth">
          <el-input v-model="addLabor.corpCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="F-Grey" round @click="cloneAddForm('addFormRef')">取消</el-button>
          <el-button class="F-Blue" round @click="addSubmitForm('addFormRef')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑劳务公司"
      width="450px"
      :visible.sync="editOpen"
      :close-on-click-modal="false"
      class="popupDialog"
    >
      <el-form ref="editFormRef" :rules="rulesForm" :model="editLabor" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="company" label="公司名称">
          <el-input v-model="editLabor.company"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonName" label="负责人">
          <el-input v-model="editLabor.responsiblePersonName"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonPhone" label="联系方式">
          <el-input v-model="editLabor.responsiblePersonPhone"></el-input>
        </el-form-item>
        <el-form-item prop="serviceCompany" label="服务单位">
          <el-input v-model="editLabor.serviceCompany"></el-input>
        </el-form-item>
        <el-form-item prop="projectCode" label="项目编号">
          <el-input v-model="editLabor.projectCode"></el-input>
        </el-form-item>
        <el-form-item prop="projectName" label="项目名称">
          <el-input v-model="editLabor.projectName"></el-input>
        </el-form-item>
        <el-form-item prop="contractCode" label="合同编号">
          <el-input v-model="editLabor.contractCode"></el-input>
        </el-form-item>
        <el-form-item label="有效时间" required>
          <el-col :span="11">
            <el-form-item prop="start">
              <el-date-picker type="date" :editable="false" placeholder="开始日期" v-model="editLabor.start" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="end">
              <el-date-picker type="date" :editable="false" placeholder="结束日期" v-model="editLabor.start" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop="contractPeriodType" label="合同期限类型">
          <el-select v-model="editLabor.contractPeriodType">
            <el-option label="固定期限合同" value="0"></el-option>
            <el-option label="以完成一定工作为期限的合同" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="corpCode" label="所属企业组织机构代码" class="labelWidth">
          <el-input v-model="editLabor.corpCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogTableVisible = false, submitForm('editLabor')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看下属 -->
    <el-dialog
      :visible.sync="seeBranch"
      :close-on-click-modal="false"
      top="140px"
      width="1400px"
    >
      <el-table :data="gridData" :header-cell-style="headClass">
        <el-table-column prop="company" label="劳务公司" min-width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="80"></el-table-column>
        <el-table-column prop="gender" label="性别" width="60"></el-table-column>
        <el-table-column prop="jobNumber" label="工号" min-width="110"></el-table-column>
        <el-table-column prop="place" label="籍贯" min-width="100"></el-table-column>
        <el-table-column prop="age" label="年龄" width="60"></el-table-column>
        <el-table-column prop="team" label="班组" width="130"></el-table-column>
        <el-table-column prop="jobType" label="工种" width="130"></el-table-column>
        <el-table-column prop="phone" label="手机号码" width="120"></el-table-column>
        <el-table-column prop="political" label="政治面貌" width="80"></el-table-column>
        <el-table-column prop="enterDate" label="进场日期" width="120"></el-table-column>
        <el-table-column prop="outDate" label="退场日期" width="120"></el-table-column>
      </el-table>
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
      tableData: [], // 初始化表格
      gridData: [], // 查看下属表格初始化
      addOpen: false,// 添加弹窗初始隐藏
      editOpen: false,// 编辑弹窗初始隐藏
      seeBranch: false,// 查看下属弹窗初始隐藏
      options: [{
          id: 1,
          name:'第一公司'
      }],
      // 添加劳务人员初始化
    //   addLabor: {
    //     company: "",
    //     responsiblePersonName: "",
    //     responsiblePersonPhone: "",
    //     serviceCompany: "",
    //     projectCode: "",
    //     projectName: "",
    //     contractCode: "",
    //     start: "",
    //     end: "",
    //     contractPeriodType: "",
    //     corpCode: ""
    //   },
    addLabor: {},
    editLabor: {},
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
        start: [
          { required: true, message: "请选择开始日期", trigger: "change" }
        ],
        end: [{ required: true, message: "请选择结束日期", trigger: "change" }],
        contractPeriodType: [
          { required: true, message: "请选择合同期限类型", trigger: "change" }
        ],
        corpCode: [
          { required: true, message: "请输入组织机构代码", trigger: "blur" }
        ]
      },
      rulesFormLabor: [],
      addUser: {},
      multipleSelection: [],
      screenForm: {
        company: "",
        responsiblePersonName: "",
        contractPeriodType: ""
      }
    };
  },
  created() {
    // 页面加载时获取用户信息
    this.getLocalStorage();
    this.getTable();
  },
  components: {},
  methods: {
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
            pageSize: this.pageSize,
            page: this.page
        });
        //请求
        var url =
            "/smart/worker/labour/" +
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
                start: "2019-10-10",
                end: "2020-10-09",
                contractPeriodType: "固定期限合同",
                mechanismCode: "354163831",
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
                start: "2019-10-02",
                end: "2020-10-05",
                contractPeriodType: "以完成一定工作为期限的合同",
                mechanismCode: "68461684",
                status: "未提交"
            },
            {
                id: 3,
                company: "第二公司",
                responsiblePersonName: "李四",
                responsiblePersonPhone: "13881234123",
                serviceCompany: "第二单位",
                projectCode: "558244568",
                projectName: "第二项目",
                contractCode: "HT654321",
                start: "2019-10-02",
                end: "2020-10-05",
                contractPeriodType: "以完成一定工作为期限的合同",
                mechanismCode: "68461684",
                status: "未提交"
            },
            {
                id: 4,
                company: "第二公司",
                responsiblePersonName: "李四",
                responsiblePersonPhone: "13881234123",
                serviceCompany: "第二单位",
                projectCode: "558244568",
                projectName: "第二项目",
                contractCode: "HT654321",
                start: "2019-10-02",
                end: "2020-10-05",
                contractPeriodType: "以完成一定工作为期限的合同",
                mechanismCode: "68461684",
                status: "未提交"
            },
            {
                id: 5,
                company: "第二公司",
                responsiblePersonName: "李四",
                responsiblePersonPhone: "13881234123",
                serviceCompany: "第二单位",
                projectCode: "558244568",
                projectName: "第二项目",
                contractCode: "HT654321",
                start: "2019-10-02",
                end: "2020-10-05",
                contractPeriodType: "以完成一定工作为期限的合同",
                mechanismCode: "68461684",
                status: "未提交"
            },
            {
                id: 6,
                company: "第二公司",
                responsiblePersonName: "李四",
                responsiblePersonPhone: "13881234123",
                serviceCompany: "第二单位",
                projectCode: "558244568",
                projectName: "第二项目",
                contractCode: "HT654321",
                start: "2019-10-02",
                end: "2020-10-05",
                contractPeriodType: "以完成一定工作为期限的合同",
                mechanismCode: "68461684",
                status: "未提交"
            },
            {
                id: 7,
                company: "第二公司",
                responsiblePersonName: "李四",
                responsiblePersonPhone: "13881234123",
                serviceCompany: "第二单位",
                projectCode: "558244568",
                projectName: "第二项目",
                contractCode: "HT654321",
                start: "2019-10-02",
                end: "2020-10-05",
                contractPeriodType: "以完成一定工作为期限的合同",
                mechanismCode: "68461684",
                status: "未提交"
            },
            {
                id: 8,
                company: "第二公司",
                responsiblePersonName: "李四",
                responsiblePersonPhone: "13881234123",
                serviceCompany: "第二单位",
                projectCode: "558244568",
                projectName: "第二项目",
                contractCode: "HT654321",
                start: "2019-10-02",
                end: "2020-10-05",
                contractPeriodType: "以完成一定工作为期限的合同",
                mechanismCode: "68461684",
                status: "未提交"
            },
            {
                id: 9,
                company: "第二公司",
                responsiblePersonName: "李四",
                responsiblePersonPhone: "13881234123",
                serviceCompany: "第二单位",
                projectCode: "558244568",
                projectName: "第二项目",
                contractCode: "HT654321",
                start: "2019-10-02",
                end: "2020-10-05",
                contractPeriodType: "以完成一定工作为期限的合同",
                mechanismCode: "68461684",
                status: "未提交"
            },
            {
                id: 10,
                company: "第二公司",
                responsiblePersonName: "李四",
                responsiblePersonPhone: "13881234123",
                serviceCompany: "第二单位",
                projectCode: "558244568",
                projectName: "第二项目",
                contractCode: "HT654321",
                start: "2019-10-02",
                end: "2020-10-05",
                contractPeriodType: "以完成一定工作为期限的合同",
                mechanismCode: "68461684",
                status: "未提交"
            },
            {
                id: 11,
                company: "第二公司",
                responsiblePersonName: "李四",
                responsiblePersonPhone: "13881234123",
                serviceCompany: "第二单位",
                projectCode: "558244568",
                projectName: "第二项目",
                contractCode: "HT654321",
                start: "2019-10-02",
                end: "2020-10-05",
                contractPeriodType: "以完成一定工作为期限的合同",
                mechanismCode: "68461684",
                status: "未提交"
            },
            {
                id: 12,
                company: "第二公司",
                responsiblePersonName: "李四",
                responsiblePersonPhone: "13881234123",
                serviceCompany: "第二单位",
                projectCode: "558244568",
                projectName: "第二项目",
                contractCode: "HT654321",
                start: "2019-10-02",
                end: "2020-10-05",
                contractPeriodType: "以完成一定工作为期限的合同",
                mechanismCode: "68461684",
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
            // console.log("获得id"+arrays[i].userId);
        }
        return ids;
        //  this.multipleSelection = val;
    },
    // 查询 
    onScreen() {
        var data = JSON.stringify(this.screenForm)
        this.http.post('/smart/worker/labour/1/company/management', data)
        .then(res => {
            console.log(res)
        })
    },
    // 添加
    addSubmitForm(addFormRef) {
      // 验证
      this.$refs[addFormRef].validate((valid) => {
        if (valid) {
            console.log(valid)
        //   this.addOpen = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      // 添加劳务人员请求
      var params = JSON.stringify({
        name: form.userName2,
        cellPhone: form.phone2,
        idNum: form.idNum,
        account: form.account,
        password: form.password2
      });
      this.http
        .post("smart/worker/labour/" + userId + "/company/management", params)
        .then(res => {
          if (res.code == 200) {
            this.$message("添加成功");
          }
        })
        .catch(res => {});
    },
    // 关闭添加弹窗
    cloneAddForm(addFormRef) {
      this.$refs[addFormRef].resetFields();
      this.addOpen = false;
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
    //  编辑
    editRowClick() {
        this.editOpen = true;
    },
    //  删除
    deleteRowClick() {
      this.$confirm("确定删除该员工信息吗？", {
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
    //  查看下属
    seeSubRowClick() {
        this.seeBranch = true;
        this.gridData = [
            {
                company: "上海虹桥医院",
                name: "刘备",
                gender: "男",
                jobNumber: "13518138",
                place: "天津市",
                age: "26",
                team: "第一班组",
                jobType: "电焊",
                phone: "13812345678",
                political: "团员",
                enterDate: "2020-01-07",
                outDate: "2020-05-08"
            },
            {
                company: "上海虹桥医院",
                name: "刘备",
                gender: "男",
                jobNumber: "13518138",
                place: "天津市",
                age: "26",
                team: "第一班组",
                jobType: "电焊",
                phone: "13812345678",
                political: "团员",
                enterDate: "2020-01-07",
                outDate: "2020-05-08"
            }
        ]
    },
    //  数据表格-表头样式
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
