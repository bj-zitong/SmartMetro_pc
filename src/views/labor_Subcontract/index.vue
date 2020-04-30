<template>
  <div class="main-box">
    <!-- 筛选 -->
    <div class="R-L-S screen-form">
      <el-form :inline="true" ref="screenForm" :model="screenForm" class="screen-form-h">
        <el-form-item label="劳务分包：">
          <el-select v-model="screenForm.grouping" placeholder="请选择分组">
            <el-option label="劳务分包一组" value="shanghai"></el-option>
            <el-option label="劳务分包二组" value="beijing"></el-option>
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
        :header-cell-style="headClass"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="公司名称">
          <template slot-scope="scope">{{ scope.row.date }}</template>
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
              @click="downRowClick(scope.$index, scope.row)"
            >查看下属</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; padding-top:20px;">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
    <addDia v-if="isCreate"></addDia>
  </div>
</template>

<script>
import Utils from "../../assets/js/util.js";
import addDia from "./add/add";
export default {
  data() {
    return {
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
    components: {
        addDia
    },
	methods: {
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
        onScreen() {},
        addStaffClick() {
            isCreate: true
            console.log(Utils);
            Utils.$emit("demo");
        },
        //  批量删除
        deleteBatchClick() {
            this.$confirm("确定删除该员工信息吗？", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: 'detDel',
                cancelButtonClass: 'cancelClone',
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
                confirmButtonClass: 'detDel',
                cancelButtonClass: 'cancelClone',
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
        //  下载
        downRowClick () {

        },
        headClass() {
            return "text-align: center; height: 60px; background:rgba(0,88,162,1);";
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
.el-message-box{
	width:350px;
	height:200px;
	background:rgba(255,255,255,1);
	opacity:1;
	border-radius:10px;
}
.el-message-box__content{
	margin-bottom : 25px;
}
.detDel{
	background:linear-gradient(180deg,rgba(54,130,243,1) 0%,rgba(0,88,162,1) 100%);
}
.el-message-box__btns button:nth-child(2) {
	margin-left: 56px;
}
.cancelClone{
	background:linear-gradient(180deg,rgba(225,225,225,1) 0%,rgba(190,190,190,1) 100%);
}
</style>
