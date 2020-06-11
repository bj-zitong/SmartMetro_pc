<template>
  <el-container class="personal">
    <el-main class="main">
      <!-- <p>添加管理人员</p> -->
      <div>
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
               <el-radio v-model="form.gender" label="1">男</el-radio>
               <el-radio v-model="form.gender" label="2">女</el-radio>
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
            <el-form-item label="工种" class="region" prop="workerType">
              <el-select
                v-model="form.workerType"
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
                <el-option label="丧偶" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学位" prop="degree">
              <el-select v-model="form.degree" placeholder="请选择学位">
                <el-option label="身份证" value="sfz"></el-option>
                <el-option label="护照" value="hz"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文化程度" prop="cultureLevelType">
              <el-select v-model="form.cultureLevelType" placeholder="请选择文化程度">
                <el-option label="大专" value="1"></el-option>
                <el-option label="小学" value="2"></el-option>
                <el-option label="初中" value="3"></el-option>
                <el-option label="高中" value="4"></el-option>
                <el-option label="本科" value="5"></el-option>
                <el-option label="研究生" value="6"></el-option>
                <el-option label="博士" value="7"></el-option>
                <el-option label="硕士" value="8"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="idCardType" class="el-form-item">
              <el-select v-model="form.idCardType" placeholder="请选择证件类型">
                <el-option label="身份证" value="0"></el-option>
                <el-option label="护照" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="户口类型" prop="registrationType" class="el-form-item">
              <el-select v-model="form.registrationType" placeholder="请选择户口类型">
                <el-option label="农村户口" value="1"></el-option>
                <el-option label="城市户口" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件编码" prop="idCardCode">
              <el-input v-model="form.idCardCode" placeholder="请填写证件编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班组长" prop="isTeamLeader">
              <el-select v-model="form.isTeamLeader" placeholder="请选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="参加培训" prop="isProjectTrain">
              <el-select v-model="form.isProjectTrain" placeholder="请选择参加培训">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="持证上岗" prop="isRelatedCertificates">
              <el-select v-model="form.isRelatedCertificates" placeholder="请选择持证上岗">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证" prop="isResidencePermit">
              <el-select v-model="form.isResidencePermit" placeholder="请选择居住证">
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
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="请选择居住证日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特殊工种体检情况" prop="isSpecialWorkTypeCheckups">
              <el-select v-model="form.isSpecialWorkTypeCheckups" placeholder="请选择特殊工种体检情况">
                <el-option label="通过" value="0"></el-option>
                <el-option label="不通过" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班组" prop="teamId">
              <el-select v-model="form.teamId" placeholder="请选择班组">
                <el-option label="班组1" value="1"></el-option>
                <el-option label="班组2" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌" prop="politicsType">
              <el-select v-model="form.politicsType" placeholder="请选择政治面貌">
                <el-option label="党员" value="1"></el-option>
                <el-option label="团员" value="2"></el-option>
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
                :auto-upload="false"
                :limit="1"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item style="float:right;position:relative;bottom:6px;">
              <el-button type="primary" round class="cancel-style">取消</el-button>
              <el-button type="primary" round @click="submitForm('form')">提交</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import rules from "@/utils/rules";
