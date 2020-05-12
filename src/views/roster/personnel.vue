<template>
  <div class="roster">
    <el-container>
      <el-main class="glry">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <!-- 姓名 -->
          <el-form-item label="姓名">
            <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <!-- 工号 -->
          <el-form-item label="工号" class="region">
            <el-input v-model="formInline.user" placeholder="请输入工号"></el-input>
          </el-form-item>

          <!-- 工种 -->
          <el-form-item label="工种" class="region">
            <el-select
              v-model="formInline.region"
              placeholder="请选择工种"
              filterable
              clearable
              @change="handleButton"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 查询按钮 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>

    <div class="glry_bottonView">
      <el-main class="btnView">
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
        <el-button type="success" class="T-H-B-DarkGreen">培训通过</el-button>
        <div class="tableView">
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            :header-cell-style="headClass"
            tooltip-effect="dark"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
            border
          >
            <el-table-column fixed type="selection"></el-table-column>
            <el-table-column prop="date" label="劳务公司" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="province" label="性别" width="120"></el-table-column>
            <el-table-column prop="city" label="工号" width="120"></el-table-column>
            <el-table-column prop="address" label="籍贯" width="300"></el-table-column>
            <el-table-column prop="zip" label="年龄" width="120"></el-table-column>
            <el-table-column label="班组" width="100"></el-table-column>
            <el-table-column label="工种" width="100"></el-table-column>
            <el-table-column label="手机号码" width="100"></el-table-column>
            <el-table-column label="政治面貌" width="100"></el-table-column>
            <el-table-column label="进场日期" width="100"></el-table-column>
            <el-table-column label="退场日期" width="100"></el-table-column>
            <!-- <el-table-column fixed="right" label="状态" width="100"></el-table-column> -->
            <el-table-column fixed="right" label="操作" :width="tableWidth">
              <template slot-scope="scope">
                <div v-if="rowIndex!=scope.$index">
                  <el-button
                    class="T-R-B-Green"
                    size="mini"
                    @click="editRowClick(scope.$index, scope.row)"
                  >{{operation.conversionCompile}}</el-button>
                  <el-button
                    class="T-R-B-Grey"
                    size="mini"
                    @click="deleteRowClick(scope.$index, scope.row)"
                  >{{operation.conversionDelete}}</el-button>
                  <el-button
                    @click="evaluateClick(scope.row)"
                    type="primary"
                    size="mini"
                    class="T-R-B-Grey"
                  >{{operation.evaluateVonversion}}</el-button>
                  <el-button
                    @click.native="acrosstheClick(scope.$index, scope.row)"
                    type="success"
                    size="mini"
                    class="T-R-B-BlackishGreen"
                  >......</el-button>
                </div>
                <div v-if="rowIndex==scope.$index">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="success"
                    size="mini"
                    class="T-R-B-BlackishGreen btn"
                  >培训通过</el-button>
                  <el-button
                    @click="blockClick(scope.row)"
                    type="success"
                    size="mini"
                    class="F-black btn"
                  >拉黑</el-button>
                  <el-button
                    @click="handleClick(scope.row)"
                    type="success"
                    size="mini"
                    class="F-black btn"
                  >退场</el-button>
                  <el-button
                    class="T-R-B-Orange"
                    @click="handleClick(scope.row)"
                    type="warning"
                  size="mini"
                  >查看详情</el-button>
                  <el-button
                    @click="acrosstClick(scope.$index, scope.row)"
                    type="success"
                    size="mini"
                     class="T-R-B-BlackishGreen"
                  >......</el-button>
                </div>

                <!--  -->
                <!-- <el-button
                  @click="handleClick(scope.row)"
                  type="success"
                  size="mini"
                  class="T-R-B-Grey"
                >签章</el-button>-->
                <!-- <el-button @click="handleClick(scope.row)" type="success" size="mini">查看详情</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-pagination background layout="prev, pager, next" :total="1000" class="paging"></el-pagination>
      </el-main>
    </div>

    <!-- 拉黑原因弹出框 -->
    <el-dialog title="拉黑原因" :visible.sync="centerDialogVisible" width="30%" center>
      <div>
        <el-form label-width="80px">
          <el-form-item label="原因描述">
            <el-input type="textarea" v-model="block"></el-input>
          </el-form-item>
        </el-form>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 评价弹出框 -->
    <el-dialog title="评价记录" :visible.sync="evaluatDialogVisible" width="30%" center>
      <div>
        <div>
          <el-form label-width="80px">
            <el-input type="textarea" v-model="block"></el-input>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="evaluatDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="evaluatDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import options from "@/common/options";
import { handleCofirm } from "@/utils/confirm";
import { headClass } from "@/utils";
export default {
  name: "echarts",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      operation: {
        conversionCompile: "编辑",
        conversionDelete: "删除",
        evaluateVonversion: "评价"
      },
      headClass: headClass,
      centerDialogVisible: false,
      evaluatDialogVisible: false,
      options: options,
      btnShow: false,
      tableWidth:'300',
      block: "", //拉黑原因描述,
      rowIndex: null, //选中当前行下标
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      tableData: [
        {
          id: "1",
          date: "2016-05-025",
          name: "王小虎1",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 20066333
        },
        {
          id: "2",
          date: "2016-05-025",
          name: "王小虎1",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          id: "3",
          date: "2016-05-025",
          name: "王小虎1",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
    },
    addStaffClick() {
      this.$router.push({ path: "/LabourNewlyadded" });
    },
    //删除
    deleteRowClick() {
      handleCofirm("确认删除", "warning")
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
    acrosstheClick(index, scope) {
      console.log("mouseover");
      this.tableWidth='400'
      this.rowIndex = index;
    },
    acrosstClick(index, scope) {
      var index = null
      this.tableWidth='300'
      this.rowIndex = index;
      // this.btnShow =
    },

    //导出
    importStaffClick() {},
    //导入
    exportStaffClick() {},
    handleSelectionChange(val) {},
    //拉黑
    blockClick() {
      this.centerDialogVisible = true;
    },
    handleButton() {
      console.log(this.formInline.region);
    },
    //评价
    evaluateClick() {
      this.evaluatDialogVisible = true;
    },
    //文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
<style lang="stylus">
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.roster {
  margin: 0 25px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
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

.hei {
  background: #000;
  color: #fff;
  width: 60px;
  height: 33px;
}

.showMore {
  width: 100px;

  // position: absolute;
  // bottom : 0;
  // right:0;
  .btn {
    margin-top: 10px;
    float: left;
  }
}
</style>