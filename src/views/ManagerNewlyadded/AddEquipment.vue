<template>
  <el-container class="AddEquipment">
    <el-main class="main">
      <p>添加设备专用人员</p>
      <div class="AddEquipment_form">
        <el-form
          :label-position="labelPosition"
          label-width="160px"
          :model="form"
          :rules="rules"
          ref="form"
        >
          <el-col :span="10">
            <el-form-item label="公司名称" prop="corporateName">
              <el-input v-model="form.corporateName" placeholder="请输入公司名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="性别" prop="gender">
              <el-input v-model="form.gender" placeholder="请输入性别"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手机号码" prop="phoneNumber">
              <el-input v-model="form.phoneNumber" placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="证件类型" prop="documentType">
              <el-select v-model="form.documentType" placeholder="请选择证件类型">
                <el-option label="身份证" value="id"></el-option>
                <el-option label="护照" value="passport"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="政治面貌" prop="politicalOutlook">
              <el-input v-model="form.politicalOutlook" placeholder="请输入政治面貌"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="证件编码" prop="certificateCode">
              <el-input v-model="form.certificateCode" placeholder="请输入证件编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="籍贯" prop="nativePlace">
              <el-input v-model="form.nativePlace" placeholder="请输入籍贯"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="职务" prop="post">
              <el-select v-model="form.post" placeholder="请选择职务">
                <el-option label="身份证" value="id"></el-option>
                <el-option label="护照" value="passport"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合同名称" prop="contractName">
              <el-input v-model="form.contractName" placeholder="请输入合同名称"></el-input>
            </el-form-item>
          </el-col>
          <div style="float:right">
            <div style="margin-top:50px">
              <el-button type="primary" round style="background:#ccc;border:1px solid #ccc">取消</el-button>
              <el-button type="primary" round @click="submitForm('form')">提交</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "left",
      form:{

      },
      rules: {
        corporateName: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        gender: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        documentType: [
          { required: true, message: "请选择证件类型", trigger: "blur" }
        ],
        politicalOutlook: [
          { required: true, message: "请选择专业", trigger: "blur" }
        ],
        certificateCode: [
          { required: true, message: "请输入证件编码", trigger: "blur" }
        ],
        nativePlace: [
          { required: true, message: "请输入籍贯", trigger: "blur" }
        ],
        post: [{ required: true, message: "请选择职务", trigger: "blur" }],
        contractName: [
          { required: true, message: "请输入合同名称", trigger: "blur" }
        ]
      }
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
.AddEquipment {
  background: red;
  margin: 0 25px;

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

.AddEquipment_form {
  padding: 0 20px;
  margin-top: 30px;
}

.el-form-item {
  margin-left: 10px;
}

.el-main {
  background: rgba(255, 255, 255, 1);
  color: #333;
  height: 100%;
}
</style>