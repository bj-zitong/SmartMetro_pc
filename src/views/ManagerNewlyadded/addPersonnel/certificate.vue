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
          <div class="add" v-for="(item,index) in form.productGroup" :key="index">
            <i class="el-icon-remove-outline" @click="deleteLadder(index)"></i>
            <!-- <i class="el-icon-remove-outline" @click="deleteLadder(index)"></i>&nbsp;&nbsp;
            <i class="el-icon-circle-plus-outline" @click="addLadder" v-if="index==0"></i>-->
            <el-col>
              <el-form-item
                label="真伪查询"
                :prop="`productGroup.${index}.authenticityQuery`"
                :rules="rules.authenticityQuery"
              >
                <el-input v-model="item.authenticityQuery" placeholder="请输入发证单位"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="证书名称"
                :prop="`productGroup.${index}.certificateName`"
                :rules="rules.certificateName"
              >
                <el-input v-model="item.certificateName" placeholder="请输入证书名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="发证机关"
                :prop="`productGroup.${index}.issuingAuthority`"
                :rules="rules.issuingAuthority"
              >
                <el-input v-model="item.issuingAuthority" placeholder="请输入发证机关"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="证书类型"
                :prop="`productGroup.${index}.certificateType`"
                :rules="rules.certificateType"
              >
                <el-select v-model="item.certificateType" placeholder="请输入证书类型">
                  <el-option label="类型一" value="type1"></el-option>
                  <el-option label="类型二" value="type2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="专业编码"
                :prop="`productGroup.${index}.ProfessionalCode`"
                :rules="rules.ProfessionalCode"
              >
                <el-input v-model="item.ProfessionalCode" placeholder="请输入专业编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="证书等级"
                :prop="`productGroup.${index}.certificateLevel`"
                :rules="rules.certificateLevel"
              >
                <el-select v-model="item.certificateLevel" placeholder="请输入证书等级">
                  <el-option label="一级" value="type1"></el-option>
                  <el-option label="二级" value="type2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="发证日期"
                :prop="`productGroup.${index}.value1`"
                :rules="rules.value1"
              >
                <el-date-picker v-model="item.value1" type="datetime" placeholder="请选择日期"></el-date-picker>
                <!-- <el-date-picker v-model="item.value1" type="date" placeholder="请选择日期"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="有效时间"
                :prop="`productGroup.${index}.value2`"
                :rules="rules.value2"
              >
                <el-date-picker v-model="item.value2" type="datetime" placeholder="请选择有效时间"></el-date-picker>
                <!-- <el-date-picker v-model="item.value2" type="date" placeholder="请选择有效时间"></el-date-picker> -->
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="资格状态"
                :prop="`productGroup.${index}.status`"
                :rules="rules.status"
              >
                <el-select v-model="item.status" placeholder="资格状态">
                  <el-option label="未过期" value="notexpired"></el-option>
                  <el-option label="过期" value="expired"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="附件上传"
                :prop="`productGroup.${index}.upload`"
                :rules="rules.upload"
              >
                <el-upload
                  class="upload-demo"
                  v-model="item.upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  multiple
                  :limit="1"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <!-- <input type="file" v-model="item.ProfessionalCode" name="photoFile" /> -->
              <!-- <input type="text" v-model="item.count" readonly="readonly"/> -->
              <!-- $("#photoFile")[0].files[0] -->
            </el-col>
          </div>
          <el-col :span="24" style="float:right;height:40px;margin-top:20px">
            <el-form-item style="float:right">
              <!-- <i class="el-icon-circle-plus-outline" @click="addLadder"÷ v-if="index==0"></i> -->
              <el-button type="primary" round style="text-aligin:center" @click="addLadder">添加更多</el-button>
              <!-- <el-button type="primary" round style="text-aligin:center" @click="preservationClick">保存</el-button> -->
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item style="float:right;position:relative;bottom:0;">
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
//  field:"payrollRecords",
import { handleCofirm } from "@/utils/confirm";
export default {
  data() {
    return {
      activeName: "",
      labelPosition: "left",
      options: options,
      field: "certificate",
      form: {
        productGroup: [
          {
            authenticityQuery: "",
            certificateName: "",
            issuingAuthority: "",
            certificateType: "",
            ProfessionalCode: "",
            certificateLevel: "",
            value1: "",
            value2: "",
            status: "",
            upload: ""
          }
        ]
      },
      getImgCodeResults: "",
      keyResults: "",
      // 校验规则
      rules: {
        authenticityQuery: [
          { required: true, message: "请输入真伪查询", trigger: "blur" }
        ],
        certificateName: [
          { required: true, message: "请输入证书名称", trigger: "blur" }
        ],
        issuingAuthority: [
          { required: true, message: "请输入发证机关", trigger: "blur" }
        ],
        certificateType: [
          { required: true, message: "请输入证书类型", trigger: "blur" }
        ],
        ProfessionalCode: [
          { required: true, message: "请输入专业编码", trigger: "blur" }
        ],
        certificateLevel: [
          { required: true, message: "请输入证书等级", trigger: "blur" }
        ],
        value1: [
          { required: true, message: "请输入发证日期", trigger: "blur" }
        ],
        value2: [
          { required: true, message: "请选择有效时间", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择资格状态", trigger: "blur" }
        ],
        upload: [
          { required: true, message: "请选择附件上传", trigger: "change" }
        ]
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
    if (sessionStorage.getItem("certificate") != null) {
      // alert('000000')

      JSON.parse(sessionStorage.getItem("certificate")).productGroup.filter(
        (item, index, arr) => {
          console.log(item);
          // return item.hot == true;
        }
      );
      this.form = JSON.parse(sessionStorage.getItem("certificate"));
    }
    // if (sessionStorage.getItem("data") != null) {
    //   this.form = JSON.parse(sessionStorage.getItem("data"));
    //   let name = JSON.parse(sessionStorage.getItem("data")).photo[0].name;
    //   this.fileList.push({ name });
    //   // console.log(this.form.photo)
    // }
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
              sessionStorage.setItem("certificate", JSON.stringify(this.form));
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
    addLadder() {
      this.form.productGroup.push({
        authenticityQuery: "",
        certificateName: "",
        issuingAuthority: "",
        certificateType: "",
        ProfessionalCode: "",
        certificateLevel: "",
        value1: "",
        value2: "",
        status: "",
        upload: ""
      });
    },
    deleteLadder(index) {
      if (this.form.productGroup.length > 1) {
        this.form.productGroup.splice(index, 1);
      }
    },
    getFile(file, fileList) {
      console.log(file.file);
      console.log(file, fileList);
    },
    getsuccessFile(response, file, fileList) {
      console.log(response, file, fileList);
    },
    uploadFile() {},
    handleChange(file, fileList) {
      this.$refs.form.clearValidate();
      console.log(fileList);
      this.form.productGroup[0].upload = fileList;
      this.form.productGroup.forEach((item, index, array) => {
        console.log(item);
        item.upload = fileList;
        // item[index]=fileList
        //执行代码
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

.add {
  background: #ccc;
  height: 600px;
}
</style>