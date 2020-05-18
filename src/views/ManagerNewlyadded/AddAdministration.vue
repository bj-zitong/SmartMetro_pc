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
            <el-form-item label="电话" prop="cellPhone" class="el-form-item">
              <el-input v-model="form.cellPhone" placeholder="请输入电话"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="部门" prop="department" class="el-form-item">
              <el-input v-model="form.department" placeholder="请输入部门"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="承建单位" prop="buildCorpName" class="el-form-item">
              <el-input v-model="form.buildCorpName" placeholder="请输入承建单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="岗位/职责" prop="jobType" class="el-form-item">
              <el-select v-model="form.jobType" placeholder="请选择岗位/职责">
                <el-option label="区域一" value="区域一"></el-option>
                <el-option label="区域二" value="区域二"></el-option>
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
            <el-form-item label="证件编码" prop="idCardCode">
              <el-input v-model="form.idCardCode" placeholder="请选择证件编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证" prop="idCardType">
              <el-select v-model="form.idCardType" placeholder="持证上岗">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="居住证办理日期" prop="residencePermitDate">
              <!-- <el-date-picker v-model="form.residencePermitDate" type="date" placeholder="请选择日期"></el-date-picker> -->
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
            <el-form-item label="人员类型" prop="workerType">
              <el-select v-model="form.workerType" placeholder="请选择人员类型">
                <el-option label="企业自有职工" value="企业自有职工"></el-option>
                <el-option label="劳务派遣人员" value="劳务派遣人员"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌" prop="politicsType">
              <el-select v-model="form.politicsType" placeholder="请选择政治面貌">
                <el-option label="企业自有职工" value="企业自有职工"></el-option>
                <el-option label="劳务派遣人员" value="劳务派遣人员"></el-option>
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
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="角色" prop="roleIds">
              <el-checkbox-group v-model="form.roleIds">
                <el-checkbox label="超级管理员"></el-checkbox>
                <el-checkbox label="项目负责人"></el-checkbox>
                <el-checkbox label="项目技术负责人"></el-checkbox>
                <el-checkbox label="智慧工地管理员"></el-checkbox>
                <el-checkbox label="BIM管理"></el-checkbox>
                <el-checkbox label="物资管理"></el-checkbox>
                <el-checkbox label="质量管理"></el-checkbox>
                <el-checkbox label="劳务管理"></el-checkbox>
                <el-checkbox label="生产管理"></el-checkbox>
                <el-checkbox label="安全管理"></el-checkbox>
                <el-checkbox label="其他"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>-->
          <el-form-item style="float:right">
            <el-button type="primary" round class="cancel-style" @click="cancelClick()">取消</el-button>
            <el-button type="primary" round @click="submitForm('form')">确认</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>-->
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
        cellPhone: "",
        department: "",
        buildCorpName: "",
        jobType: "",
        urgentLinkMan: "",
        urgentLinkManPhone: "",
        address: "",
        birthPlace: "",
        degree: "",
        cultureLevelType: "",
        idCardCode: "",
        residencePermitDate: "",
        workerType: "",
        politicsType: "",
        // roleIds: [],
        photo: ""
      },
      getImgCodeResults: "",
      keyResults: "",
      // 校验规则
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        cellPhone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        // department: [
        //   { required: true, message: "请输入部门", trigger: "blur" }
        // ],
        buildCorpName: [
          { required: true, message: "请输入承建单位", trigger: "blur" }
        ],
        jobType: [
          { required: true, message: "请选择岗位/职责", trigger: "blur" }
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
          { required: true, message: "请选择婚姻状况", trigger: "blur" }
        ],
        degree: [{ required: true, message: "请选择学位", trigger: "blur" }],
        cultureLevelType: [
          { required: true, message: "请选择文化程度", trigger: "blur" }
        ],
        idCardCode: [
          { required: true, message: "请选择证件编码", trigger: "blur" }
        ],
        idCardType: [
          { required: true, message: "请选择居住证", trigger: "blur" }
        ],
        residencePermitDate: [
          { required: true, message: "请选择居住证办理日期", trigger: "blur" }
        ],
        workerType: [
          { required: true, message: "请选择人员类型", trigger: "blur" }
        ],
        politicsType: [
          { required: true, message: "请选择政治面貌", trigger: "blur" }
        ],
        photo: [{ required: true, message: "请上传照片", trigger: "change" }]
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
      if (this.id !=undefined ) {
        
      }else{
       
      }
      console.log("id====", this.id);
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
    //取消
    cancelClick() {
      handleCofirm("确认取消吗？", "warning")
        .then(res => {
          this.$message({
            type: "success",
            message: "取消成功!"
          });
          this.$router.push({ path: "/roster/manager" });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
   
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var form = this.$refs["form"].model;
          handleCofirm("确认添加吗？", "warning").then(res => {
            var params = JSON.stringify(this.form);

            var url =
              "/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/manager";
            this.http.post(url, params).then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.$router.push({ path: "/roster/manager" });
              }
            });
          });
          console.log(params).catch(err => {
            this.$message({
              type: "info",
              message: "已取消添加"
            });
          });
        } else {
          console.log("error submit!!");
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