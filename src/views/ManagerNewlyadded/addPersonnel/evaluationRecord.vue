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
        <el-form-item label="评价记录" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-col :span="24" style="float:right;height:40px;">
          <el-form-item style="float:right">
            <el-button type="primary" round style="text-aligin:center" @click="preservationClick">保存</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item style="float:right;position:relative;bottom:0;">
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
      field: "evaluationRecord",
      form: {
        desc: ""
      },
      value1: "",
      rules: {
        desc: [{ required: true, message: "请输入评价记录", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (localStorage.getItem("History") != null) {
      this.form = JSON.parse(localStorage.getItem("History"));
    }
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    preservationClick() {
      handleCofirm("确认保存吗", "warning")
        .then(res => {
          localStorage.setItem("History", JSON.stringify(this.form));
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