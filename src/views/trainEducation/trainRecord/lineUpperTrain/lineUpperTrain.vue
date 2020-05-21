<template>
<!-- 线上 -->
  <div class="main-box">
    <!-- 头部 -->
        <el-container>
            <!-- 筛选 -->
            <el-menu class="main-top-box">
                <el-form :inline="true" ref="screenForm" :model="screenForm">
                    <el-form-item label="培训类型：">
                        <el-input v-model="screenForm.trainingType" placeholder="请输入培训类型"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onScreen">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-menu>
        </el-container>
    <!-- 表格 -->
    <el-container>
        <el-menu class="main-con-box">
            <div class="main-btn-box">
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
                <el-table-column prop="trainTyle" label="培训类型"></el-table-column>
                <el-table-column prop="name" label="姓名" width="130"></el-table-column>
                <el-table-column prop="jobNumber" label="工号"></el-table-column>
                <el-table-column prop="team" label="班组"></el-table-column>
                <el-table-column prop="major" label="工种"></el-table-column>
                <el-table-column prop="trainTime" label="培训时长"></el-table-column>
                <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        class="T-R-B-Grey"
                        size="mini"
                        @click="deleteRowClick(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <!-- 分页& -->
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
  </div>
</template>

<script>

import { handleCofirm } from "@/utils/confirm";

export default {
  data() {
    return {
		tableData: [],
		screenForm: {
            trainingType: ''
		}
    };
	},
	methods: {
		handleSelectionChange(val) {
            
		},
        onScreen() {},
        //  批量删除
        deleteBatchClick() {
            this.$confirm("确定删除培训视频吗？", {
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
