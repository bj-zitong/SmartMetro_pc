<template>
  <div class="main-box">
    <!-- 筛选 -->
    <div class="R-L-S screen-form">
      <el-form :inline="true" ref="screenForm" :model="screenForm" class="screen-form-h">
        <el-form-item label="培训主题">
          <el-input v-model="screenForm.person" placeholder="请输入培训主题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onScreen">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="R-L-T table-main">
		<div style="margin-bottom: 30px;">
            <el-upload
                style="display:inline-block; margin-right: 10px;"
                class="upload-demo"
                action=""
                :show-file-list="false"
            >
                <el-button class="T-H-B-SkyBlue" type="primary" @click="uploadLowerTrainClick">上传</el-button>
            </el-upload>
			<el-button class="T-H-B-DarkBlue" @click="addStaffClick">新增</el-button>
			<el-button class="T-H-B-Grey" @click="deleteBatchClick">删除</el-button>
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
        <el-table-column prop="number" label="序号"></el-table-column>
        <el-table-column label="培训主题">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="培训人数">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="培训对象"></el-table-column>
        <el-table-column prop="company" label="培训部门/召集人" width="130"></el-table-column>
        <el-table-column prop="projectCode" label="主讲人"></el-table-column>
        <el-table-column prop="projectName" label="记录整理人"></el-table-column>
        <el-table-column prop="contractCode" label="培训时间"></el-table-column>
        <el-table-column prop="contractDate" label="培训地点" width="200"></el-table-column>
        <el-table-column prop="contractType" label="学时"></el-table-column>
        <el-table-column prop="mechanismCode" label="培训提纲"></el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <el-button
              class="T-R-B-BlackishGreen"
              size="mini"
              @click="downRowClick(scope.$index, scope.row)"
            >下载</el-button>
            <el-button
              class="T-R-B-Grey"
              size="mini"
              @click="deleteRowClick(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              class="T-R-B-Green"
              size="mini"
              @click="editRowClick(scope.$index, scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; padding-top:20px;">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
    <addTrain v-if="isTrain"></addTrain>
  </div>
</template>

<script>
import Utils from "../../../../assets/js/util.js";
import addTrain from "./add/add";
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
        addTrain
    },
	methods: {
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
        onScreen() {},
        //  新增培训记录
        addStaffClick() {
            isTrain: true
            console.log(Utils);
            Utils.$emit("addLowerTrain");
        },
        //  上传培训记录
        uploadQuestionsClick () {

        },
        //  批量删除
        deleteBatchClick() {
            this.$confirm("确定删除培训记录吗？", {
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
        //  表格操作
        //  编辑
        editRowClick () {

        },
        //  删除
        deleteRowClick () {
            this.$confirm("确定删除培训记录吗？", {
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
.el-table__row td{
    text-align: center;
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
