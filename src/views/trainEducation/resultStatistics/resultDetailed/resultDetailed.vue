<template>
  <div class="main-box">
    <!-- 筛选 -->
    <div class="R-L-S screen-form">
      <el-form :inline="true" ref="screenForm" :model="screenForm" class="screen-form-h">
        <el-form-item label="姓名：">
          <el-input placeholder="请输入姓名"></el-input>
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
                <el-button class="T-H-B-SkyBlue" type="primary" @click="uploadQuestionsClick">上传</el-button>
            </el-upload>
            <el-button class="T-H-B-Grey" @click="deleteBatchClick">删除</el-button>
            <el-button class="T-H-B-DarkGreen" @click="downBatchClick">下载</el-button>
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
        <el-table-column prop="ranking" label="名次"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="labour" label="劳务单位"></el-table-column>
        <el-table-column prop="team" label="所在班组"></el-table-column>
        <el-table-column prop="major" label="工种"></el-table-column>
        <el-table-column prop="trainType" label="培训类型"></el-table-column>
        <el-table-column prop="fraction" label="分数"></el-table-column>
        <el-table-column prop="testDate" label="考试时间" width="180"></el-table-column>
        <el-table-column prop="testPaper" label="试卷"></el-table-column>
        <el-table-column label="关联闸机" fixed="right">
          <template slot-scope="gate">
            <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeSwitch(gate.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button
              class="T-R-B-Green"
              size="mini"
              @click="editRowClick(scope.$index, scope.row)"
            >填写分数</el-button>
            <el-button
              class="T-R-B-Grey"
              size="mini"
              @click="deleteRowClick(scope.$index, scope.row)"
            >下载试卷</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; padding-top:20px;">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        value: true,
		tableData: [
        {
			ranking: "1",
			name: "张三",
			labour: "第一单位",
			team: "第一班组",
            major: "电焊工",
            trainType: "岗前培训",
            fraction: '79',
            testDate: '2020-05-07 09:10:00',
            testPaper: '试卷'
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
	methods: {
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
        onScreen() {},
        uploadQuestionsClick () {

        },
        deleteBatchClick () {

        },
        downBatchClick () {

        },
        //  表格操作
        
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
