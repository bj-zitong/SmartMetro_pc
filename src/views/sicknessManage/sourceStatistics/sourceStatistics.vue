<template>
    <div class="main-box">
        <el-container>
            <el-menu class="main-top-box pl30">
                <el-form :inline="true" ref="screenForm" :model="screenForm">
                    <el-form-item label="风险程度：">
                    <el-select v-model="screenForm.degree" placeholder="请选择">
                        <el-option label="低" value="0"></el-option>
                        <el-option label="中" value="1"></el-option>
                        <el-option label="高" value="2"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="返场日期：">
                        <el-date-picker
                            v-model="screenForm.returnDate"
                            type="date"
                            placeholder="选择日期"
                            :editable="false"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onScreen">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-menu>
        </el-container>
        <el-container>
            <el-menu class="main-con-box">
<!-- 按钮 -->
                <div class="main-btn-box">
                    <el-button class="T-H-B-Grey" @click="deleteBatchClick">删除</el-button>
                    <el-button class="T-H-B-Cyan" @click="exportStaffClick">导出</el-button>
                    <el-upload
                    class="upload"
                    action
                    :show-file-list="false"
                    >
                    <el-button class="T-H-B-Cyan" type="primary" @click="importStaffClick(this)">导入</el-button>
                    </el-upload>
                    <el-button class="T-H-B-Cyan" @click="submitBatchClick">提交</el-button>
                </div>
<!-- 表格 -->
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    :header-cell-style="headClass"
                    tooltip-effect="dark"
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column prop="id" type="selection" fixed @selection-change="handleSelectionChange"></el-table-column>
                    <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
                    <el-table-column prop="belongLabor" label="所属劳务队" min-width="90"></el-table-column>
                    <el-table-column prop="profession" label="工种" min-width="110"></el-table-column>
                    <el-table-column prop="nativePlace" label="籍贯" min-width="80"></el-table-column>
                    <el-table-column prop="todayTem" label="今日体温" min-width="80"></el-table-column>
                    <el-table-column prop="bjReturn" label="返京地" min-width="80"></el-table-column>
                    <el-table-column prop="bjRiskdegree" label="返京地风险程度" min-width="120"></el-table-column>
                    <el-table-column prop="address" label="暂住地址" min-width="100"></el-table-column>
                    <el-table-column prop="barrier" label="隔离情况" min-width="100"></el-table-column>
                    <el-table-column prop="returnDate" label="返场时间" min-width="100"></el-table-column>
                    <el-table-column prop="status" label="状态" min-width="80"></el-table-column>
                    <el-table-column prop="createDate" label="创建日期" min-width="100"></el-table-column>
                    <el-table-column label="操作" width="320" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            class="T-R-B-Green"
                            size="mini"
                            @click="editOpen = true, editRowClick(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            class="T-R-B-Grey"
                            size="mini"
                            @click="deleteRowClick(scope.$index, scope.row)"
                        >删除</el-button>
                        <el-button
                            class="T-R-B-Cyan"
                            size="mini"
                            @click="submitRowClick(scope.$index, scope.row)"
                        >提交</el-button>
                        <el-button
                            class="T-R-B-Orange"
                            size="mini"
                            @click="seeDetailsRowClick(scope.$index, scope.row)"
                        >查看详情</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                    <el-pagination
                        class="pagination-box"
                        background
                        layout="total, prev, pager,next"
                        :page-size="pageSize"
                        :current-page="page"
                        :total="total"
                        @prev-click="prev"
                        @next-click="next"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    >
                    </el-pagination>
            </el-menu>
        </el-container>

