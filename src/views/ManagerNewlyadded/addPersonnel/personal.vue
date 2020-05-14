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
              <el-input v-model="form.gender" placeholder="请输入性别"></el-input>
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
            <el-form-item label="工种" class="region" prop="region">
              <el-select
                v-model="form.region"
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
            <el-form-item label="电话" prop="telephone" class="el-form-item">
              <el-input v-model="form.telephone" placeholder="请输入电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承建单位" prop="Company" class="el-form-item">
              <el-input v-model="form.Company" placeholder="请输入承建单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="部门" prop="department" class="el-form-item">
              <el-input v-model="form.department" placeholder="请输入部门"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="紧急联系人" prop="emergencycontact" class="el-form-item">
              <el-input v-model="form.emergencycontact" placeholder="请输入紧急联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="emergencyTelephone" class="el-form-item">
              <el-input v-model="form.emergencyTelephone" placeholder="请输入电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="现居住地" prop="Currentresidence" class="el-form-item">
              <el-input v-model="form.Currentresidence" placeholder="请输入现居住地"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="籍贯" prop="nativeplace" class="el-form-item">
              <el-input v-model="form.nativeplace" placeholder="请输入籍贯"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="maritalStatus">
              <el-select v-model="form.maritalStatus" placeholder="请选择婚姻状况">
                <el-option label="已婚" value="yihun"></el-option>
                <el-option label="未婚" value="weihun"></el-option>
                <el-option label="离异" value="liyi"></el-option>
                <el-option label="丧偶" value="sango"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学位" prop="AcademicDegree">
              <el-select v-model="form.AcademicDegree" placeholder="请选择学位">
                <el-option label="身份证" value="sfz"></el-option>
                <el-option label="护照" value="hz"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文化程度" prop="degree">
              <el-select v-model="form.degree" placeholder="请选择文化程度">
                <el-option label="大专" value="dazhuan"></el-option>
                <el-option label="小学" value="xiaoxue"></el-option>
                <el-option label="初中" value="chuzhong"></el-option>
                <el-option label="高中" value="gaozhong"></el-option>
                <el-option label="本科" value="benke"></el-option>
                <el-option label="研究生" value="yjs"></el-option>
                <el-option label="博士" value="boshi"></el-option>
                <el-option label="硕士" value="shuoshi"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="documentType" class="el-form-item">
              <el-select v-model="form.documentType" placeholder="请选择证件类型">
                <el-option label="身份证" value="shenfenzheng"></el-option>
                <el-option label="护照" value="huzhao"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="户口类型" prop="accountType" class="el-form-item">
              <el-select v-model="form.accountType" placeholder="请选择户口类型">
                <el-option label="城市户口" value="chengshi"></el-option>
                <el-option label="农村户口" value="nongchun"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件编码" prop="CertificateCode">
              <el-input v-model="form.CertificateCode" placeholder="请填写证件编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班组长" prop="foreman">
              <el-select v-model="form.foreman" placeholder="请选择班组长">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="参加培训" prop="training">
              <el-select v-model="form.training" placeholder="请选择参加培训">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="持证上岗" prop="certificate">
              <el-select v-model="form.certificate" placeholder="请选择持证上岗">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证" prop="residencePermit">
              <el-select v-model="form.residencePermit" placeholder="请选择居住证">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证办理日期" prop="date">
              <el-date-picker v-model="form.date" type="date" placeholder="请选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特殊工种体检情况" prop="PhysicalExamination">
              <el-select v-model="form.PhysicalExamination" placeholder="请选择特殊工种体检情况">
                <el-option label="已通过" value="ytg"></el-option>
                <el-option label="未通过" value="wtg"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班组" prop="Personneltype">
              <el-select v-model="form.Personneltype" placeholder="请选择班组">
                <el-option label="已通过" value="ytg"></el-option>
                <el-option label="未通过" value="wtg"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌" prop="Team">
              <el-select v-model="form.Team" placeholder="请选择政治面貌">
                <el-option label="企业自有职工" value="qiye"></el-option>
                <el-option label="劳务派遣人员" value="laowu"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="一寸照片" prop="UploadImg">
              <el-upload class="upload-demo" action :on-change="handleChange" :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="角色" prop="type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="超级管理员" name="type"></el-checkbox>
                <el-checkbox label="项目负责人" name="type"></el-checkbox>
                <el-checkbox label="项目技术负责人" name="type"></el-checkbox>
                <el-checkbox label="智慧工地管理员" name="type"></el-checkbox>
                <el-checkbox label="BIM管理" name="type"></el-checkbox>
                <el-checkbox label="物资管理" name="type"></el-checkbox>
                <el-checkbox label="质量管理" name="type"></el-checkbox>
                <el-checkbox label="劳务管理" name="type"></el-checkbox>
                <el-checkbox label="生产管理" name="type"></el-checkbox>
                <el-checkbox label="安全管理" name="type"></el-checkbox>
                <el-checkbox label="其他" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>-->
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
      </div>
    </el-main>
  </el-container>
