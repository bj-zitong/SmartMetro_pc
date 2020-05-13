<template>
  <div class="main-box">
    <!-- 头部 -->
    <el-container>
      <el-menu class="main-top-box">
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
      </el-menu>
    </el-container>
    <!-- 主体 -->
    <el-container>
      <el-menu class="main-con-box">
        <div class="main-btn-box">
          <!-- <el-main class="btnView"> -->
          <el-button class="T-H-B-DarkBlue" @click="addStaffClick">新增</el-button>
          <el-button class="T-H-B-Grey" @click="deleteAllClick">删除</el-button>
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
        </div>

        <div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            :header-cell-style="headClass"
            tooltip-effect="dark"
            style="width: 100%;"
            @selection-change="changeFun"
          >
            <el-table-column fixed type="selection" prop="id" @selection-change="changeFun"></el-table-column>
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
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background layout="prev, pager, next" :total="1000" class="pagination-box"></el-pagination>
          <!-- </el-main> -->
        </div>
      </el-menu>
    </el-container>

    <!-- 拉黑原因弹出框 -->
    <el-dialog title="拉黑原因" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form
        ref="from"
        :rules="rules"
        :model="from"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item prop="Reason" label="原因描述">
          <el-input type="textarea" v-model="from.Reason"></el-input>
        </el-form-item>
        <el-form-item prop="photo" label="证明材料">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            v-model="from.photo"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-change="handleChange"
             multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
       <span slot="footer" class="dialog-footer">
          <el-button class="F-Grey" round @click="centerDialogVisible = false">取消</el-button>
          <el-button class="F-Blue" round @click="addSubmitForm('from')">确定</el-button>
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
    <personneldialog v-if="changOrder" ref="turnOrder" />
  </div>
</template>
<script>
import options from "@/common/options";
import { handleCofirm } from "@/utils/confirm";
import { headClass } from "@/utils";
import personneldialog from "./dialog/personneldialog";
export default {
  name: "echarts",
  components: {
    personneldialog
  },
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      from: {
        Reason: "",
        photo:''
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
      tableWidth: "300",
      block: "", //拉黑原因描述,
      rowIndex: null, //选中当前行下标
      changOrder: false, //查看详情
      fileList: [
        {
          name: "food.jpeg",
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
      ],
      rules: {
        Reason: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
        photo: [{ required: true, message: "请输入图片", trigger: "change" }],
      }
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
    //批量删除
    deleteAllClick() {
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
      this.tableWidth = "400";
      this.rowIndex = index;
    },
    acrosstClick(index, scope) {
      var index = null;
      this.tableWidth = "300";
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
    //获取删除所有勾选项
    changeFun() {
      var ids = new Array();
      var arrays = this.$refs.multipleTable.selection;
      for (var i = 0; i < arrays.length; i++) {
        // 获得id
        var id = arrays[i].id;
        ids.push(id);
      }
      return ids;
    },
    //查看详情
    handleClick() {
      let _this = this;
      _this.changOrder = true;
      _this.$nextTick(() => {
        _this.$refs.turnOrder.init();
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
    addSubmitForm(from) {
      // 验证
      this.$refs[from].validate(valid => {
        if (valid) {
          // alert("99999")
          // // 添加劳务人员请求
          // var params = JSON.stringify(this.addLabor);
          // this.http
          //   .post("smart/worker/labour/1/company/management", params)
          //   .then(res => {
          //     if (res.code == 200) {
          //       this.$message({
          //         type: "success",
          //         message: "添加成功!"
          //       });
          //     }
          //   })
          //   .catch(res => {
          //     if (res.code === 404) {
          //       this.$message({
          //         type: "success",
          //         message: "预留跳转404页面!"
          //       });
          //     }
          //   });
          // this.addOpen = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     handleChange(file, fileList) {
      this.$refs.from.clearValidate();
      this.from.photo=fileList;
    }
  }
};
</script>
<style lang="stylus"></style>