import options from "@/common/options";
import { handleCofirm } from "@/utils/confirm";
import { beforeAvatarUpload } from "@/common/imgcompress";
// import { isValidUsername } from '@/utils/validate'
export default {
  data() {
    return {
      activeName: "second",
      labelPosition: "left",
      options: options,
      form: {
        name: "",
        gender: "",
        age: "",
        nation: "",
        workerType: "",
        cellPhone: "",
        buildCorpName: "",
        urgentLinkMan: "",
        urgentLinkManPhone: "",
        address: "",
        birthPlaceCode: "",
        cultureLevelType: "",
        maritalStatus: "",
        degree: "",
        idCardCode: "",
        residencePermit: "",
        residencePermitDate: "",
        idCardType: "",
        Personneltype: "",
        politicsType: "",
        photo: "",
        registrationType: "",
        isTeamLeader: "",
        isProjectTrain: "",
        isRelatedCertificates: "",
        isSpecialWorkTypeCheckups: ""
      },
      getImgCodeResults: "",
      keyResults: "",
      field: "personalPersonal", // 个人基本信息字段
      // 校验规则
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        workerType: [
          { required: true, message: "请选择工种", trigger: "blur" }
        ],
        cellPhone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        // department: [
        //   { required: true, message: "请输入部门", trigger: "blur" }
        // ],
        buildCorpName: [
          { required: true, message: "请输入承建单位", trigger: "blur" }
        ],
        // post: [{ required: true, message: "请选择岗位/职责", trigger: "blur" }],
        urgentLinkMan: [
          { required: true, message: "请输入紧急联系人", trigger: "blur" }
        ],
        urgentLinkManPhone: [
          { required: true, message: "请输入紧急联系人电话", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入现居住地", trigger: "blur" }
        ],
        birthPlaceCode: [
          { required: true, message: "请输入籍贯", trigger: "blur" }
        ],
        maritalStatus: [
          { required: true, message: "请选择婚姻状况", trigger: "blur" }
        ],
        degree: [{ required: true, message: "请选择学位", trigger: "blur" }],
        cultureLevelType: [
          { required: true, message: "请选择文化程度", trigger: "blur" }
        ],
        idCardCode: [
          { required: true, message: "请选择证件编码", trigger: "blur" }
        ],
        isResidencePermit: [
          { required: true, message: "请选择居住证", trigger: "blur" }
        ],
        residencePermitDate: [
          { required: true, message: "请选择居住证办理日期", trigger: "blur" }
        ],
        idCardType: [
          { required: true, message: "请选择证件类型", trigger: "blur" }
        ],
        teamId: [
          { required: true, message: "请选择班组", trigger: "blur" }
        ],
        politicsType: [
          { required: true, message: "请选择政治面貌", trigger: "blur" }
        ],
        photo: [{ required: true, message: "请上传照片", trigger: "change" }],
        // type: [{ required: true, message: "请选择人员类型", trigger: "blur" }],
        // region: [
        //   { required: true, message: "请选择人员类型", trigger: "blur" }
        // ],
        registrationType: [
          { required: true, message: "请选择户口类型", trigger: "blur" }
        ],
        isTeamLeader: [
          { required: true, message: "请选择班组长", trigger: "blur" }
        ],
        isProjectTrain: [
          { required: true, message: "请选择是否参加培训", trigger: "blur" }
        ],
        isRelatedCertificates: [
          { required: true, message: "请选择持证上岗", trigger: "blur" }
        ],
        isSpecialWorkTypeCheckups: [
          { required: true, message: "请选择特殊工种体检情况", trigger: "blur" }
        ]
      },
      //图片上传
      fileList: [],
      value1: "",
      value2: ""
    };
  },
  mounted() {
    if (sessionStorage.getItem("data") != null) {
      this.form = JSON.parse(sessionStorage.getItem("data"));
      let name = JSON.parse(sessionStorage.getItem("data")).photo.name;
      console.log(name)
      this.fileList.push({ name });
    }
  },
  methods: {
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // handleCofirm("确认保存吗", "warning")
            // .then(res => {
              this.$global_msg.photo=this.form.photo
              sessionStorage.setItem("data", JSON.stringify(this.form));
              console.log(sessionStorage.getItem("data"));
              console.log(JSON.stringify(this.form));
              this.$emit("field", this.field);
              this.$message({
                type: "success",
                message: "保存成功!"
              });
            // })
            // .catch(err => {
            //   this.$message({
            //     type: "info",
            //     message: "已取消保存"
            //   });
            // });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //  beforeRemove(file, fileList) {
    //     return this.$confirm(`确定移除 ${ file.name }？`);
    //   },
    //保存
    preservationClick() {},
    handleChange(file, fileList) {
      console.log(file, fileList)
      this.$refs.form.clearValidate();
      this.form.photo = file;
      // this.form.photo1 = fileList;
    },
    beforeAvatarUpload(file) {
      return new Promise(resolve => {
        console.log(resolve);
      });
    },
    //图片上传失败调用
    imgUploadError(err, file, fileList) {
      this.$message.error("上传图片失败!");
    },
    gobeyondExceed(files, fileList) {
      this.$message({
        message: "请删除当前已经上传的",
        type: "warning"
      });
    },
    handleButton() {}
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