<!-- 编辑 -->
        <el-dialog
        title="编辑来源地统计"
        width="450px"
        :visible.sync="editOpen"
        :close-on-click-modal="false"
        class="popupDialog"
        :center="true"
        >
            <el-form
                ref="editFormRef"
                :rules="rulesForm"
                :model="editSource"
                label-width="120px"
                class="demo-ruleForm"
            >
                <el-form-item prop="name" label="姓名">
                    <el-input v-model="editSource.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item prop="belongLabor" label="所属劳务队">
                    <el-select v-model="editSource.belongLabor" placeholder="请选择所属劳务队">
                        <el-option v-for="(item, index) in editSource.belongLabor" :key="index" label="item.name" value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="profession" label="工种">
                    <el-select v-model="editSource.profession" placeholder="请选择工种">
                        <el-option v-for="(item, index) in editSource.profession" :key="index" label="item.name" value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="nativePlace" label="籍贯">
                    <el-select v-model="editSource.nativePlace" placeholder="请选择籍贯">
                        <el-option v-for="(item, index) in editSource.nativePlace" :key="index" label="item.name" value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="todayTem" label="今日体温">
                    <el-input v-model="editSource.todayTem" placeholder="请输入体温"></el-input>
                </el-form-item>
                <el-form-item prop="bjReturn" label="返京地">
                    <el-select v-model="editSource.bjReturn" placeholder="请选择返京地">
                        <el-option v-for="(item, index) in editSource.bjReturn" :key="index" label="item.name" value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="bjRiskdegree" label="返京地风险程度">
                    <el-select v-model="editSource.bjRiskdegree" placeholder="请选择风险程度">
                        <el-option label="低" value="0"></el-option>
                        <el-option label="中" value="1"></el-option>
                        <el-option label="高" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="address" label="暂住地址">
                    <el-select v-model="editSource.address" placeholder="请选择暂住地址">
                        <el-option v-for="(item, index) in editSource.address" :key="index" label="item.name" value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="barrier" label="隔离情况">
                    <el-select v-model="editSource.barrier" placeholder="请选择隔离情况">
                        <el-option label="满足隔离条件" value="0"></el-option>
                        <el-option label="未满足隔离条件" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="returnDate" label="返场时间">
                    <el-date-picker
                        v-model="editSource.returnDate"
                        type="date"
                        placeholder="选择日期"
                        :editable="false"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="createDate" label="创建日期">
                    <el-date-picker
                        v-model="editSource.createDate"
                        type="date"
                        placeholder="选择日期"
                        :editable="false"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="F-Grey" round @click="cloneEditForm('addFormRef')">取消</el-button>
                    <el-button class="F-Blue" round @click="submitEditForm('addFormRef')">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

<!-- 查看下属 -->
        <el-dialog
            :visible.sync="seeDetails"
            :close-on-click-modal="false"
            top="140px"
            width="1400px"
        >
            <el-table :data="gridData" :header-cell-style="headClass">
                <el-table-column prop="name" label="姓名" min-width="150"></el-table-column>
                <el-table-column prop="belongLabor" label="所属劳务队" min-width="100"></el-table-column>
                <el-table-column prop="profession" label="工种" min-width="80"></el-table-column>
                <el-table-column prop="nativePlace" label="籍贯" min-width="110"></el-table-column>
                <el-table-column prop="todayTem" label="今日体温" min-width="100"></el-table-column>
                <el-table-column prop="bjReturn" label="返京地" min-width="100"></el-table-column>
                <el-table-column prop="bjRiskdegree" label="返京地风险程度" width="130"></el-table-column>
                <el-table-column prop="address" label="暂住地址" width="130"></el-table-column>
                <el-table-column prop="barrier" label="隔离情况" width="120"></el-table-column>
                <el-table-column prop="returnDate" label="返场时间" width="120"></el-table-column>
                <el-table-column prop="status" label="状态" width="80"></el-table-column>
                <el-table-column prop="createDate" label="创建日期" width="120"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>

import { handleCofirm } from "@/utils/confirm";

