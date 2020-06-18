<template>
  <el-container class="AddOther">
    <el-main class="main">
      <p>添加管理人员</p>
      <div class="AddEquipment_form">
        <el-form
          :label-position="labelPosition"
          :rules="rules"
          label-width="140px"
          ref="form"
          :model="form"
        >
          <el-col :span="8">
            <el-form-item label="姓名" prop="name" class="el-form-item">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="gender" class="el-form-item">
              <el-radio v-model="form.gender" label="0">男</el-radio>
              <el-radio v-model="form.gender" label="1">女</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄" prop="age" class="el-form-item">
              <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族" prop="nation" class="el-form-item">
              <el-input v-model="form.nation" placeholder="请输入民族"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="电话" prop="cellPhone" class="el-form-item">
              <el-input v-model="form.cellPhone" placeholder="请输入电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承建单位" prop="buildCorpName" class="el-form-item">
              <el-input v-model="form.buildCorpName" placeholder="请输入承建单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="岗/职位" prop="jobType" class="el-form-item">
              <el-select v-model="form.jobType" placeholder="请选择岗/职位">
                <el-option label="xxxx1" value="0"></el-option>
                <el-option label="xxxx2" value="1"></el-option>
              </el-select>
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
          <el-col :span="16">
            <el-form-item label="现居住地" prop="address" class="el-form-item">
              <el-input v-model="form.address" placeholder="请输入现居住地"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="籍贯" prop="birthPlaceCode" class="el-form-item">
              <el-input v-model="form.birthPlaceCode" placeholder="请输入籍贯"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-select v-model="form.maritalStatus" placeholder="请选择婚姻状况">
                <el-option label="已婚" value="0"></el-option>
                <el-option label="未婚" value="1"></el-option>
                <el-option label="离异" value="2"></el-option>
                <el-option label="丧偶" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学位" prop="degree">
              <el-select v-model="form.degree" placeholder="请选择学位">
                <el-option label="身份证" value="0"></el-option>
                <el-option label="护照" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="idCardType">
              <el-select v-model="form.idCardType" placeholder="请选择学位">
                <el-option label="身份证" value="0"></el-option>
                <el-option label="护照" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文化程度" prop="cultureLevelType">
              <el-select v-model="form.cultureLevelType" placeholder="请选择文化程度">
                <el-option label="大专" value="0"></el-option>
                <el-option label="小学" value="1"></el-option>
                <el-option label="初中" value="2"></el-option>
                <el-option label="高中" value="3"></el-option>
                <el-option label="本科" value="4"></el-option>
                <el-option label="研究生" value="5"></el-option>
                <el-option label="博士" value="6"></el-option>
                <el-option label="硕士" value="7"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件编号" prop="idCardCode">
              <el-input v-model="form.idCardCode" placeholder="请输入证件编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证" prop="isResidencePermit">
              <el-select v-model="form.isResidencePermit" placeholder="持证上岗">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证办理日期" prop="residencePermitDate">
              <el-date-picker
                v-model="form.residencePermitDate"
                type="date"
                placeholder="请选择居住证办理日期"
                default-time="12:00:00"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人员类型" prop="workerType">
              <el-select v-model="form.workerType" placeholder="请选择人员类型">
                <el-option label="企业自有职工" value="0"></el-option>
                <el-option label="劳务派遣人员" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌" prop="politicsType">
              <el-select v-model="form.politicsType" placeholder="请选择政治面貌">
                <el-option label="党员" value="0"></el-option>
                <el-option label="团员" value="1"></el-option>
              </el-select>
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
                :limit="2"
                :on-exceed="handleExceed"
                :auto-upload="false"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-form-item style="float:right">
            <el-button type="primary" round class="cancel-style" @click.native="cancel('form')">取消</el-button>
            <el-button type="primary" round @click.native="submitForm('form')">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import rules from "@/utils/rules";
