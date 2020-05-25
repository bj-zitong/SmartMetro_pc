<template>
  <div class="container">
    <el-container>
      <el-main class="main-content">
        <el-form :inline="true" :model="formInline" class="search-head">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="工人类别" prop="workerType">
            <el-select v-model="formInline.workerType" placeholder="请选择" @change="selectProfession">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间" class="region" prop="date">
            <el-date-picker
              v-model="formInline.date"
              type="date"
              placeholder="时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUserList()">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="table-main">
      <el-main class="table-head">
        <el-button @click="deleteAll()" class="T-H-B-Grey">删除</el-button>
        <el-button @click="poiExcel()" class="T-H-B-Cyan">导出</el-button>
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
              prop="pAttendanceId"
              @selection-change="changeFun"
            ></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="idNum" label="身份证号"></el-table-column>
            <el-table-column prop="WorkerType" label="专业"></el-table-column>
            <el-table-column prop="duty" label="职务"></el-table-column>
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
        <el-pagination
          class="page-end"
          @size-change="handleSizeChange"
          :current-page="page"
          :page-sizes="[10, 50,100]"
          layout="total, sizes,prev, pager,next,jumper"
          :page-size="pageSize"
          @prev-click="pre"
          @next-click="next"
          @current-change="handleCurrentChange"
          :total="total"
          background
        ></el-pagination>
      </el-main>
    </div>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
import { headClass } from "@/utils";
export default {
  data() {
    return {
      headClass: headClass,
      token: null, // token
      // 动态数据
      tableData: [],
      page: 1, // 初始页
      pageSize: 8, //    每页的数据
      total: 100, //总条数
      ids: null, //选中的id
      formInline: {
        name: null, // 搜索
        workerType: null,
        date: null
      },
        options: [
        { id: "", name: "请选择" },
        { id: 1, name: "工长" },
        { id: 2, name: "石工" },
        { id: 3, name: "绿化工" }
      ],
    };
  },
  activated: function() {
    this.handleUserList();
  },
  methods: {
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size;
      // this.handleUserList()
      // console.log(this.pageSize)  //每页下拉显示数据
    },
    handleCurrentChange: function(page) {
      this.page = page;
      this.handleUserList();
      // console.log(this.page); //点击第几页
    },
    pre(cpage) {
      this.page = cpage;
      // console.log("cpage" + cpage);
      // this.handleUserList()
    },
    //下一页
    next(cpage) {
      this.page = cpage;
      // console.log("下一页" + cpage);
      // this.handleUserList()
    },
    // 下拉框获得值
    selectProfession(vid) {
      let obj = {};
      obj = this.options.find(item => {
        return item.id == vid; // 筛选出匹配数据
      });
      this.formInline.workerType = obj.id;
    },
    // 列表请求
    handleUserList() {
      // 获得搜索的内容
      var uname = this.formInline.name;
      var date = this.formInline.date;
      var workerType = this.formInline.workerType;
      //   // 获得当前用户的id
      // var  uid = sessionStorage.getItem('uid')
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page,
        name: uname,
        date: date,
        workerType: workerType
      });
      var url =
        "/smart/worker/attendance/" +
        sessionStorage.getItem("userId") +
        "/other/management";
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
          pAttendanceId: 1,
          name: "地铁安保部",
          idNum: "210234567898765876",
          duty: "安保部一",
          jobNum: "部门一",
          WorkerType: "123",
          date: "2020-4-12",
          firstTime: "2020-4-12",
          endTime: "2020-4-12",
          attendanceTime: "2020-4-12"
        },
        {
          pAttendanceId: 2,
          name: "22222222",
          idNum: "210234567898765789",
          duty: "44444",
          jobNum: "44444",
          WorkerType: "1111",
          date: "2020-4-12",
          firstTime: "2020-4-12",
          endTime: "2020-4-12",
          attendanceTime: "2020-4-12"
        }
      ];
      this.tableData = result;
      this.total = result.length;
    },
    // poi导出
    poiExcel() {
      var uname = this.formInline.name;
      var date = this.formInline.date;
      var workerType = this.formInline.workerType;
      //   // 获得当前用户的id
      // var  uid = sessionStorage.getItem('uid')
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page,
        name: uname,
        date: date,
        workerType: workerType
      });
      var url =
        "/smart/worker/attendance/" +
        sessionStorage.getItem("userId") +
        "/other/management/export";
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
        // console.log("获得id"+arrays[i].userId);
      }
      return ids;
    },
    // 批量删除
    deleteAll() {
      var ids = this.changeFun();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确认删除吗？", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/attendance/" +
            sessionStorage.getItem("userId") +
            "/other";
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