export default {
    data() {
        return {
            //  初始化页面
            id: null, // 当前选中的id
            ids: null, // 选中的id
            page: 1, // 初始页
            pageSize: 10, // 默认每页数据量
            total: 0, //总条数
            tableData: [], // 初始化表格
            gridData: [], // 查看下属表格初始化
            addOpen: false,// 添加弹窗初始隐藏
            editOpen: false,// 编辑弹窗初始隐藏
            seeDetails: false,// 查看下属弹窗初始隐藏
            screenForm: {
                degree: "",
                returnDate: ""
            },
            // 编辑初始化
            editSource: {
                id: null,
                name: "",
                belongLabor: "",
                profession: "",
                nativePlace: "",
                todayTem: "",
                bjReturn: "",
                bjRiskdegree: "",
                address: "",
                barrier: "",
                returnDate: "",
                status: "",
                createDate: ""
            },
            // 自定义表单验证
            rulesForm: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                belongLabor: [
                 { required: true, message: "请选择劳务队", trigger: "change" }
                ],
                profession: [
                    { required: true, message: "请选择工种", trigger: "change" }
                ],
                nativePlace: [
                  { required: true, message: "请选择籍贯", trigger: "change" }
                ],
                todayTem: [
                   { required: true, message: "请输入体温", trigger: "blur" }
                ],
                bjReturn: [
                    { required: true, message: "请选择返京地", trigger: "blur" }
                ],
                bjRiskdegree: [
                   { required: true, message: "请选择返京地风险程度", trigger: "blur" }
                ],
                address: [
                   { required: true, message: "请选择暂住地址", trigger: "change" }
                ],
                barrier: [
                    { required: true, message: "请选择隔离情况", trigger: "change" }
                ],
                returnDate: [
                  { required: true, message: "请选择返场时间", trigger: "change" }
                ],
                createDate: [
                   { required: true, message: "请选择创建时间", trigger: "blur" }
                ]
            },
            multipleSelection: []
        };
    },
    created() {
        // 页面加载时获取用户信息
        this.getLocalStorage();
        this.getTable();
    },
    components: {},
    methods: {
        // 获取本地存储用户信息
        getLocalStorage() {
            this.username = window.localStorage.getItem("username");
            this.userId = window.localStorage.getItem("userId");
            this.admin = window.localStorage.getItem("admin");
            this.token = window.localStorage.getItem("token");
        },
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
                    name: "张三",
                    belongLabor: "第一劳务",
                    profession: "电焊工",
                    nativePlace: "天津市",
                    todayTem: "36.8℃",
                    bjReturn: "郑州市",
                    bjRiskdegree: "低",
                    address: "房山",
                    barrier: "满足隔离",
                    returnDate: "2020-04-08",
                    status: "未提交",
                    createDate: "2020-04-12"
                },
                {
                    id: 1,
                    name: "李四",
                    belongLabor: "第二劳务",
                    profession: "门卫",
                    nativePlace: "大连市",
                    todayTem: "36.1℃",
                    bjReturn: "沈阳市",
                    bjRiskdegree: "低",
                    address: "海淀区",
                    barrier: "满足隔离",
                    returnDate: "2020-04-14",
                    status: "未提交",
                    createDate: "2020-04-17"
                }
            ];
            this.tableData = result;
            this.total = result.length;
        },
        //获得表格前面选中的id值
        handleSelectionChange() {
            var ids = new Array();
            var arrays = this.$refs.multipleTable.selection;
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
            var data = JSON.stringify(this.screenForm)
            this.http.post('/smart/worker/labour/1/company/management', data)
            .then(res => {
                console.log(res)
            })
        },
    //  批量删除
        deleteBatchClick() {
            var ids = this.handleSelectionChange();
            if (ids.length <= 0) {
                this.$message("请选择删除的数据！");
                return;
            }
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
        // 批量提交
        submitBatchClick() {
            var ids = this.handleSelectionChange();
            if (ids.length <= 0) {
                this.$message("请选择提交的数据！");
                return;
            }
            handleCofirm("确定提交吗？")
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
                            message: "提交成功!"
                        });
                    }
                });
            })
            .catch(err => {
                this.$message({
                    type: "info",
                    message: "已取消提交"
                });
            });
        },
        //  导出
        exportStaffClick() {},
        //  导入
        importStaffClick() {},
//  表格操作
    //  编辑
        editRowClick(inedx, row) {
            this.editSource.name = row.name;
            this.editSource.belongLabor = row.belongLabor;
            this.editSource.profession = row.profession;
            this.editSource.nativePlace = row.nativePlace;
            this.editSource.todayTem = row.todayTem;
            this.editSource.bjReturn = row.bjReturn;
            this.editSource.bjRiskdegree = row.bjRiskdegree;
            this.editSource.address = row.address;
            this.editSource.barrier = row.barrier;
            this.editSource.returnDate = row.returnDate;
            this.editSource.createDate = row.createDate;
        },
        submitEditForm(editFormRef) {
            // 验证
            this.$refs[editFormRef].validate((valid) => {
                if (valid) {
                    // 添加劳务人员请求
                    var params = JSON.stringify(this.editSource);
                    this.http
                        .put("smart/worker/labour/1/company/management", params)
                        .then(res => {
                        if (res.code == 200) {
                            this.$message({
                                type: "success",
                                message: "修改成功!"
                            });
                        }
                        })
                        .catch(res => {
                            if(res.code === 404) {
                                this.$message({
                                    type: "success",
                                    message: "预留跳转404页面!"
                                });
                            }
                        });
                    this.editOpen = false;
                } else {
                console.log('error submit!!');
                return false;
                }
            });
        },
        // 关闭编辑弹窗
        cloneEditForm(editFormRef) {
            this.$refs[editFormRef].resetFields();
            this.editOpen = false;
        },
    //  删除
        deleteRowClick() {
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
        // 提交
        submitRowClick() {
            handleCofirm("确定提交吗？")
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
                            message: "提交成功!"
                        });
                    }
                });
            })
            .catch(err => {
                this.$message({
                    type: "info",
                    message: "已取消提交"
                });
            });
        },
        //  查看详情
        seeDetailsRowClick() {
            this.seeDetails = true;
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
                    name: "刘备",
                    belongLabor: "第一劳务",
                    profession: "钢筋工",
                    nativePlace: "上海市",
                    todayTem: "36.℃",
                    bjReturn: "温州市",
                    bjRiskdegree: "低",
                    address: "门头沟区",
                    barrier: "满足隔离",
                    returnDate: "2020-04-09",
                    status: "未提交",
                    createDate: "2020-04-15"
                }
            ]
            this.gridData = result;
            this.total = result.length;
        },
        //  数据表格-表头样式
        headClass() {
            return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
        }
    }
};
</script>
