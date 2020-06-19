<template>
  <div class="container">
    <el-container>
      <el-main class="main-content">
        <el-form :inline="true" :model="formInline" class="search-head">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="idNum">
            <el-input v-model="formInline.idNum" placeholder="请输入工号"></el-input>
          </el-form-item>
          <el-form-item label="工种" prop="jobType">
            <el-select v-model="formInline.jobType" placeholder="请选择工种">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间" prop="date">
            <el-date-picker
              v-model="formInline.date"
              type="date"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUserList()" style="margin-left:30px;">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="table-main">
      <el-main class="table-head">
        <el-button class="T-H-B-DarkBlue">新增</el-button>
        <!-- <el-button @click="deleteAll()" class="T-H-B-Grey">删除</el-button> -->
        <el-button @click="poiExcel()" class="T-H-B-Cyan">导出</el-button>

        <div class="table-content">
          <el-table
            :data="tableData"
            ref="multipleTable"
            @selection-change="changeFun"
            stripe
            :header-cell-style="headClass"
            style="width: 97%"
          >
            <el-table-column
              type="selection"
              width="65"
              prop="pAttendanceId"
              @selection-change="changeFun"
            ></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="idNum" label="身份证号" width="180"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <!-- <el-table-column prop="jobNum" label="工号"></el-table-column> -->
            <el-table-column prop="team" label="所在班组"></el-table-column>
            <el-table-column prop="workType" label="工种"></el-table-column>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="firstTime" label="首次打卡"></el-table-column>
            <el-table-column prop="endTime" label="末次打卡"></el-table-column>
            <el-table-column prop="attendanceTime" label="出勤时长"></el-table-column>
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
          v-if="total>10"
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="handleUserList"
        />
      </el-main>
    </div>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
import { countDown } from "@/utils/utils";
import { headClass} from "@/utils";
import Pagination from "@/components/pagination";
export default {
  name: "container",
  components: {
    Pagination
  },
  data() {
    return {
      headClass: headClass,
      token: null, // token
      // 动态数据
      tableData: [],
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      },
      total: 5, //总条数
      ids: null, //选中的id
      options: [
        { id: "", name: "请选择" },
        { id: 1, name: "瓦工" },
        { id: 2, name: "部门二" },
        { id: 3, name: "部门三" }
      ],
      formInline: {
        name: null, // 搜索
        idNum: null,
        jobType: null,
        date: null
      }
    };
  },
  activated: function() {
    this.handleUserList();
  },
  methods: {
    // 列表请求
    handleUserList() {
      // 获得搜索的内容
      var uname = this.formInline.name;
      var idnum = this.formInline.idNum;
      var jobtype = this.formInline.jobType;
      var date = this.formInline.date;
      //   // 获得当前用户的id
      var data = JSON.stringify({
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage,
        name: uname,
        date: date,
        jobNum: idnum,
        workType: jobtype
      });
      var url =
        "/bashUrl/smart/worker/attendance/" +
        sessionStorage.getItem("userId") +
        "/labour/management";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          for (var i = 0; i < res.data.rows.length; i++) {
            res.data.rows[i].attendanceTime =countDown(res.data.rows[i].endTime,res.data.rows[i].firstTime)
          }
          var rows = res.rows;
          this.tableData = res.data.rows;
          this.total = res.data.total;
        }
      });
    },
    // poi导出
    poiExcel() {
      var uname = this.formInline.name;
      var idnum = this.formInline.idNum;
      var jobtype = this.formInline.jobType;
      var date = this.formInline.date;
      //   // 获得当前用户的id
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page,
        name: uname,
        date: date,
        jobNum: idnum,
        workType: jobtype
      });
      var url =
        "/smart/worker/attendance/" +
        sessionStorage.getItem("userId") +
        "/labour/management/export";
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
    },
    //获得表格前面选中的id值
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].pAttendanceId;
        ids.push(id);
      }
      return ids;
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
</style>
