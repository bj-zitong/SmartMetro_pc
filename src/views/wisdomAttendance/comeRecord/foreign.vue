<template>
<!-- 外来 -->
    <div class="main-box">
        <el-container>
            <el-main class="main-top-box">
                <el-form :inline="true" :model="screenForm" class="search-head">
                <el-form-item label="姓名">
                    <el-input v-model="screenForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onScreen">搜索</el-button>
                </el-form-item>
                </el-form>
            </el-main>
        </el-container>
        <!-- 主体 -->
        <el-container>
            <el-menu class="main-con-box">
                <div class="main-btn-box">
                    <el-button @click="deleteBatchClick" class="T-H-B-Grey">删除</el-button>
                    <el-button @click="poiExcel" class="T-H-B-Cyan">导出</el-button>
                </div>
                <el-table
                    :data="tableData"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    stripe
                    :header-cell-style="headClass"
                    style="width: 97%"
                >
                    <el-table-column
                    type="selection"
                    width="65"
                    prop="id"
                    @selection-change="handleSelectionChange"
                    ></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="idNum" label="身份证号"></el-table-column>
                    <el-table-column prop="company" label="来访单位"></el-table-column>
                    <el-table-column prop="visitReason" label="来访事由"></el-table-column>
                    <el-table-column prop="equipmentNo" label="考勤设备"></el-table-column>
                    <el-table-column prop="date" label="打卡时间"></el-table-column>
                    <el-table-column prop="direction" label="进出方向"></el-table-column>
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
        <!-- 查看详情 -->
        <el-dialog
            width="450px"
            class="popupDialog seeDetails"
            title="出入记录"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            :center="true"
            :show-close="true"
            :hide-required-asterisk="true"
        >
            <el-row>
                <el-col :span="8">
                <span>作业区域：</span>
                </el-col>
                <el-col :span="16">
                <span class="colorB">{{ workingArea }}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                <span>作业设备：</span>
                </el-col>
                <el-col :span="16">
                <span class="colorB">{{ equipmentNo }}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                <span>打卡时间：</span>
                </el-col>
                <el-col :span="16">
                <span class="colorR">{{ date }} {{ direction }}</span>
                </el-col>
            </el-row>
            <br />
            <br />
            <el-row>
                <el-col :span="8">
                <span>作业区域：</span>
                </el-col>
                <el-col :span="16">
                <span class="colorB">{{ workingArea }}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                <span>作业设备：</span>
                </el-col>
                <el-col :span="16">
                <span class="colorB">{{ equipmentNo }}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                <span>打卡时间：</span>
                </el-col>
                <el-col :span="16">
                <span class="colorG">{{ date }} {{ direction }}</span>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
import options from "@/common/options";
import { handleCofirm } from "@/utils/confirm";
import Pagination from "@/components/pagination";
export default {
    components:{
        Pagination
    },
    data() {
        return {
            listQuery: {
                currentPage: 1, //与后台定义好的分页参数
                pageSize: 10
            },
            dialogFormVisible: false,
            options: [
                // 来访部门
                { id: "", name: "请选择来访部门" },
                { id: 1, name: "部门一" },
                { id: 2, name: "部门二" },
                { id: 3, name: "部门三" }
            ],
            tableData: [],
            screenForm: {
                name: ""
            },
            workingArea: "昌平三班南段",
            equipmentNo: "西南侧挖掘机设备一台",
            date: "2020-4-30 14:22",
            direction: "出"
        };
    },
    created: function() {
        this.getTable();
    },
    methods: {
        // 表头样式
        headClass() {
            return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
        },
        // 表格加载请求
        getTable() {
            var data = JSON.stringify({
                pageSize: this.listQuery.pageSize,
                page: this.listQuery.currentPage,
            });
            //请求
            var url =
                "/smart/worker/access/" +
                sessionStorage.getItem("userId") +
                "/outlander/management";
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
                    pAccessId: 1,
                    name: "张三",
                    idNum: "232323000000000000",
                    company: "单位1",
                    visitReason: "吃饭",
                    equipmentNo: "设备1",
                    date: "8小时",
                    direction: "入"
                },
                {
                    pAccessId: 2,
                    name: "张三",
                    idNum: "232323000000000000",
                    company: "单位1",
                    visitReason: "吃饭",
                    equipmentNo: "设备1",
                    date: "8小时",
                    direction: "入"
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
                var id = arrays[i].id;
                ids.push(id);
            }
            return ids;
        },
        // 查询
        onScreen() {
            let data = JSON.stringify(this.screenForm);
            let url =
                "/smart/worker/access/" +
                sessionStorage.getItem("userId") +
                "/outlander/management";
            this.http.post(url, data).then(res => {
                console.log(res);
            });
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
                let data = JSON.stringify(ids);
                let url =
                    "/smart/worker/access/" +
                    sessionStorage.getItem("userId") +
                    "/outlander";
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
        // poi导出
        poiExcel() {
            let name = this.screenForm.name;
            let _this = this;
            var data = JSON.stringify({
                name: name,
                pageSize: _this.listQuery.pageSize,
                page: _this.listQuery.page
            });
            var url =
                "/smart/worker/access/" +
                sessionStorage.getItem("userId") +
                "/outlander/management/export";
            this.http.post(url, data).then(res => {
                let d = new Date();
                let month = d.getMonth() + 1;
                let excelName =
                "外来人员-" +
                d.getFullYear() +
                month +
                d.getDate() +
                d.getHours() +
                d.getMinutes() +
                d.getSeconds();
                
                let blob = new Blob([res.data], {
                    type: "application/vnd.ms-excel"
                });
                let objectUrl = URL.createObjectURL(blob); // 创建URL
                
                link.href = objectUrl;
                link.download = excelName; // 自定义文件名
                link.click(); // 下载文件
                URL.revokeObjectURL(objectUrl); // 释放内存
            });
        }
    }
};
</script>