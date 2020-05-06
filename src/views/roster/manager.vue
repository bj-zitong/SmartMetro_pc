<template>
  <div class="roster">
    <el-container>
      <el-main class="glry">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.user" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="人员类型" class="region">
            <el-select v-model="formInline.region" placeholder="请选择人员类型">
              <el-option label="企业自有职工" value="qiye"></el-option>
              <el-option label="劳务派遣人员" value="laowu"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="glry_bottonView">
      <el-main class="btnView">
        <div style="margin-bottom: 30px;">
          <el-button class="T-H-B-DarkBlue" @click="addStaffClick">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteRowClick">删除</el-button>
          <el-button class="T-H-B-Cyan" @click="exportStaffClick">导出</el-button>
          <el-upload
            style="display:inline-block; margin-left: 10px;"
            class="upload-demo"
            action
            :show-file-list="false"
          >
            <el-button class="T-H-B-Cyan" type="primary" @click="importStaffClick">导入</el-button>
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
            <el-table-column type="selection"></el-table-column>
            <el-table-column fixed prop="Company" label="承建单位"></el-table-column>
            <el-table-column prop="name" label="部门"></el-table-column>
            <el-table-column prop="post" label="岗位/职责"></el-table-column>
            <el-table-column prop="Personneltype" label="人员类型"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="nativeplace" label="籍贯"></el-table-column>
            <el-table-column prop="numberId" label="身份证号"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="emergencyTelephone" label="手机号码"></el-table-column>
            <el-table-column prop="Currentresidence" label="住址"></el-table-column>
            <el-table-column prop="PoliticalOutlook" label="政治面貌"></el-table-column>
            <el-table-column fixed="right" label="操作" width="270">
              <template slot-scope="scope">
                <el-button
                  class="T-R-B-Green"
                  size="mini"
                  @click="editRowClick(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  class="T-R-B-Grey"
                  size="mini"
                  @click="deleteRowClick(scope.$index, scope.row)"
                >删除</el-button>
                <el-button
                  class="T-R-B-Violet"
                  size="mini"
                  @click="detailsRowClick(scope.$index, scope.row)"
                >查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination background layout="prev, pager, next" :total="1000" class="paging"></el-pagination>
      </el-main>
    </div>
  </div>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";

export default {
  name: "echarts",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          Company: "wwww",
          department: "department",
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          Company: "wwww",
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          Company: "wwww",
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
    },
    addStaffClick() {
      this.$router.push({ path: "/AddAdministration" });
    },
    //  导出
    exportStaffClick() {},
    //  导入
    importStaffClick() {},
    //  表格操作
    //  编辑
    editRowClick() {
      this.$router.push({ path: "/AddAdministration" });
    },
    //批量删除
    deleteRowClick() {
      handleCofirm("确认删除吗？", "warning")
        .then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    seeSubRowClick() {},
    headClass() {
      return "text-align: center; height: 60px; background:rgba(0,88,162,1); color: #fff;";
    },
    handleSelectionChange(val) {},
    detailsRowClick() {}
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

.roster {
  margin: 0 30px;
}

.glry_bottonView {
  margin-top: 25px;

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
    margin-bottom: 15px;
  }
}
</style>