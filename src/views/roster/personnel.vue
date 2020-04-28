<template>
  <div class="roster">
    <el-container>
      <el-main class="glry">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.user" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="工号" class="region">
            <el-select v-model="formInline.region" placeholder="工号">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="工种" class="region">
            <el-select v-model="formInline.region" placeholder="工种">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
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
        <el-button type="success" @click="NewlyAdded">新增</el-button>
        <el-button type="danger">删除</el-button>
        <el-button type="primary">导出</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="success">培训通过</el-button>
        <el-button type="primary">提交</el-button>
        <div class="tableView">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="date" label="劳务公司" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="province" label="性别" width="120"></el-table-column>
            <el-table-column prop="city" label="工号" width="120"></el-table-column>
            <el-table-column prop="address" label="籍贯" width="300"></el-table-column>
            <el-table-column prop="zip" label="年龄" width="120"></el-table-column>
            <el-table-column fixed="right" label="班组" width="100"></el-table-column>
            <el-table-column fixed="right" label="工种" width="100"></el-table-column>
            <el-table-column fixed="right" label="手机号码" width="100"></el-table-column>
            <el-table-column fixed="right" label="政治面貌" width="100"></el-table-column>
            <el-table-column fixed="right" label="进场日期" width="100"></el-table-column>
            <el-table-column fixed="right" label="退场日期" width="100"></el-table-column>
            <!-- <el-table-column fixed="right" label="状态" width="100"></el-table-column> -->
            <el-table-column fixed="right" label="操作" width="500">
              <template slot-scope="scope">
                <el-button type="warning" size="mini">编辑</el-button>
                <el-button @click="handleClick(scope.row)" type="danger" size="mini">删除</el-button>
                <el-button @click="handleClick(scope.row)" type="primary" size="mini">评价</el-button>
                <el-button @click="handleClick(scope.row)" type="success" size="mini">培训通过</el-button>
                <el-button @click="handleClick(scope.row)" type="primary" size="mini">提交</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="mini">拉黑</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="mini">退场</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="mini">签章</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="mini">查看详情</el-button>
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
          date: "2016-05-025",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
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
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        },
        {
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
     NewlyAdded(){
        console.log("11111")
       this.$router.push({path:"/LabourNewlyadded"});
    },
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

.glry_bottonView {
  margin-top: 30px;

  .btnView {
    padding-left: 30px;
    padding-top: 30px;
    height: 600px;
  }

  .tableView {
    margin-top: 30px;
  }
  .paging{
      text-align center
      margin-top:30px
  }
}
.hei{
    background:#000;
    color #fff;
    width:60px;
    height:33px;
}
</style>