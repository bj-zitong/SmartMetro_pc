<template>
  <div class="main-box">
    <!-- 筛选 -->
    <div class="R-L-S screen-form">
      <el-form :inline="true" class="screen-form-h">
        <el-form-item label="劳务分包：">
          <el-select placeholder="请选择分组">
            <el-option label="劳务分包一组" value="shanghai"></el-option>
            <el-option label="劳务分包二组" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人：">
          <el-input placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="合同类型：">
          <el-select placeholder="请选择合同类型">
            <el-option label="劳务分包" value="shanghai"></el-option>
            <el-option label="专业分包" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="R-L-T table-main">
      <el-button @click="add" class="T-H-B-DarkBlue">新增</el-button>
      <el-button @click="del" class="T-H-B-Grey">删除</el-button>
      <el-button @click="exportTab" class="T-H-B-Cyan">导出</el-button>
      <el-button @click="importTab" class="T-H-B-Cyan">导入</el-button>
      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="公司名称">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="负责人"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="company" label="服务单位"></el-table-column>
        <el-table-column prop="projectCode" label="项目编号"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="contractCode" label="合同编号"></el-table-column>
        <el-table-column prop="contractDate" label="合同期限" width="200"></el-table-column>
        <el-table-column prop="contractType" label="合同类型"></el-table-column>
        <el-table-column prop="mechanismCode" label="组织机构代码"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <el-button
              class="T-R-B-Green"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              class="T-R-B-Grey"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
              class="T-R-B-Violet"
              size="mini"
              @click="handleSeeBranch(scope.$index, scope.row)">查看下属</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; padding-top:20px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "第一公司",
          name: "张三",
          phone: "13888779977",
          company: "第一单位",
          projectCode: "007124241",
          projectName: "第一项目",
          contractCode: "HT123456",
          contractDate: "2019-10-10 - 2020-10-09",
          contractType: "专业分包",
          mechanismCode: "354163831",
          status: "未提交",
        },
        {
          date: "第二公司",
          name: "李四",
          phone: "15545645544",
          company: "第儿单位",
          projectCode: "01472214",
          projectName: "第二项目",
          contractCode: "HT654321",
          contractDate: "2019-10-10 - 1021-10-09",
          contractType: "劳务分包",
          mechanismCode: "81131348",
          status: "已提交",
        }
      ],
      multipleSelection: []
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="stylus" scoped>
.R-L-wrap {
  width: 100%;
  height: 100%;
}

.R-L-S, .R-L-T {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 10px rgba(112, 112, 112, 0.16);
  opacity: 1;
  border-radius: 10px;
}

.screen-form-h {
  height: 36px;
}
</style>
