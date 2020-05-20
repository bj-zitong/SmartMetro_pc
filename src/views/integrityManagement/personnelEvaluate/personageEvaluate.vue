<template>
  <div class="container">
    <el-container>
      <el-main class="main-content">
        <el-form :inline="true" :model="formInline" class="search-head">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="工号" class="region">
            <el-input v-model="formInline.jobNum" placeholder="工号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchClick">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <div class="table-main">
      <el-main class="table-head">
        <div class="table-content">
          <el-table
            :data="tableData"
            ref="multipleTable"
            stripe
            :header-cell-style="{background:'#0058A2'}"
            style="width: 98%"
          >
            <el-table-column prop="uuid" label="序号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="jobNum" label="工号"></el-table-column>
            <el-table-column prop="teamName" label="承建单位"></el-table-column>
            <el-table-column prop="buildCorpName" label="所在班组"></el-table-column>
            <el-table-column prop="workType" label="工种"></el-table-column>
            <el-table-column prop="personEvaluate" label="评价记录"></el-table-column>
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
          @pagination="getDateList"
        />
      </el-main>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      value1: "",
      value2: "",
      // 动态数据
      tableData: [
          {
            uuid: 0,
            name: "张三",
            jobNum: "663366",
            teamName: "安保公司",
            buildCorpName: "安保部一",
            workType: "木工",
            personEvaluate: "好好"
          },
          {
            uuid: 0,
            name: "张三",
            jobNum: "663366",
            teamName: "安保公司",
            buildCorpName: "安保部一",
            workType: "木工",
            personEvaluate: "好好"
          }
        ],
      formInline: {
        name: "", // 搜索
        jobNum: ""
        // pageSize: 0,
        //  page": 0
      },
      total: 50,
      listQuery: {
        currentPage: 1, //与后台定义好的分页参数
        pageSize: 10
      }
    };
  },
  mounted() {
    this.getDateList();
  },
  methods: {
    //搜索
    searchClick() {
      this.getDateList();
    },
    // 列表请求
    getDateList() {
      // 获得搜索的内容
      var data = JSON.stringify({
        jobNum: this.formInline.jobNum,
        name: this.formInline.name,
        pageSize: this.listQuery.pageSize,
        page: this.listQuery.currentPage
      });
      var url =
        "/smart/worker/integrity/" +
        sessionStorage.getItem("userId") +
        "/evaluate/management/worker";
      this.http.post(url, data).then(res => {
        if (res.code == 200) {
          var rows = res.rows;
          this.tableData = rows;
          this.total = res.total;
        }
        var result = [
          {
            uuid: 0,
            name: "张三",
            jobNum: "663366",
            teamName: "安保公司",
            buildCorpName: "安保部一",
            workType: "木工",
            personEvaluate: "好好"
          },
          {
            uuid: 0,
            name: "张三",
            jobNum: "663366",
            teamName: "安保公司",
            buildCorpName: "安保部一",
            workType: "木工",
            personEvaluate: "好好"
          }
        ];
        this.tableData = result;
        this.total = result.length;
      });

      // this.tableData = result;
    },
    changeFun() {}
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
