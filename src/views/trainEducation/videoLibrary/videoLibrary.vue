<template>
    <div class="main-box">
<!-- 头部 -->
        <el-container>
            <!-- 筛选 -->
            <el-menu class="main-top-box">
                <el-form :inline="true" ref="screenForm" :model="screenForm">
                    <el-form-item label="视频类型：">
                        <el-select v-model="screenForm.grouping" placeholder="请选择类型">
                            <el-option label="视频类型1" value="0"></el-option>
                            <el-option label="视频类型2" value="1"></el-option>
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
                    <el-upload
                        class="upload"
                        action=""
                        :show-file-list="false"
                    >
                        <el-button class="T-H-B-SkyBlue" type="primary" @click="uploadQuestionsClick">上传</el-button>
                    </el-upload>
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
                    <el-table-column type="selection" prop="id" fixed></el-table-column>
                    <el-table-column prop="videoType" label="视频类型"></el-table-column>
                    <el-table-column prop="video" label="视频"></el-table-column>
                    <el-table-column prop="uploadPeople" label="上传者"></el-table-column>
                    <el-table-column prop="establishTime" label="创建时间"></el-table-column>
                    <el-table-column label="操作" width="150" fixed="right">
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1, // 初始页
            pageSize: 10, // 默认每页数据量
            total: 0, //总条数
            tableData: [], // 初始化表格
            screenForm: { // 筛选
                grouping: "",
                person: "",
                type: ""
            }
        }
    },
    created() {
        // 页面加载时获取信息
        this.getTable();
    },
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
                videoType: ".mp4",
                video: "Vue.mp4",
                uploadPeople: "尤",
                establishTime: "2020-05-02 17:24:19"
                },
                {
                id: 2,
                videoType: ".mp4",
                video: "美食.mp4",
                uploadPeople: "张三",
                establishTime: "2020-05-08 10:12:25"
                }
            ];
            this.tableData = result;
            this.total = result.length;
        },
//获得表格前面选中的id值
        handleSelectionChange() {
            var ids = new Array();
            var arrays = this.$refs.multipleTable.selection;
            console.log(arrays)
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
            let data = JSON.stringify(this.screenForm);
            this.http
                .post("/smart/worker/labour/1/company/management", data)
                .then(res => {
                console.log(res);
            });
        },
        uploadQuestionsClick () {

		},
//批量删除
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
        //  表格操作
        //  下载
        downRowClick () {

        },
//删除
        deleteRowClick(index, row) {
            let ids = [];
            ids.push(row.id)

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
