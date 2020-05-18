<template>
  <div class="container">
    <el-container>
      <el-main class="main-content">
        <el-form :inline="true" :model="formInline" class="search-head">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="工号" class="region">
            <el-input v-model="formInline.jobNum" placeholder="请输入工号"></el-input>
          </el-form-item>
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
            @selection-change="changeFun"
            stripe
            :header-cell-style="headClass"
            style="width: 98%"
          >
            <el-table-column
              type="selection"
              width="65"
              prop="userId"
              @selection-change="changeFun"
            ></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="jobNum" label="工号"></el-table-column>
            <el-table-column prop="company" label="所在班组"></el-table-column>
            <el-table-column prop="workerType" label="工种"></el-table-column>
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
        <div class="block">
          <el-pagination
            class="pagination-box"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </el-main>
    </div>
  </div>
</template>
<script>
import options from "@/common/options";
import { handleCofirm } from "@/utils/confirm";
import { headClass } from "@/utils";
export default {
  data() {
    return {
      //当前页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // 动态数据
      tableData: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 100, //总条数
      headClass: headClass,
      formInline: {
        jobNum: "", // 搜索
        name: ""
      },
      page: {
        page: 1, // 初始页
        pageSize: 10, // 默认每页数据量
        total: 0 //总条数
      }
    };
  },
  created: function() {
    this.getDatafun()
  },
  methods: {
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
          "/management/1";
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
    //请求列表
    getDatafun() {
      var _this =this
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
        if (res.code == 200) {
          var total = res.total;
          var rows = res.rows;
          this.tableData = rows;
          this.total = total;
        }
      });
      var result = [
        {
           pReportsId:0,
          pInfoId:0,
          name: "张三",
          jobNum: "12346956",
          company: "劳务一组",
          workerType: "矿工", // 单位
          attendanceHoursByYear: "10",
          attendanceHoursByQuarter: "10",
          attendanceHoursByMonth: "10",
          attendanceHoursByWeek: "10"
        },
        {
          pReportsId:1,
          pInfoId:1,
          name: "张三",
          jobNum: "12346956",
          company: "劳务一组",
          workerType: "矿工", // 单位
          attendanceHoursByYear: "10",
          attendanceHoursByQuarter: "10",
          attendanceHoursByMonth: "10",
          attendanceHoursByWeek: "10"
        },
        {
           pReportsId:2,
          pInfoId:2,
          name: "张三",
          jobNum: "12346956",
          company: "劳务一组",
          workerType: "矿工", // 单位
          attendanceHoursByYear: "10",
          attendanceHoursByQuarter: "10",
          attendanceHoursByMonth: "10",
          attendanceHoursByWeek: "10"
        },
        {
           pReportsId:3,
          pInfoId:3,
          name: "张三",
          jobNum: "12346956",
          company: "劳务一组",
          workerType: "矿工", // 单位
          attendanceHoursByYear: "10",
          attendanceHoursByQuarter: "10",
          attendanceHoursByMonth: "10",
          attendanceHoursByWeek: "10"
        }
      ];
      this.tableData = result;
      this.total = result.length;
    },
    searchClick() {this.getDatafun()},
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    addUser(form) {
      var params = JSON.stringify({
        userName: this.form.userName,
        phone: this.form.phone,
        idNum: this.form.idNum,
        company: this.form.company,
        profession: this.form.profession,
        carNum: this.form.carNum,
        interviewee: this.form.interviewee,
        intervieweeReason: this.form.intervieweeReason,
        intervieweeDate: this.form.intervieweeDate
      });
      console.log(params);
    },
    //编辑
    handleEdit(row) {
      // 用户id
      var uid = row.userId;
    },

    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].userId;
        ids.push(id);
        // console.log("获得id"+arrays[i].userId);
      }
      return ids;
      // console.log("选中的ids"+ids);
      //  this.multipleSelection = val;
    },
    // 批量删除
    deleteAll() {
      var ids = this.changeFun();
      console.log(ids);
      var url = "";
    }
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

.addUser-content {
  height: 300px;

  p {
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #000;
    padding-bottom: 20px;
  }
}
</style>
