<template>
  <el-container class="personal">
    <el-main class="main">
      <el-form :label-position="labelPosition" label-width="160px" :model="form" :rules="rules" ref="form">
        <el-col>
          <el-form-item label="项目编号" prop="projectNo">
            <el-input v-model="form.projectNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="form.projectName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="合同编号" prop="contractNo">
            <el-input v-model="form.contractNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="合同期限" prop="contractPeriod">
            <el-input v-model="form.contractPeriod"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="结算方式" prop="settlementMethod">
            <el-input v-model="form.settlementMethod"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="所属企业组织机构代码" prop="enterpriseCode">
            <el-input v-model="form.enterpriseCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="float:right;height:40px;position:relative;bottom:10px;">
          <el-form-item style="float:right">
            <el-button type="primary" round style="text-aligin:center">保存</el-button>
          </el-form-item>
        </el-col>
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
export default {
  data() {
    return {
      labelPosition: "left",
      form: {
        name: "",
        gender: "",
        type: [],
        region: ""
      },
      rules: {
        projectNo: [
          { required: true, message: "请输入项目编号", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        contractNo: [
          { required: true, message: "请输入合同编号", trigger: "blur" }
        ],
        contractPeriod: [
          { required: true, message: "请输入合同期限", trigger: "blur" }
        ],
        ProfessionalCode: [
          { required: true, message: "请输入结算方式", trigger: "blur" }
        ],
        enterpriseCode: [
          { required: true, message: "请输入企业代码", trigger: "blur" }
        ],
        settlementMethod: [
          { required: true, message: "请输入结算方式", trigger: "blur" }
        ],
      },
    };
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