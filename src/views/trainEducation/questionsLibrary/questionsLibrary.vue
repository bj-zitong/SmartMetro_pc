<template>
<!-- 试题库 -->
    <div class="main-box">
        <el-container>
            <el-menu class="main-con-box">
                <div class="main-btn-box">
                    <el-upload
                        class="upload"
                        :action="uploadUrl()"
                        :headers="headers()"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                    >
                        <el-button class="T-H-B-SkyBlue">上传</el-button>
                    </el-upload>
                    <el-button class="T-H-B-Grey" @click="deleteBatchClick">删除</el-button>
                    <el-button class="T-H-B-DarkGreen" @click="downBatchClick">下载</el-button>
                </div>
                <!-- 表格& -->
                <el-table
                ref="multipleTable"
                :data="tableData"
                stripe
                :header-cell-style="headClass"
                tooltip-effect="dark"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" prop="id"></el-table-column>
                    <el-table-column prop="paperTitle" label="试卷标题"></el-table-column>
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
            //  初始化页面
            page: 1, // 初始页
            pageSize: 10, // 默认每页数据量
            total: 0, //总条数
            tableData: [], // 初始化表格
        }
    },
    created(){
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
                    paperTitle: "钢筋工岗前测试试题二卷"
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
            }
            return ids;
        },
        // 上传action地址
        uploadUrl() {
            return "/smart/worker/train/1/item/upload"
        },
        // 上传请求头
        headers(){
            return {
                Authorization: sessionStorage.getItem('token')
            }
        },
        // 上传之前触发 点击提交时
        beforeUpload(file) {
            // 这里做一些判断，现在上传类型未定
        },
        // 上传成功触发
        uploadSuccess(response, file, fileList) {
            this.$message({
                type: "success",
                message: "上传成功"
            })
            this.getTable();
        },
        // 上传失败触发
        uploadError(err, file, fileList) {
            this.$message({
                type: "error",
                message: "上传失败"
            })
        },
        //  批量删除
        deleteBatchClick() {
            var ids = this.handleSelectionChange();
            if (ids.length <= 0) {
                this.$message("请选择删除的数据！");
                return;
            }
            handleCofirm("确定删除吗？")
            .then(res => {
                let data = JSON.stringify(ids);
                let url =
                    "/smart/worker/train/" +
                    sessionStorage.getItem("userId") +
                    "/item";
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
        //  批量下载
        downBatchClick (){
            let ids = this.handleSelectionChange();
            if (ids.length <= 0) {
                this.$message("请选择下载的数据！");
                return;
            }
            let params = null;
            let url =
                "/smart/worker/train/" +
                sessionStorage.getItem("userId") +
                "/common/"+ ids +"/download";
            this.http.get(url, params).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: "下载成功!"
                    });
                }
            })
        },
        //  下载
        downRowClick (index, row) {
            let ids = [];
            ids.push(row.id)
            let params = null;
            let url =
                "/smart/worker/train/" +
                sessionStorage.getItem("userId") +
                "/common/"+ ids +"/download";
            this.http.get(url, params).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: "下载成功!"
                    });
                }
            })
        },
        //  删除
        deleteRowClick(index, row) {
            let ids = [];
            ids.push(row.id)

            handleCofirm("确定删除该员工信息吗？")
            .then(res => {
                let data = JSON.stringify(ids);
                let url =
                    "/smart/worker/train/" +
                    sessionStorage.getItem("userId") +
                    "/item";
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
        //  下发
        grantRowClick () {
            alert('等一下')
        },
        //  数据表格-表头样式
        headClass() {
            return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
        }
    }
};
</script>