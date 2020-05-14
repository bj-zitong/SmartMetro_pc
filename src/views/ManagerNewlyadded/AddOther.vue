<template>
  <el-container class="AddOther">
    <el-main class="main">
      <p>添加其他服务类人员</p>
      <div class="AddEquipment_form">
        <el-form
          :label-position="labelPosition"
          label-width="140px"
          :model="form"
          :rules="rules"
          ref="form"
        >
          <el-form-item prop="pInfoId">
            <el-input v-model="form.pInfoId" type="text" hidden></el-input>
          </el-form-item>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name" class="el-form-item">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="gender">
              <el-input v-model="form.gender" placeholder="请输入性别"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族" prop="nation">
              <el-input v-model="form.nation" placeholder="请输入民族"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="cellPhone">
              <el-input v-model="form.cellPhone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌" prop="politicsType ">
              <el-input v-model="form.politicsType " placeholder="请输入政治面貌"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="紧急联系人" prop="urgentLinkMan" class="el-form-item">
              <el-input v-model="form.urgentLinkMan" placeholder="请输入紧急联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="urgentLinkManPhone" class="el-form-item">
              <el-input v-model="form.urgentLinkManPhone" placeholder="请输入电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="现居住地" prop="address" class="el-form-item">
              <el-input v-model="form.address" placeholder="请输入现居住地"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="籍贯" prop="birthPlace" class="el-form-item">
              <el-input v-model="form.birthPlace" placeholder="请输入籍贯"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-select v-model="form.maritalStatus" placeholder="请选择婚姻状况">
                <el-option label="已婚" value="已婚"></el-option>
                <el-option label="未婚" value="未婚"></el-option>
                <el-option label="离异" value="离异"></el-option>
                <el-option label="丧偶" value="丧偶"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学位" prop="degree">
              <el-select v-model="form.degree" placeholder="请选择学位">
                <el-option label="身份证" value="身份证"></el-option>
                <el-option label="护照" value="护照"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文化程度" prop="cultureLevelType">
              <el-select v-model="form.cultureLevelType" placeholder="请选择文化程度">
                <el-option label="大专" value="大专"></el-option>
                <el-option label="小学" value="小学"></el-option>
                <el-option label="初中" value="初中"></el-option>
                <el-option label="高中" value="高中"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="研究生" value="研究生"></el-option>
                <el-option label="博士" value="博士"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="idCardType">
              <el-select v-model="form.idCardType" placeholder="请选择证件类型">
                <el-option label="身份证" value="1"></el-option>
                <el-option label="护照" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件编码" prop="idCardCode">
              <el-input v-model="form.idCardCode" placeholder="请输入证件编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工人类型" prop="workerType">
              <el-select v-model="form.workerType" placeholder="请选择工人类型">
                <el-option label="厨师" value="shanghai"></el-option>
                <el-option label="保安" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="持证上岗" prop="isRelatedCertificates">
              <el-select v-model="form.isRelatedCertificates" placeholder="请选择持证上岗">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证" prop="isResidencePermit">
              <el-select v-model="form.isResidencePermit" placeholder="请选择居住证">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证办理日期" prop="residencePermitDate">
              <el-date-picker
                v-model="form.residencePermitDate"
                type="datetime"
                placeholder="请选择居住证办理日期"
                default-time="12:00:00"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="一寸照片" prop="photo">
              <el-upload
                class="upload-demo"
                v-model="form.photo"
                action
                :on-change="handleChange"
                :file-list="fileList"
                :auto-upload="false"
                :limit="1"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
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
      activeName: "second",
      labelPosition: "left",
      form: {
        name: "",
        gender: "",
        age: "",
        nation: "",
        cellPhone: "",
        politicsType: "",
        urgentLinkMan: "",
        urgentLinkManPhone: "",
        address: "",
        birthPlace: "",
        maritalStatus: "",
        degree: "",
        cultureLevelType: "",
        idCardType: "",
        idCardCode: "",
        isResidencePermit: "",
        isRelatedCertificates: "",
        residencePermitDate: "",
        workerType: "",
        photo: "",
        pInfoId: null
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        cellPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        politicalOutlook: [
          { required: true, message: "请输入政治面貌", trigger: "blur" }
        ],
        urgentLinkMan: [
          { required: true, message: "请输入紧急联系人", trigger: "blur" }
        ],
        urgentLinkManPhone: [
          { required: true, message: "请输入电话", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入现居住地", trigger: "blur" }
        ],
        birthPlace: [
          { required: true, message: "请输入籍贯", trigger: "blur" }
        ],
        maritalStatus: [
          { required: true, message: "请输入婚姻状况", trigger: "blur" }
        ],
        degree: [{ required: true, message: "请输入学位", trigger: "blur" }],
        cultureLevelType: [
          { required: true, message: "请输入文化程度", trigger: "blur" }
        ],
        idCardType: [
          { required: true, message: "请输入证件类型", trigger: "blur" }
        ],
        idCardCode: [
          { required: true, message: "请输入证件编码", trigger: "blur" }
        ],
        workerType: [
          { required: true, message: "请选择工人类型", trigger: "blur" }
        ],
        isRelatedCertificates: [
          { required: true, message: "请选择持证上岗", trigger: "blur" }
        ],
        residencePermitDate: [
          { required: true, message: "请选择居住证办理日期", trigger: "blur" }
        ],
        isResidencePermit: [
          { required: true, message: "请选择居住证", trigger: "blur" }
        ],
        photo: [{ required: true, message: "请上传图片", trigger: "blur" }]
      },
      //日历选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
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
      },
      //图片上传
      fileList: [],
      value1: "",
      value2: ""
    };
  },
  activated() {
    var uid = this.$route.params.id;
    this.id = uid;
    if (!this.id==0) {
      this.getDeatli(this.id);
    }
  },
  methods: {
    //获得详情
    getDeatli(id) {
      this.form.name = "1111";
      var url =
        "/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/other/" +
        this.id;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          var form = this.form;
          form.name = result.name;
          form.gender = result.gender;
          form.age = result.age;
          form.nation = result.nation;
          form.cellPhone = result.cellPhone;
          form.politicsType = result.politicsType;
          form.urgentLinkMan = result.urgentLinkMan;
          form.urgentLinkManPhone = result.urgentLinkManPhone;
          form.address = result.address;
          form.birthPlace = result.birthPlace;
          form.maritalStatus = result.maritalStatus;
          form.degree = result.degree;
          form.cultureLevelType = result.cultureLevelType;
          form.idCardType = result.idCardType;
          form.idCardCode = result.idCardCode;
          form.isResidencePermit = result.isResidencePermit;
          form.isRelatedCertificates = result.isRelatedCertificates;
          form.residencePermitDate = result.residencePermitDate;
          form.workerType = result.workerType;
          form.photo = result.photoPath;
          form.pInfoId = this.id;
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    cancel() {
      this.$router.push({ path: "/roster/otherStaffs" });
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var form = this.$refs["form"].model;
          if (this.id == 0) {
            var data = new FormData();
            data.append("name", form.name);
            data.append("gender", form.gender);
            data.append("age", form.age);
            data.append("nation", form.nation);
            data.append("cellPhone", form.cellPhone);
            data.append("politicsType", form.politicsType);
            data.append("urgentLinkMan", form.urgentLinkMan);
            data.append("urgentLinkManPhone", form.urgentLinkManPhone);
            data.append("address", form.address);
            data.append("birthPlace", form.birthPlace);
            data.append("maritalStatus", form.maritalStatus);
            data.append("degree", form.degree);
            data.append("cultureLevelType", form.cultureLevelType);
            data.append("idCardType", form.idCardType);
            data.append("idCardCode", form.idCardCode);
            data.append("isResidencePermit", form.isResidencePermit);
            data.append("isRelatedCertificates", form.isRelatedCertificates);
            data.append("residencePermitDate", form.residencePermitDate);
            data.append("workerType", form.workerType);
            data.append("photo", form.photo[0].raw);
            //文件
            console.log(form.photo[0].raw);
            var url =
              "/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/other";
            this.http.post(url, data).then(res => {
              if (res.code == 200) {
                this.$router.push({ path: "/roster/otherStaffs" });
              }
            });
          } else {
            // var params = JSON.stringify({
            //   name: form.name,
            //   gender: form.gender,
            //   age: form.age,
            //   nation: form.nation,
            //   cellPhone: form.cellPhone,
            //   politicsType: form.politicsType,
            //   urgentLinkMan: form.urgentLinkMan,
            //   urgentLinkManPhone: form.urgentLinkManPhone,
            //   address: form.address,
            //   birthPlace: form.birthPlace,
            //   maritalStatus: form.maritalStatus,
            //   degree: form.degree,
            //   cultureLevelType: form.cultureLevelType,
            //   idCardType: form.idCardType,
            //   idCardCode: form.idCardCode,
            //   isResidencePermit: form.isResidencePermit,
            //   isRelatedCertificates: form.isRelatedCertificates,
            //   residencePermitDate: form.residencePermitDate,
            //   workerType: form.workerType,
            //   photo: form.photo
            // });
            var data = new FormData();
            data.append("name", form.name);
            data.append("gender", form.gender);
            data.append("age", form.age);
            data.append("nation", form.nation);
            data.append("cellPhone", form.cellPhone);
            data.append("politicsType", form.politicsType);
            data.append("urgentLinkMan", form.urgentLinkMan);
            data.append("urgentLinkManPhone", form.urgentLinkManPhone);
            data.append("address", form.address);
            data.append("birthPlace", form.birthPlace);
            data.append("maritalStatus", form.maritalStatus);
            data.append("degree", form.degree);
            data.append("cultureLevelType", form.cultureLevelType);
            data.append("idCardType", form.idCardType);
            data.append("idCardCode", form.idCardCode);
            data.append("isResidencePermit", form.isResidencePermit);
            data.append("isRelatedCertificates", form.isRelatedCertificates);
            data.append("residencePermitDate", form.residencePermitDate);
            data.append("workerType", form.workerType);
             data.append("photo", form.photo[0].raw);
            var url =
              "/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/other/" +
              this.id;
            this.http.put(url, data).then(res => {
              if (res.code == 200) {
                this.$router.push({ path: "/roster/otherStaffs" });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    handleChange(file, fileList) {
      this.$refs.form.clearValidate();
      this.form.photo = fileList;
    }
  }
};
</script>
<style lang="stylus" scoped>
.AddOther {
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

.el-main {
  background: rgba(255, 255, 255, 1);
  color: #333;
  height: 100%;
}

.AddEquipment_form {
  margin-top: 30px;
}

.el-form-item {
  margin-left: 30px;
}
</style>
