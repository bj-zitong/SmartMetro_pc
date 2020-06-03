<template>
    <div class="main-box">
        <!-- 主体 -->
        <el-container>
            <el-menu class="main-con-box">
                <div class="main-btn-box">
                    <el-button class="T-H-B-DarkBlue" @click="addClick">新增</el-button>
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
                    <el-table-column
                        type="selection"
                        fixed
                        prop="id"
                        @selection-change="handleSelectionChange"
                    ></el-table-column>
                    <el-table-column prop="name" label="设备名称" min-width="100"></el-table-column>
                    <el-table-column prop="deviceID" label="设备ID" min-width="80"></el-table-column>
                    <el-table-column prop="status" label="在线状态" min-width="100"></el-table-column>
                    <el-table-column prop="group" label="分组" min-width="100"></el-table-column>
                    <el-table-column label="操作" width="240" fixed="right">
                        <template slot-scope="scope">
                            <el-button
                                class="T-R-B-Green"
                                size="mini"
                                @click.native="editRowClick(scope.$index, scope.row)"
                            >编辑</el-button>
                            <el-button
                                class="T-R-B-Grey"
                                size="mini"
                                @click.native="deleteRowClick(scope.$index, scope.row)"
                            >删除</el-button>
                            <el-button
                                class="T-R-B-Orange"
                                size="mini"
                                @click.native="seeDetailsClick(scope.$index, scope.row)"
                            >详情</el-button>
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
        <!-- 添加 -->
        <el-dialog
        width="450px"
        class="popupDialog"
        :title="title"
        :visible.sync="dialogVisibleDevice"
        :close-on-click-modal="false"
        :center="true"
        :show-close="false"
        :hide-required-asterisk="true"
        >
            <el-form
                ref="refDevice"
                :rules="rulesForm"
                :model="formDevice"
                label-width="80px"
                class="demo-ruleForm"
            >
                <el-form-item prop="name" label="设备名称">
                    <el-input v-model="formDevice.name"></el-input>
                </el-form-item>
                <el-form-item prop="deviceID" label="设备ID">
                    <el-input v-model="formDevice.deviceID"></el-input>
                </el-form-item>
                <el-form-item prop="factory" label="生产厂家">
                    <el-input v-model="formDevice.factory"></el-input>
                </el-form-item>
                <el-form-item prop="date" label="生产日期">
                    <el-date-picker v-model="formDevice.data" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item prop="status" label="在线状态">
                    <el-input v-model="formDevice.status"></el-input>
                </el-form-item>
                <el-form-item prop="group" label="分组">
                    <el-input v-model="formDevice.group"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="F-Grey" round @click.native="cloneDeviceForm('refDevice')">取消</el-button>
                    <el-button class="F-Blue" round @click.native="submitDeviceForm('refDevice')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog
        width="100%"
        class="popupDialog"
        title="设备详情"
        :visible.sync="dialogVisibleDetails"
        :center="true"
        :hide-required-asterisk="true">
            <el-table :data="detailsData">
                <el-table-column property="name" label="设备名称"></el-table-column>
                <el-table-column property="DeviceID" label="设备ID"></el-table-column>
                <el-table-column property="factory" label="生产厂家"></el-table-column>
                <el-table-column property="data" label="生产日期"></el-table-column>
                <el-table-column property="status" label="在线状态"></el-table-column>
                <el-table-column property="group" label="分组"></el-table-column>
            </el-table>
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
            total:'',
            listQuery: {
                currentPage: 1,
                pageSize: 10
            },
            tableData: [],
            detailsData: [],
            dialogVisibleDevice: false,
            dialogVisibleDetails: false,
            title: "",
            formDevice: {
                name: "",
                deviceID: "",
                factory: "",
                date: "",
                status: "",
                group: ""
            },
            // 自定义表单验证
            rulesForm: {
                name: [
                    { required: true, message: "请输入设备名称", trigger: "blur" }
                ],
                deviceID: [
                    { required: true, message: "请输入设备ID", trigger: "blur" }
                ],
                factory: [
                    { required: true, message: "请输入生产厂家", trigger: "blur" }
                ],
                date: [
                    { required: true, message: "请选择生产日期", trigger: "change" }
                ],
                status: [
                    { required: true, message: "请选择在线状态", trigger: "change" }
                ],
                group: [
                    { required: true, message: "请选择分组", trigger: "change" }
                ]
            }
        }
    },
    activated() {
        this.getTable();
    },
    methods: {
        // 表格加载请求
        getTable() {
            let data = JSON.stringify({
                pageSize: this.listQuery.pageSize,
                page: this.listQuery.currentPage
            });
            //请求
            let url = "";
            this.http.post(url, data).then(res => {
                if (res.code == 200) {
                let total = res.total;
                let rows = res.rows;
                this.tableData = rows;
                this.total = total;
                }
            });
            let result = [
                {
                    id: 1,
                    name: "摄像机1",
                    deviceID: "21531",
                    status: "在线",
                    group: "分组一"
                },
                {
                    id: 2,
                    name: "摄像机2",
                    deviceID: "3231",
                    status: "离线",
                    group: "分组二"
                },
            ];
            this.tableData = result;
            this.total = result.length;
        },
        //获得表格前面选中的id值
        handleSelectionChange() {
            let ids = new Array();
            let arrays = this.$refs.multipleTable.selection;
            for (let i = 0; i < arrays.length; i++) {
                // 获得id
                let id = arrays[i].id;
                ids.push(id);
            }
            return ids;
        },
        //  添加/编辑 提交
        submitDeviceForm(refDevice) {
            // 验证
            this.$refs[refDevice].validate(valid => {
                if (valid) {
                let form = this.$refs[refDevice].model;
                // 判断id是否为空
                if (form.id == null) {
                    let url = "";
                    let data = JSON.stringify(this.formDevice);
                    this.http
                    .post(url, data)
                    .then(res => {
                        if (res.code == 200) {
                        this.$message({
                            type: "success",
                            message: "添加成功!"
                        });
                        }
                    })
                    .catch(res => {
                        return false;
                    });
                    this.dialogVisibleDevice = false;
                } else {
                    let url = "";
                    let data = JSON.stringify(this.formDevice);
                    this.http
                    .put(url, data)
                    .then(res => {
                        if (res.code == 200) {
                        this.$message({
                            type: "success",
                            message: "修改成功!"
                        });
                        }
                    })
                    .catch(res => {
                        return false;
                    });
                    this.dialogVisibleDevice = false;
                }
                this.cloneDeviceForm(refDevice);
                } else {
                return false;
                }
            });
        },

        //  新增/编辑   关闭
        cloneDeviceForm(refDevice) {
            this.$refs[refDevice].resetFields();
            Object.assign(this.$data.formDevice, this.$options.data().formDevice); // 初始化data
            this.dialogVisibleDevice = false;
        },
        //  新增劳务公司
        addClick() {
            this.title = "新增摄像机";
            this.dialogVisibleDevice = true;
        },
        //  编辑回显
        editRowClick(inedx, row) {
        this.title = "编辑摄像机";
        this.formDevice = JSON.parse(JSON.stringify(row));
        this.dialogVisibleDevice = true;
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
                let url = "";
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
        //  删除
        deleteRowClick(index, row) {
            let ids = [];
            ids.push(row.id);

            handleCofirm("确定删除吗？")
            .then(res => {
                let data = JSON.stringify(ids);
                let url = "";
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
        // 详情
        seeDetailsClick(index, row) {
            let ids = [];
            ids.push(row.id)
            let url = "";
            let data = JSON.stringify(ids);
            this.http.post(url, data)
            .then(res => {
                if(res.code == 200) {
                }else {
                    this.$message({
                        type:'error',
                        message:'访问失败，请稍后再试！'
                    })
                }
            })
            this.dialogVisibleDetails = true;
        },
        // 表头样式
        headClass() {
            return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
        }
    }
}
</script>
<style lang="stylus">

</style>