</template>
<script>
import rules from "@/utils/rules";
import options from "@/common/options";
import { handleCofirm } from "@/utils/confirm";
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
        department: "",
        Company: "",
        post: "",
        emergencycontact: "",
        emergencyTelephone: "",
        Currentresidence: "",
        nativeplace: "",
        maritalStatus: "",
        AcademicDegree: "",
        degree: "",
        CertificateCode: "",
        residencePermit: "",
        date: "",
        documentType: "",
        Personneltype: "",
        PoliticalOutlook: "",
        UploadImg: "",
        type: "",
        region: "",
        accountType: "",
        foreman: "",
        training: "",
        certificate: "",
        PhysicalExamination: "",
        Team: ""
      },
      getImgCodeResults: "",
      keyResults: "",
      field: "personalPersonal", // 个人基本信息字段
      // 校验规则
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        telephone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        department: [
          { required: true, message: "请输入部门", trigger: "blur" }
        ],
        Company: [
          { required: true, message: "请输入承建单位", trigger: "blur" }
        ],
        post: [{ required: true, message: "请选择岗位/职责", trigger: "blur" }],
        emergencycontact: [
          { required: true, message: "请输入紧急联系人", trigger: "blur" }
        ],
        emergencyTelephone: [
          { required: true, message: "请输入电话", trigger: "blur" }
        ],
        Currentresidence: [
          { required: true, message: "请输入现居住地", trigger: "blur" }
        ],
        nativeplace: [
          { required: true, message: "请输入籍贯", trigger: "blur" }
        ],
        maritalStatus: [
          { required: true, message: "请选择婚姻状况", trigger: "blur" }
        ],
        AcademicDegree: [
          { required: true, message: "请选择学位", trigger: "blur" }
        ],
        degree: [
          { required: true, message: "请选择文化程度", trigger: "blur" }
        ],
        CertificateCode: [
          { required: true, message: "请选择证件编码", trigger: "blur" }
        ],
        residencePermit: [
          { required: true, message: "请选择居住证", trigger: "blur" }
        ],
        date: [
          { required: true, message: "请选择居住证办理日期", trigger: "blur" }
        ],
        documentType: [
          { required: true, message: "请选择证件类型", trigger: "blur" }
        ],
        Personneltype: [
          { required: true, message: "请选择人员类型", trigger: "blur" }
        ],
        PoliticalOutlook: [
          { required: true, message: "请选择政治面貌", trigger: "blur" }
        ],
        UploadImg: [{ required: true, message: "请上传照片", trigger: "" }],
        type: [{ required: true, message: "请选择人员类型", trigger: "blur" }],
        region: [
          { required: true, message: "请选择人员类型", trigger: "blur" }
        ],
        accountType: [
          { required: true, message: "请选择户口类型", trigger: "blur" }
        ],
        foreman: [{ required: true, message: "请选择班组长", trigger: "blur" }],
        training: [
          { required: true, message: "请选择参加培训", trigger: "blur" }
        ],
        certificate: [
          { required: true, message: "请选择持证上岗", trigger: "blur" }
        ],
        PhysicalExamination: [
          { required: true, message: "请选择特殊工种体检情况", trigger: "blur" }
        ],
        Team: [{ required: true, message: "请选择班组", trigger: "blur" }]
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
  mounted() {
    if (localStorage.getItem("data") != null) {
      this.form = JSON.parse(localStorage.getItem("data"));
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
          handleCofirm("确认保存吗", "warning")
            .then(res => {
              localStorage.setItem("data", JSON.stringify(this.form));
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
    },
    //保存
    preservationClick() {},
    handleChange(file, fileList) {
      this.$refs.form.clearValidate();
      this.form.photo = fileList;
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