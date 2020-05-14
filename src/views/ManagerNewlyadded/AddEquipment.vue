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
          <el-form-item prop="id">
            <el-input v-model="form.id" type="text" hidden></el-input>
          </el-form-item>
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
                <el-option label="身份证" value="1"></el-option>
                <el-option label="护照" value="2"></el-option>
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
          <el-col :span="10">
            <el-form-item label="籍贯" prop="nativePlace">
              <el-input v-model="form.nativePlace" placeholder="请输入籍贯"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="职务" prop="post">
              <el-select v-model="form.post" placeholder="请选择职务">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="护照" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="合同名称" prop="contractName">
              <el-input v-model="form.contractName" placeholder="请输入合同名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="专业" prop="professional">
              <el-input v-model="form.professional" placeholder="请输入专业名称"></el-input>
            </el-form-item>
          </el-col>
          <div style="float:right">
            <div style="margin-top:50px">
              <el-button
                type="primary"
                round
                style="background:#ccc;border:1px solid #ccc"
                @click="cancel()"
              >取消</el-button>
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
      form: {
        name: "",
        age: null,
        corporateName: "",
        gender: "",
        phoneNumber: "",
        major: "",
        documentType: "",
        politicalOutlook: "",
        certificateCode: "",
        nativePlace: "",
        post: "",
        contractName: "",
        professional: ""
      },
      rules: {
        corporateName: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        gender: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
           {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号格式"
          }
        ],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        documentType: [
          { required: true, message: "请选择证件类型", trigger: "blur" }
        ],
        politicalOutlook: [
          { required: true, message: "请选择政治面貌", trigger: "blur" }
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
        ],
        professional: [
          { required: true, message: "请输入专业", trigger: "blur" }
        ]
      },
      id: null
    };
  },
  activated() {
    var uid = this.$route.params.id;
    this.id = uid;
    if (this.id != 0) {
      this.getDeatli(this.id);
    }
  },
  methods: {
    cancel() {
      this.$router.push({ path: "/roster/equipmentSpecialist" });
    },
    //获得详情
    getDeatli(id) {
      this.form.corporateName = "1111";
      var url =
        "/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/equipment/" +
        this.id;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          var form = this.form;
          form.name = result.name;
          form.age = result.age;
          form.corporateName = result.company;
          form.contractName = result.contractName;
          form.gender = result.gender;
          form.phoneNumber = result.cellPhone;
          form.major = result.professional;
          form.documentType = result.idCardType;
          form.politicalOutlook = result.politicsType;
          form.certificateCode = result.idCardCode;
          form.professional = result.professional;
          form.post = result.duty;
        }
      });
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var form = this.$refs["form"].model;
          if (this.id == 0) {
            var params = JSON.stringify({
              company: form.corporateName,
              age: form.age,
              cellPhone: form.phoneNumber,
              politicsType: form.politicalOutlook,
              birthPlace: form.nativePlace,
              name: form.name,
              duty: form.post,
              gender: form.gender,
              idCardType: form.documentType,
              idCardCode: form.certificateCode,
              contractName: form.contractName,
              professional: form.professional
            });
            var url =
              "/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/equipment";
            this.http.post(url, params).then(res => {
              if (res.code == 200) {
                this.$router.push({ path: "/equipmentSpecialist" });
              }
            });
          } else {
            var params = JSON.stringify({
              company: form.corporateName,
              age: form.age,
              cellPhone: form.phoneNumber,
              name: form.name,
              gender: form.gender,
              politicsType: form.politicalOutlook,
              birthPlace: form.nativePlace,
              duty: form.post,
              idCardType: form.documentType,
              idCardCode: form.certificateCode,
              contractName: form.contractName,
              pInfoId: this.id,
              professional: form.professional
            });
            var url =
              "/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/equipment/" +
              this.id;
            this.http.put(url, params).then(res => {
              if (res.code == 200) {
                this.$router.push({ path: "/equipmentSpecialist" });
              }
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.AddEquipment {
  margin: 0 30px;

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
