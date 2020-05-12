<template>
  <div class="roster">
    <el-container>
      <el-main class="glry">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="专业" class="region">
            <el-input v-model="form.major" placeholder="请输入专业"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getEquiments()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="glry_bottonView">
      <el-main class="btnView">
        <div style="margin-bottom: 30px;">
          <el-button class="T-H-B-DarkBlue" @click="addStaffClick">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteAllClick()">删除</el-button>
          <el-button class="T-H-B-Cyan" @click="exportStaffClick">导出</el-button>
          <el-upload
            style="display:inline-block; margin-left: 10px;"
            class="upload-demo"
            action
            :show-file-list="false"
          >
            <el-button class="T-H-B-Cyan" type="primary" @click="importStaffClick(this)">导入</el-button>
          </el-upload>
        </div>
        <div class="tableView">
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            :header-cell-style="headClass"
            tooltip-effect="dark"
            style="width: 97%;"
            @selection-change="handleSelectionChange"
            border
          >
            <el-table-column
              type="selection"
              width="65"
              prop="id"
              @selection-change="handleSelectionChange"
            ></el-table-column>
            <el-table-column prop="company" label="公司名称"></el-table-column>
            <el-table-column prop="contractName" label="合同名称"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="jobNum" label="工号"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="professional" label="专业"></el-table-column>
            <el-table-column prop="duty" label="职务"></el-table-column>
            <el-table-column prop="birthPlace" label="籍贯"></el-table-column>
            <el-table-column prop="idCardCode" label="身份证号"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="cellPhone" label="手机号码"></el-table-column>
            <el-table-column label="操作" fixed="right" width="240">
              <template slot-scope="scope">
                <el-button
                  class="T-R-B-Green"
                  size="mini"
                  @click="editRowClick(scope.row)"
                >编辑</el-button>
                <el-button
                  class="T-R-B-Grey"
                  size="mini"
                  @click="deleteRowClick(scope.row)"
                >删除</el-button>
                <el-button
                  class="T-R-B-Orange"
                  size="mini"
                  @click="detailsRowClick(scope.$index, scope.row)"
                >查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          :current-page="page"
          layout="total, prev, pager,next"
          :page-size="pageSize"
          @prev-click="pre"
          @next-click="next"
          @current-change="handleCurrentChange"
          :total="total"
          background
        ></el-pagination>
      </el-main>
    </div>
    <equipmentdialog v-if="changOrder" ref="turnOrder"/>
  </div>
</template>
<script>
import options from "@/common/options";
import { handleCofirm } from "@/utils/confirm";
import { headClass } from "@/utils";
import equipmentdialog from "./dialog/equipmentdialog";
export default {
  name: "echarts",
  components: {
    equipmentdialog
  },
  data() {
    return {
      headClass: headClass,
      tableData: [],
      page: 1, // 初始页
      pageSize: 10, //    每页的数据
      total: 100, //总条数
      form: {
        major: "",
        name: ""
      },
      tableData: [],
      ids: []
    };
  },
  created: function() {
    this.getEquiments();
  },
  methods: {
    getEquiments() {
      // 获得搜索的内容
      var name = this.form.name;
      var major = this.form.major;
      //   // 获得当前用户的id
      var data = JSON.stringify({
        pageSize: this.pageSize,
        page: this.page,
        name: name,
        professional: major
      });
      var url =
        "/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/equipment/management";
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
          name: "地铁安保部",
          idCardCode: "210234567898765876",
          cellPhone: 15236985236,
          company: "安保部一",
          contractName: "部门一",
          jobNum: "123",
          gender: "男",
          professional: "专业1",
          duty: "xxx",
          birthPlace: "河北",
          age: 35
        },
        {
          id: 2,
          name: "22222222",
          idCardCode: "210234567898765789",
          cellPhone: 111,
          company: "44444",
          contractName: "44444",
          jobNum: "1111",
          gender: "女",
          professional: "专业2",
          duty: "xxxxx",
          birthPlace: "北京",
          age: 45
        }
      ];
      this.tableData = result;
      this.total = result.length;
    },
    // 初始页Page、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size; //每页下拉显示数据
      // this.handleUserList()
    },
    handleCurrentChange: function(page) {
      this.page = page;
      this.handleUserList(); //点击第几页
    },
    pre(cpage) {
      this.page = cpage;
      // this.handleUserList()
    },
    //下一页
    next(cpage) {
      this.page = cpage;
      // this.handleUserList()
    },
    //新增
    addStaffClick() {
      // this.$router.push({ path: "/AddEquipment" });
      this.$router.push({
          name: 'AddEquipment',
          params: {
            id:'0'
          }
        })
    },
    handleSelectionChange() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].id;
        ids.push(id);
      }
      return ids;
    },
    handleClick(row) {
      console.log(row);
    },

    exportStaffClick() {
      var name = this.form.name;
      var major = this.form.major;
      var data = JSON.stringify({
        name: name,
        professional: major,
        pageSize: this.pageSize,
        page: this.page
      });
      var url =
        "/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/equipment/export";
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
    //  导入
    importStaffClick(file) {
      console.log(file);
    },
    
    //  表格操作
    //  编辑
    editRowClick(row) {
      // console.log(row.id);
      // this.$router.push({ path: "/AddEquipment/$"});
       this.$router.push({
          name: 'AddEquipment',
          params: {
            id: row.id
          }
        })
    },
    deleteRowClick(row){
      var uid=row.id;
       var ids = [];
      ids.push(uid);
      handleCofirm("确认删除", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/equipment";
          this.http.delete(url, data).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTalks();
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
    //批量删除
    deleteAllClick() {
      var ids = this.handleSelectionChange();
      if (ids.length <= 0) {
        this.$message("请选择删除的数据！");
        return;
      }
      handleCofirm("确认删除吗？", "warning")
        .then(res => {
          var data = JSON.stringify(ids);
          var url =
            "/smart/worker/roster/" +
            sessionStorage.getItem("userId") +
            "/equipment";
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
     detailsRowClick() {
      let _this = this;
      _this.changOrder = true;
      _this.$nextTick(() => {
        _this.$refs.turnOrder.init();
      });
    },
  }
};
</script>
<style scoped lang="stylus">
.roster {
  margin: 0 25px;
}

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

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.glry {
  padding-top: 30px;

  .demo-form-inline {
    margin-left: 30px;
  }

  .region {
    margin-left: 60px;
  }

  el-input {
    width: 180px;
  }
}

.glry_bottonView {
  margin-top: 30px;

  .btnView {
    padding-left: 30px;
    padding-top: 30px;
    height: 100%;
  }

  .tableView {
    margin-top: 30px;
  }

  .paging {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>