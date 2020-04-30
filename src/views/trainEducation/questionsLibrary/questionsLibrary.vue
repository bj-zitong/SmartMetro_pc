<template>
<!-- 试题库 -->
<div class="main-box">
    <div class="min-box">
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
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="公司名称">
            <template slot-scope="scope">{{ scope.row.content }}</template>
            </el-table-column>
            <el-table-column label="操作">
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
                    class="T-R-B-DarkViolet"
                    size="mini"
                    @click="grantRowClick(scope.$index, scope.row)"
                    >下发</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center; padding-top:20px;">
            <el-pagination background layout="prev, pager, next"></el-pagination>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
		tableData: [
        {
			content: "钢筋工岗前测试试题二卷",
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
        
    },
	methods: {
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
        onScreen() {},
        //  上传
        uploadQuestionsClick() {
            
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
        //  批量下载
        downBatchClick (){

        },
        //  数据表格-表头样式
        headClass() {
            return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
        },
        //  下载
        downRowClick () {

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
        //  下发
        grantRowClick () {

        }
    }
};
</script>

<style lang="stylus" scoped>
.min-box {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
    opacity: 1;
    border-radius: 10px;
    padding: 38px 30px;
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