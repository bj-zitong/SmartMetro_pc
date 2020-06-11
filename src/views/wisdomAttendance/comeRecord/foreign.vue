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
            <el-button type="primary" @click="getTable()">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <!-- 主体 -->
    <el-container>
      <el-menu class="main-con-box">
        <div class="main-btn-box">
          <!-- <el-button @click="deleteBatchClick" class="T-H-B-Grey">删除</el-button> -->
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
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
      total: 0,
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
  activated: function() {
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
        name:this.screenForm.name
      });
      //请求
      var url =
        "/bashUrl/smart/worker/access/" +
        sessionStorage.getItem("userId") +
        "/outlander/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
         this.tableData = res.data.rows;
          this.total = res.data.total;
        }
      });
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
    // poi导出
    poiExcel() {
      let name = this.screenForm.name;
      let _this = this;
      var data = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        name:this.screenForm.name
      });
      var url =
        "/bashUrl/smart/worker/access/" +
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