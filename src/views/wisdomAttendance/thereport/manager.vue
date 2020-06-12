<template>
  <div class="container">
    <el-container>
      <el-main class="main-content">
        <el-form :inline="true" :model="formInline" class="search-head">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <!-- <el-form-item label="工号" class="region">
            <el-input v-model="formInline.jobNum" placeholder="请输入工号"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="searchClick">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="table-main">
      <el-main class="table-head">
        <el-button @click="exportExcelClick" class="T-H-B-Cyan">导出</el-button>
        <div class="table-content">
          <el-table
            :data="tableData"
            ref="multipleTable"
            stripe
            :header-cell-style="headClass"
            style="width: 97%"
          >
            <el-table-column
              type="selection"
              width="65"
              prop="userId"
            ></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="jobNum" label="工号"></el-table-column>
            <!-- <el-table-column prop="phone" label="所在部门"></el-table-column> -->
            <el-table-column prop="jobType" label="岗位/职责"></el-table-column>
            <el-table-column prop="attendanceHoursByYear" label="出勤天数/工时（年）"></el-table-column>
            <el-table-column prop="attendanceHoursByQuarter" label="出勤天数/工时（季度）"></el-table-column>
            <el-table-column prop="attendanceHoursByMonth" label="出勤天数/工时（月）"></el-table-column>
            <el-table-column prop="attendanceHoursByWeek" label="出勤天数/工时（周）"></el-table-column>
          </el-table>
        </div>
        <!-- 分页 total  //这是显示总共有多少数据，
                    pagesize //显示当前行的条数
                    sizes这是下拉框可以选择的，每选择一行，要展示多少内容
                     :page-sizes="[5, 10, 20, 40]" 下拉选择
                     layout="total, sizes, prev, pager, next, jumper"

        -->
         <pagination
          class="pagination-box"
          v-if="total>0"
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getDatafun"
        />
      </el-main>
    </div>
    <!--新增-->
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
import { headClass } from "@/utils";
import Pagination from "@/components/pagination";
export default {
   components: {
    Pagination
  },
  data() {
    return {
      headClass: headClass,
      // 动态数据
      tableData: [],
     formInline: {
        jobNum: "", // 搜索
        name: ""
      },
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
      total: 10, //总条数
    };
  },
  activated: function() {
    this.getDatafun();
  },
  methods: {
    getDatafun() {
      var _this = this;
      var data = JSON.stringify({
        name: _this.formInline.name,
        jobNum: _this.formInline.jobNum,
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage
      });
      var url =
        "/smart/worker/reports/" +
        sessionStorage.getItem("userId") +
        "/management/1";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var total = res.total;
          var rows = res.rows;
          this.tableData = rows;
          this.total = total;
        }
      });
    },
    //导出
    exportExcelClick() {
      handleCofirm("确认导出吗", "warning").then(res => {
        let _this = this;
        var data = JSON.stringify({
          name: _this.formInline.name,
          jobNum: _this.formInline.jobNum,
          pageSize: _this.page.pageSize,
          page: _this.page.page
        });
        var url =
          "/smart/worker/reports/" +
          sessionStorage.getItem("userId") +
          "/management/2";
        this.http.post(url, data).then(res => {
          // // 创建Blob对象，设置文件类型
          // let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
          // let objectUrl = URL.createObjectURL(blob) // 创建URL
          // location.href = objectUrl;
          // URL.revokeObjectURL(objectUrl); // 释放内存
          // 创建Blob对象，设置文件类型
          // 自定义文件下载名称  Subway-User-20191223114607
          var d = new Date();
          var month = d.getMonth() + 1;
          var excelName =
            "Subway-User-" +
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
          // alert("调用导出！");
        });
      });
    },
    searchClick() {this.getDatafun()},
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
  }
};
</script>
<style scoped lang="stylus">
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  padding: 0px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  color: #333;
  opacity: 1;
  border-radius: 10px;
  height: 100px;
}

.el-container {
  margin-bottom: 40px;
}

.main-content {
  padding-top: 30px;
  margin-left: 30px;
  margin-right: 30px;

  .search-head {
    margin-left: 30px;
  }

  .region {
    margin-left: 60px;
  }

  el-input {
    width: 180px;
  }
}

.table-main {
  margin-top: -30px;
  height: 500px;

  .table-head {
    padding-left: 30px;
    padding-top: 30px;
    height: 600px;

    .addStyle {
      width: 80px;
      height: 35px;
      background: linear-gradient(
        180deg,
        rgba(54, 130, 243, 1) 0%,
        rgba(0, 88, 162, 1) 100%
      );
      opacity: 1;
      border-radius: 4px;
      text-align: center;
    }

    .addStyle-title {
      color: #ffffff;
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }

    .deleteStyle {
      width: 80px;
      height: 35px;
      background: linear-gradient(
        180deg,
        rgba(225, 225, 225, 1) 0%,
        rgba(190, 190, 190, 1) 100%
      );
      opacity: 1;
      border-radius: 4px;
    }

    .deleteStyle-title {
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(99, 99, 99, 1);
      opacity: 1;
    }

    .exportStyle {
      width: 80px;
      height: 35px;
      background: linear-gradient(
        180deg,
        rgba(58, 222, 214, 1) 0%,
        rgba(0, 150, 143, 1) 100%
      );
      opacity: 1;
      border-radius: 4px;
    }

    .poiExcel-title {
      width: 33px;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }
  }

  .table-content {
    margin-top: 30px;
  }

  .page-end {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
