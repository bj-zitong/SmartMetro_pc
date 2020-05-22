<template>
    <!-- 人管智慧管理-培训教育-视频库 -->
    <div class="main-box">
        <!-- 头部 -->
        <el-container>
            <!-- 筛选 -->
            <el-menu class="main-top-box">
                <el-form :inline="true" ref="screenForm" :model="screenForm">
                <el-form-item label="视频类型：">
                    <el-select v-model="screenForm.videoType" placeholder="请选择类型">
                    <el-option
                        v-for="item in videoTypes"
                        :key="item.index"
                        :label="item.label"
                        :value="item.index"
                    ></el-option>
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
                    accept=".qlv, .mp4, .qsv, .ogg, .flv, .avi, .wmv, .rmvb"
                    :action="uploadUrl()"
                    :data="uploadData()"
                    :headers="headers()"
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                >
                    <el-button class="T-H-B-SkyBlue">上传</el-button>
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
    </div>
</template>

<script>

import { handleCofirm } from "@/utils/confirm";
import Pagination from "@/components/pagination";

export default {
    components: {
        Pagination
    },
    data() {
        return {
            listQuery: {
                currentPage: 1, //与后台定义好的分页参数
                pageSize: 10
            },
            tableData: [], // 初始化表格
            screenForm: {
                videoType: ""
            },
            videoTypes: [
                { index: 1, label: "mp41" },
                { index: 2, label: "mp42" },
                { index: 3, label: "mp43" }
            ]
        };
    },
    created() {
        // 页面加载时获取信息
        this.getTable();
    },
    methods: {
        // 表格加载请求
        getTable() {
            var data = JSON.stringify({
                pageSize: this.pageSize,
                page: this.page
            });
            //请求
            var url =
                "/smart/worker/train/" +
                sessionStorage.getItem("userId") +
                "/video/management";
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
        console.log(arrays);
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
                "/smart/worker/train/" +
                sessionStorage.getItem("userId") +
                "/video/management";
            this.http.post(url, data).then(res => {
                console.log(res);
            });
        },
        // 上传action地址
        uploadUrl() {
            return (
                "/smart/worker/train/" +
                sessionStorage.getItem("userId") +
                "/video/upload"
            );
        },
        // 上传请求头
        headers() {
            return {
                Authorization: sessionStorage.getItem("token")
            };
        },
        // 传参
        uploadData() {
            return {
                videoType: "视频类型1"
            };
        },
        // 上传之前触发 点击提交时
        beforeUpload(file) {
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                this.$message.error("上传视频大小不能超过10MB哦!");
                return false;
            }
        },
        // 上传成功触发
        uploadSuccess(response, file, fileList) {
        this.$message({
            type: "success",
            message: "上传成功"
        });
        this.getTable();
        },
        // 上传失败触发
        uploadError(err, file, fileList) {
        this.$message({
            type: "error",
            message: "上传失败"
        });
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
                "/smart/worker/train/" +
                sessionStorage.getItem("userId") +
                "/video";
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
        downRowClick(index, row) {
            let params = null;
            let url = "/smart/worker/train/"+
                    sessionStorage.getItem("userId")+
                    "/common/" + row.id + "/download";
            this.http.get(url, params)
            .then(res => {
                if (res.data == 200) {
                    this.$message({
                    type: "success",
                    message: "下载成功"
                    });
                }
            })
            .catch(err => {
                this.$message({
                    type: "success",
                    message: "下载失败"
                });
            });
        },
        //删除
        deleteRowClick(index, row) {
        let ids = [];
        ids.push(row.id);

        handleCofirm("确定删除吗？")
            .then(res => {
            var data = JSON.stringify(ids);
            var url =
                "/smart/worker/train/" +
                sessionStorage.getItem("userId") +
                "/video";
            this.http.delete(url, data).then(res => {
                if (res.code == 200) {
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
.el-message-box {
  width: 350px;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-radius: 10px;
}

.el-message-box__content {
  margin-bottom: 25px;
}

.el-table__row td {
  text-align: center;
}

.detDel {
  background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
}

.el-message-box__btns button:nth-child(2) {
  margin-left: 56px;
}

.cancelClone {
  background: linear-gradient(180deg, rgba(225, 225, 225, 1) 0%, rgba(190, 190, 190, 1) 100%);
}
</style>
