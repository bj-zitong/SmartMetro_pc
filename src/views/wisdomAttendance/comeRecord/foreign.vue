<template>
  <!-- 外来 -->
  <div class="container">
    <el-container>
      <el-main class="main-content">
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
    <div class="table-main">
      <el-main class="table-head">
        <el-button @click="deleteBatchClick" class="T-H-B-Grey">删除</el-button>
        <el-button @click="poiExcel" class="T-H-B-Cyan">导出</el-button>
        <div class="table-content">
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
              prop="userId"
              @selection-change="handleSelectionChange"
            ></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="idNum" label="身份证号"></el-table-column>
            <el-table-column prop="company" label="来访单位"></el-table-column>
            <el-table-column prop="visitReason" label="来访事由"></el-table-column>
            <el-table-column prop="equipmentNo" label="考勤设备"></el-table-column>
            <el-table-column prop="date" label="打卡时间"></el-table-column>
            <el-table-column prop="direction" label="进出方向"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="warning" size="mini" @click="personnelDetailClick(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页& -->
        <el-pagination
          background
          class="pagination-box"
          layout="total, prev, pager,next"
          :current-page="page"
          :page-size="pageSize"
          :total="total"
          @prev-click="prev"
          @next-click="next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-main>
    </div>
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
import { headClass } from "@/utils";
export default {
  data() {
    return {
      headClass: headClass,
      dialogFormVisible: false,
      // 动态数据
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 0, //总条数
      options: [
        // 来访部门
        { id: "", name: "请选择来访部门" },
        { id: 1, name: "部门一" },
        { id: 2, name: "部门二" },
        { id: 3, name: "部门三" }
      ],
      tableData: [],
      screenForm: {
        // 筛选
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
    // 每页显示多少条 @size-change
    handleSizeChange(size) {
      this.pageSize = size;
      this.getTable();
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
    //详情
    personnelDetailClick(index, row) {
      this.dialogFormVisible = true;
      let url =
        "/smart/worker/access/" +
        sessionStorage.getItem("userId") +
        "/common/" +
        row.id +
        "/detail";
      this.http
        .delete(url, data)
        .then(res => {
          if (res.code == 200) {
            console.log(res);
          }
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "访问失败"
          });
        });
    },
    // poi导出
    poiExcel() {
      var unum = this.company;
      let _this = this;
      var data = JSON.stringify({
        name: name,
        pageSize: _this.pageSize,
        page: _this.page
      });
      var url =
        "/smart/worker/access/" +
        sessionStorage.getItem("userId") +
        "/outlander/management/export";
      _this
        .$http({
          // 头部信息编码格式
          headers: {
            "Content-Type": "application/json",
            Authorization: _this.sessionStorage.getItem("token")
          },
          method: "POST",
          url: url,
          data: {
            userParams: data
          },
          responseType: "arraybuffer"
        })
        .then(function(res) {
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
          let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          let objectUrl = URL.createObjectURL(blob); // 创建URL
          link.href = objectUrl;
          link.download = excelName; // 自定义文件名
          link.click(); // 下载文件
          URL.revokeObjectURL(objectUrl); // 释放内存
          // alert("调用导出！");
        })
        .catch(function(error) {
          console.log(error);
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

.addUser-content {
  height: 300px;

  p {
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #000;
    padding-bottom: 20px;
  }
}

.addUser-content h6 {
  text-align: left;
}
</style>
