<template>
<!-- 线下 -->
    <div class="main-box">
        <!-- 头部 -->
        <el-container>
            <!-- 筛选 -->
            <el-menu class="main-top-box pl30">
            <el-form :inline="true" ref="screenForm" :model="screenForm">
                <el-form-item label="培训主题">
                    <el-input v-model="screenForm.trainingName" placeholder="请输入培训主题"></el-input>
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
                    <el-button class="T-H-B-DarkBlue" @click="addClick">新增</el-button>
                    <el-button class="T-H-B-Grey" @click="deleteBatchClick">删除</el-button>
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
                    <el-table-column prop="uuid" label="编号"></el-table-column>
                    <el-table-column prop="pTrainingId" label="培训主题"></el-table-column>
                    <el-table-column prop="trainAmount" label="培训人数"></el-table-column>
                    <el-table-column prop="trainObject" label="培训对象"></el-table-column>
                    <el-table-column prop="trainDepartment" label="培训部门/召集人"></el-table-column>
                    <el-table-column prop="trainer" label="主讲人"></el-table-column>
                    <el-table-column prop="trimmer" label="记录整理人"></el-table-column>
                    <el-table-column prop="trainingDate" label="培训时间"></el-table-column>
                    <el-table-column prop="trainAddress" label="培训地点"></el-table-column>
                    <el-table-column prop="trainDuration" label="学时"></el-table-column>
                    <el-table-column prop="description" label="培训提纲"></el-table-column>
                    <el-table-column label="操作" width="240" fixed="right">
                    <template slot-scope="scope">
                        <!-- <el-button
                        class="T-R-B-BlackishGreen"
                        size="mini"
                        @click="downRowClick(scope.$index, scope.row)"
                        >下载</el-button> -->
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
    <!-- 添加& -->
        <el-dialog
            width="450px"
            class="popupDialog abow_dialog"
            :title="titleTrain"
            :visible.sync="dialogVisibleTrain"
            :close-on-click-modal="false"
            :center="true"
            :show-close="false"
            :hide-required-asterisk="true"
        >
            <el-form
                ref="refTrain"
                class="demo-ruleForm"
                label-width="80px"
                :rules="rulesForm"
                :model="formTrain"
            >
                <el-form-item prop="pTrainingId" label="培训主题" :required="true">
                    <el-input v-model="formTrain.pTrainingId"></el-input>
                </el-form-item>
                <el-form-item prop="trainAmount" label="培训人数" :required="true">
                    <el-input v-model="formTrain.trainAmount"></el-input>
                </el-form-item>
                <el-form-item prop="trainObject" label="培训对象" :required="true">
                    <el-input v-model="formTrain.trainObject"></el-input>
                </el-form-item>
                <el-form-item prop="trainDepartment" label="培训部门/召集人" :required="true">
                    <el-input v-model="formTrain.trainDepartment"></el-input>
                </el-form-item>
                <el-form-item prop="trainer" label="主讲人" :required="true">
                    <el-input v-model="formTrain.trainer"></el-input>
                </el-form-item>
                <el-form-item prop="trimmer" label="记录整理人" :required="true">
                    <el-input v-model="formTrain.trimmer"></el-input>
                </el-form-item>
                <el-form-item prop="trainingDate" label="培训时间" :required="true">
                    <el-date-picker
                        v-model="formTrain.trainingDate"
                        type="datetime"
                        style="width: 100%;"
                        :editable="false"
                        placeholder="选择培训时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="trainAddress" label="地点" :required="true">
                    <el-input v-model="formTrain.trainAddress"></el-input>
                </el-form-item>
                <el-form-item prop="trainDuration" label="学时" :required="true">
                    <el-input v-model="formTrain.trainDuration"></el-input>
                </el-form-item>
                <el-form-item prop="description" label="培训提纲" :required="true">
                    <el-input v-model="formTrain.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="F-Grey" round @click.native="cloneTrainForm('refTrain')">取消</el-button>
                    <el-button class="F-Blue" round @click.native="submiTraintForm('refTrain')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
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
            dialogVisibleTrain: false,
            tableData: [],
            screenForm: {
                trainingName: ""
            },
            titleTrain:'',
            formTrain:{
                id:null,
                pTrainingId: '',
                trainAmount: '',
                trainObject: '',
                trainDepartment: '',
                trainer: '',
                trimmer: '',
                trainingDate: '',
                trainAddress: '',
                trainDuration: '',
                description: ''
            },
            // 自定义表单验证
            rulesForm: {
                pTrainingId: [
                    { required: true, message: "请输入培训主题", trigger: "blur" }
                ],
                trainAmount: [
                    { required: true, message: "请输入培训人数", trigger: "blur" }
                ],
                trainObject: [
                    { required: true, message: "请输入培训对象", trigger: "blur" }
                ],
                trainDepartment: [
                    { required: true, message: "请输入部门/召集人", trigger: "blur" }
                ],
                trainer: [
                    { required: true, message: "请输入主讲人", trigger: "blur" }
                ],
                trimmer: [
                    { required: true, message: "请输入记录整理人", trigger: "blur" }
                ],
                trainingDate: [
                    { required: true, message: "请选择培训时间", trigger: "change" }
                ],
                trainAddress: [
                    { required: true, message: "请输入培训地点", trigger: "blur" }
                ],
                trainDuration: [
                    { required: true, message: "请选择培训学时", trigger: "blur" }
                ],
                description: [
                    { required: true, message: "请输入培训提纲", trigger: "blur" }
                ]
            }
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
                "/record/management";
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
                    pTrainingId: '安全培训1',
                    trainAmount: '50',
                    trainObject: '安保部门',
                    trainDepartment: '张三',
                    trainer: '李四',
                    trimmer: '王五',
                    trainingDate: '2020-05-20 17:17:17',
                    trainAddress: '北京房山',
                    trainDuration: '4',
                    description: '主讲安全培训'
                },
                {
                    pTrainingId: '安全培训2',
                    trainAmount: '51',
                    trainObject: '安保部门',
                    trainDepartment: '张三',
                    trainer: '李四',
                    trimmer: '王五',
                    trainingDate: '2020-05-20 17:17:17',
                    trainAddress: '北京房山',
                    trainDuration: '4',
                    description: '主讲安全培训'
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
        // 查询
        onScreen() {
            let data = JSON.stringify(this.screenForm);
            this.http
                .post("/smart/worker/train/"+ sessionStorage.getItem("userId") +"/record/management", data)
                .then(res => {
                console.log(res);
            });
        },

//  添加/编辑 提交
        submiTraintForm(refTrain) {
            // 验证
            this.$refs[refTrain].validate(valid => {
                if (valid) {
                    let form = this.$refs[refTrain].model;
                    // 判断id是否为空
                    if(form.id == null) {
                        let data = JSON.stringify(this.formTrain);
                        this.http
                            .post("smart/worker/train/1/record", data)
                            .then(res => {
                                if (res.code == 200) {
                                    this.$message({
                                    type: "success",
                                    message: "添加成功!"
                                    });
                                }
                            })
                            .catch(res => {
                                console.log('error!')
                                return false
                            });
                        this.dialogVisibleLabor = false;
                    } else {
                        let data = JSON.stringify(this.formTrain);
                        this.http
                            .put("smart/worker/train/1/record", data)
                            .then(res => {
                                if (res.code == 200) {
                                    this.$message({
                                    type: "success",
                                    message: "修改成功!"
                                    });
                                }
                            })
                            .catch(res => {
                                console.log('error!')
                                return false
                            });
                        this.dialogVisibleLabor = false;
                    }
                    this.cloneTrainForm(refTrain);
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

//  新增/编辑   关闭
        cloneTrainForm(refTrain) {
            this.dialogVisibleTrain = false;
            this.$refs[refTrain].resetFields();
            Object.assign(this.$data.formTrain, this.$options.data().formTrain) // 初始化data
        },
//  新增劳务公司
        addClick() {
            this.titleTrain = '新增培训记录'
            this.dialogVisibleTrain = true
        },
//  编辑回显
        editRowClick(inedx, row) {
            this.titleTrain = '编辑培训记录'
            this.formTrain = JSON.parse(JSON.stringify(row))
            this.dialogVisibleTrain = true;
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
                    "/record";
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
        // 下载
        downRowClick(index, row){
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
        // 删除
        deleteRowClick(index, row) {
            let ids = [];
            ids.push(row.id);
            handleCofirm("确定删除吗？")
            .then(res => {
                let data = JSON.stringify(ids);
                let url =
                    "/smart/worker/train/" +
                    sessionStorage.getItem("userId") +
                    "/record";
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
