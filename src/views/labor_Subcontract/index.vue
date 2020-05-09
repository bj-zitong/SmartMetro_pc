<template>
  <div class="main-box">
    <!-- 筛选 -->
    <div class="R-L-S screen-form">
      <el-form :inline="true" ref="screenForm" :model="screenForm" class="screen-form-h">
        <el-form-item label="劳务公司：">
          <el-select v-model="screenForm.grouping" placeholder="请选择劳务公司">
            <el-option label="劳务公司1" value="shanghai"></el-option>
            <el-option label="劳务公司2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人：">
          <el-input v-model="screenForm.person" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="合同类型：">
          <el-select v-model="screenForm.type" placeholder="请选择合同类型">
            <el-option label="劳务分包" value="shanghai"></el-option>
            <el-option label="专业分包" value="beijing"></el-option>
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
			<el-button class="T-H-B-DarkBlue" @click="addStaffClick">新增</el-button>
			<el-button class="T-H-B-Grey" @click="deleteBatchClick">删除</el-button>
			<el-button class="T-H-B-Cyan" @click="exportStaffClick">导出</el-button>
            <el-upload
                style="display:inline-block; margin-left: 10px;"
                class="upload-demo"
                action=""
                :show-file-list="false"
            >
			    <el-button class="T-H-B-Cyan" type="primary" @click="importStaffClick">导入</el-button>
            </el-upload>
		</div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        border
        :header-cell-style="headClass"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="公司名称">
          <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="负责人">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="company" label="服务单位"></el-table-column>
        <el-table-column prop="projectCode" label="项目编号"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="contractCode" label="合同编号"></el-table-column>
        <el-table-column prop="contractDate" label="合同期限" width="200"></el-table-column>
        <el-table-column prop="contractType" label="合同类型"></el-table-column>
        <el-table-column prop="mechanismCode" label="组织机构代码"></el-table-column>
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
              @click="dialogTableVisible = true, seeSubRowClick(scope.$index, scope.row)"
            >查看下属</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; padding-top:20px;">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
    <addLabor v-if="isCreate"></addLabor>

    <!-- 查看下属 -->
    <el-dialog
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      top="140px"
      width="1400px"
    >
      <el-table
      :data="gridData"
      :header-cell-style="headClass"
      border
      >
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
import Utils from "../../assets/js/util.js";
import addLabor from "./add/add";
export default {
    data() {
        return {
        //  初始化页面 
        gridData: [{
          company: '上海虹桥医院',
          name: '刘备',
          gender: '男',
          jobNumber: '13518138',
          place: '天津市',
          age: '26',
          team: '第一班组',
          jobType: '电焊',
          phone: '13812345678',
          political: '团员',
          enterDate: '2020-01-07',
          outDate: '2020-05-08',
        },{
          company: '上海虹桥医院',
          name: '刘备',
          gender: '男',
          jobNumber: '13518138',
          place: '天津市',
          age: '26',
          team: '第一班组',
          jobType: '电焊',
          phone: '13812345678',
          political: '团员',
          enterDate: '2020-01-07',
          outDate: '2020-05-08',
        },
        {
          company: '上海虹桥医院',
          name: '刘备',
          gender: '男',
          jobNumber: '13518138',
          place: '天津市',
          age: '26',
          team: '第一班组',
          jobType: '电焊',
          phone: '13812345678',
          political: '团员',
          enterDate: '2020-01-07',
          outDate: '2020-05-08',
        },
        {
          company: '上海虹桥医院',
          name: '刘备',
          gender: '男',
          jobNumber: '13518138',
          place: '天津市',
          age: '26',
          team: '第一班组',
          jobType: '电焊',
          phone: '13812345678',
          political: '团员',
          enterDate: '2020-01-07',
          outDate: '2020-05-08',
        }],
        dialogTableVisible: false,
        isCreate: false,//  初始化隐藏添加弹窗
            tableData: [
            {
                date: "第一公司",
                name: "张三",
                phone: "13888779977",
                company: "第一单位",
                projectCode: "007124241",
                projectName: "第一项目",
                contractCode: "HT123456",
                contractDate: "2019-10-10 - 2020-10-09",
                contractType: "专业分包",
                mechanismCode: "354163831",
                status: "未提交"
            }
            ],
            multipleSelection: [],
            screenForm: {
                grouping: "",
                person: "",
                type: ""
            }
        };
    },
    created() {
        this.getLocalStorage()
    },
    components: {
        addLabor
    },
	methods: {
        getLocalStorage() {
            this.username = window.localStorage.getItem('username');
            this.userId = window.localStorage.getItem('userId');
            this.admin = window.localStorage.getItem('admin');
            this.token = window.localStorage.getItem('token');
        },
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
        onScreen() {},
        addStaffClick() {
            this.isCreate = true
            Utils.$emit("addLabor");
        },
        //  批量删除
        deleteBatchClick() {
            this.$confirm("确定删除该员工信息吗？", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true,
                roundButton: true
            })
            .then(res => {
                this.$message({
                    type: "success",
                    message: res
                });
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },
        //  导出    
        exportStaffClick () {

        },
        //  导入
        importStaffClick () {

        },
        //  表格操作
        //  编辑
        editRowClick () {

        },
        //  删除
        deleteRowClick () {
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
        seeSubRowClick () {

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

<style lang="stylus">

</style>