import { handleCofirm } from "@/utils/confirm";
// import { isValidUsername } from '@/utils/validate'
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
        politicsType: "",
        cellPhone: "",
        urgentLinkMan: "",
        urgentLinkManPhone: "",
        address: "",
        birthPlaceCode: "",
        buildCorpName: "",
        maritalStatus: "",
        degree: "",
        cultureLevelType: "",
        idCardType: "",
        idCardCode: "",
        isResidencePermit: "",
        residencePermitDate: "",
        jobType: "",
        workerType: "",
        photo: "",
        pinfoId: null
      },
      getImgCodeResults: "",
      keyResults: "",
      // 校验规则
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        cellPhone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        buildCorpName: [
          { required: true, message: "请输入承建单位", trigger: "blur" }
        ],
        jobType: [
          { required: true, message: "请选择岗/职位", trigger: "change" }
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
        birthPlaceCode: [
          { required: true, message: "请输入籍贯", trigger: "blur" }
        ],
        maritalStatus: [
          { required: true, message: "请选择婚姻状况", trigger: "change" }
        ],
        idCardType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        degree: [{ required: true, message: "请选择学位", trigger: "change" }],
        cultureLevelType: [
          { required: true, message: "请选择文化程度", trigger: "change" }
        ],
        idCardCode: [
          { required: true, message: "请输入证件编号", trigger: "blur" }
        ],
        isResidencePermit: [
          { required: true, message: "请选择居住证", trigger: "change" }
        ],
        residencePermitDate: [
          { required: true, message: "请选择居住证办理日期", trigger: "blur" }
        ],
        workerType: [
          { required: true, message: "请选择人员类型", trigger: "change" }
        ],
        politicsType: [
          { required: true, message: "请选择政治面貌", trigger: "change" }
        ],
        photo: [{ required: true, message: "请上传照片", trigger: "change" }]
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
    console.log("uid------" + uid);
    if (uid == "0") {
      console.log("新增");
    } else {
     //调用展示数据方法
     this.form.pinfoId=uid;
     this.getDetail();
     console.log();
    }
  },
  methods: {
    cancel(form) {
      this.$refs[form].resetFields();
      Object.assign(this.$data.form, this.$options.data().form); //数据初始化
      this.$router.push({ path: "/roster/manager" });
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
    handleExceed(files, fileList) {
      console.log(this.fileList);
      console.log(fileList);
      this.fileList.splice(0, 1, fileList);
      console.log(this.fileList);
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    getDetail() {
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/manager/" +
        this.form.pinfoId;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          this.form = res.data;
        }
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.pinfoId == null) {
            var form = this.$refs["form"].model;
            handleCofirm("确认添加吗？", "warning")
              .then(res => {
                let formData = new FormData();
                formData.append("name", form.name);
                formData.append("gender", form.gender);
                formData.append("age", form.age);
                formData.append("nation", form.nation);
                formData.append("politicsType", form.politicsType);
                formData.append("cellPhone", form.cellPhone);
                formData.append("buildCorpName", form.buildCorpName);
                formData.append("urgentLinkMan", form.urgentLinkMan);
                formData.append("urgentLinkManPhone", form.urgentLinkManPhone);
                formData.append("address", form.address);
                formData.append("birthPlaceCode", form.birthPlaceCode);
                formData.append("jobType", form.jobType);
                formData.append("maritalStatus", form.maritalStatus);
                formData.append("degree", form.degree);
                formData.append("cultureLevelType", form.cultureLevelType);
                formData.append("idCardType", form.idCardType);
                formData.append("idCardCode", form.idCardCode);
                formData.append("isResidencePermit", form.isResidencePermit);
                formData.append(
                  "residencePermitDate",
                  form.residencePermitDate
                );
                formData.append("workerType", form.workerType);
                formData.append("photo", form.photo[0].raw);
                console.log(form.photo[0].raw);
                var url =
                  "/bashUrl/smart/worker/roster/" +
                  sessionStorage.getItem("userId") +
                  "/manager";
                this.http.post(url, formData).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: "success",
                      message: "添加成功!"
                    });
                    this.$router.push({ path: "/roster/manager" });
                    this.cancel(formName);
                  }
                });
              })
              .catch(err => {
                this.$message({
                  type: "info",
                  message: "已取消添加"
                });
              });
          } else {
            var form = this.$refs["form"].model;
            handleCofirm("确认编辑吗？", "warning")
              .then(res => {
                let formData = new FormData();
                formData.append("name", form.name);
                formData.append("gender", form.gender);
                formData.append("age", form.age);
                formData.append("nation", form.nation);
                formData.append("politicsType", form.politicsType);
                formData.append("cellPhone", form.cellPhone);
                formData.append("buildCorpName", form.buildCorpName);
                formData.append("urgentLinkMan", form.urgentLinkMan);
                formData.append("urgentLinkManPhone", form.urgentLinkManPhone);
                formData.append("address", form.address);
                formData.append("birthPlaceCode", form.birthPlaceCode);
                formData.append("jobType", form.jobType);
                formData.append("maritalStatus", form.maritalStatus);
                formData.append("degree", form.degree);
                formData.append("cultureLevelType", form.cultureLevelType);
                formData.append("idCardType", form.idCardType);
                formData.append("idCardCode", form.idCardCode);
                formData.append("isResidencePermit", form.isResidencePermit);
                formData.append(
                  "residencePermitDate",
                  form.residencePermitDate
                );
                formData.append("workerType", form.workerType);
                formData.append("photo", form.photo[0].raw);
                formData.append("pinfoId", form.pinfoId);
                var url =
                  "/bashUrl/smart/worker/roster/" +
                  sessionStorage.getItem("userId") +
                  "/manager/" +
                  form.pinfoId;
                this.http.put(url, formData).then(res => {
                  if (res.code == 200) {
                    this.$message({
                      type: "success",
                      message: "编辑成功!"
                    });
                    this.$router.push({ path: "/roster/manager" });
                    this.cancel(formName);
                  }
                });
              })
              .catch(err => {
                this.$message({
                  type: "info",
                  message: "已取消添加"
                });
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleChange(file, fileList) {
      this.fileList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的csv文件
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
  margin: 30px 25px 0 25px;
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
