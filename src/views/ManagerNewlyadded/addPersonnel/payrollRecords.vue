<template>
  <el-container class="payrollRecords">
    <el-main class="main">
      <el-form
        :label-position="labelPosition"
        label-width="160px"
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-col>
          <el-form-item label="工资单编号" prop="payRollCode">
            <el-input v-model="form.payRollCode" placeholder="请输入工资单编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="发放金额" prop="totalPayAmount">
            <el-input v-model="form.totalPayAmount" placeholder="请输入发放金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="发放日期" prop="balanceDate">
            <el-date-picker v-model="form.balanceDate" type="datetime" placeholder="请选择日期"></el-date-picker>
            <!-- <el-date-picker v-model="form.value1" type="date" placeholder="请选择日期"></el-date-picker> -->
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="发放方式" prop="provideType">
            <el-select v-model="form.provideType" placeholder="发放方式">
              <el-option label="现金" value="0"></el-option>
              <el-option label="电汇" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="发放银行" prop="provideBank">
            <el-select v-model="form.provideBank" placeholder="发放银行">
              <el-option label="交通银行" value="0"></el-option>
              <el-option label="建设银行" value="1"></el-option>
              <el-option label="工商银行" value="2"></el-option>
              <el-option label="农业银行" value="3"></el-option>
              <el-option label="招商银行" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="银行卡号" prop="bankCardNo">
            <el-input v-model="form.bankCardNo" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="24" style="float:right;height:40px;position:relative;bottom:10px;">
          <el-form-item style="float:right">
            <el-button type="primary" round style="text-aligin:center" @click="preservationClick">保存</el-button>
          </el-form-item>
        </el-col>-->
        <el-col :span="24">
          <el-form-item style="float:right;position:relative;bottom:6px;">
            <el-button type="primary" round class="cancel-style">取消</el-button>
            <el-button type="primary" round @click="submitForm('form')">提交</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
export default {
  data() {
    return {
      labelPosition: "left",
      form: {
        payRollCode: "",
        totalPayAmount: "",
        value1: "",
        distributionMethod: "",
        Bank: "",
        bankCardNo: ""
      },
      field: "payrollRecords",
      value1: "",
      rules: {
        payRollCode: [
          { required: true, message: "请输入工资单编号", trigger: "blur" }
        ],
        totalPayAmount: [
          { required: true, message: "请输入发放金额 ", trigger: "blur" }
        ],
        balanceDate: [{ required: true, message: "请输入日期 ", trigger: "blur" }],
        provideType: [
          { required: true, message: "请选择发放方式 ", trigger: "blur" }
        ],
        provideBank: [{ required: true, message: "请选择发放银行", trigger: "blur" }],
        bankCardNo: [
          { required: true, message: "请填写银行卡号", trigger: "blur" }
        ]
      },
      shortcuts: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          }
        },
        {
          text: "昨天",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          }
        },
        {
          text: "一周前",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          }
        }
      ]
    };
  },
  mounted() {
    if (sessionStorage.getItem("payrollRecords1") != null) {
      this.form = JSON.parse(sessionStorage.getItem("payrollRecords1"));
    }
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        // localStorage.setItem('payrollRecords',JSON.stringify(this.form))
        if (valid) {
          handleCofirm("确认保存吗", "warning")
            .then(res => {
              sessionStorage.setItem(
                "payrollRecords1",
                JSON.stringify(this.form)
              );
              this.$emit("field", this.field);
              this.$message({
                type: "success",
                message: "保存成功!"
              });
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "已取消保存"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.personal {
  .main {
    p {
      text-align: center;
      height: 60px;
      background: rgba(22, 155, 213, 1);
      line-height: 60px;
      font-size: 22px;
      font-weight: bold;
    }
  }
}

.el-main {
  color: #333;
  height: 100%;
  padding: 0;
}

.role {
  float: left;
  position: absolute;
  bottom: 50px;
}

.el-form-item {
  margin-left: 10px;
}

.el-form-item1 {
  margin-left: 10px;
}

.cancel-style {
  border-radius: 18px;
  height: 35px;
  border: 1px solid rgba(190, 190, 190, 1);
  background: linear-gradient(180deg, rgba(225, 225, 225, 1) 0%, rgba(190, 190, 190, 1) 100%);
  opacity: 1;
}
</style>