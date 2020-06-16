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
                :prop="`productGroup.${index}.grantCompany`"
                :rules="rules.grantCompany"
              >
                <el-input v-model="item.grantCompany" placeholder="请输入发证单位"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="证书名称"
                :prop="`productGroup.${index}.certificationName`"
                :rules="rules.certificationName"
              >
                <el-input v-model="item.certificationName" placeholder="请输入证书名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="发证机关"
                :prop="`productGroup.${index}.grantOrg`"
                :rules="rules.grantOrg"
              >
                <el-input v-model="item.grantOrg" placeholder="请输入发证机关"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="证书类型"
                :prop="`productGroup.${index}.certificationType`"
                :rules="rules.certificationType"
              >
                <el-select v-model="item.certificationType" placeholder="请输入证书类型">
                  <el-option label="类型一" value="1"></el-option>
                  <el-option label="类型二" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="专业编码"
                :prop="`productGroup.${index}.certificationCode`"
                :rules="rules.certificationCode"
              >
                <el-input v-model="item.certificationCode" placeholder="请输入专业编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="证书等级"
                :prop="`productGroup.${index}.credentialLevelType`"
                :rules="rules.credentialLevelType"
              >
                <el-select v-model="item.credentialLevelType" placeholder="请选择证书等级">
                  <el-option label="一级" value="0"></el-option>
                  <el-option label="二级" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col>
              <el-form-item
                label="发证日期"
                :prop="`productGroup.${index}.value1`"
                :rules="rules.value1"
              >
                <el-date-picker v-model="item.value1" type="datetime" placeholder="请选择发证日期"></el-date-picker>
              </el-form-item>
            </el-col>-->
            <el-col>
              <el-form-item
                label="第一次发证时间"
                :prop="`productGroup.${index}.firstBeginDate`"
                :rules="rules.firstBeginDate"
              >
                <el-date-picker
                  v-model="item.firstBeginDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择第一次发证时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="合同起始时间"
                :prop="`productGroup.${index}.validBeginDate`"
                :rules="rules.validBeginDate"
              >
                <el-date-picker
                  v-model="item.validBeginDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择合同起始时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="合同结束时间"
                :prop="`productGroup.${index}.validEndDate`"
                :rules="rules.validEndDate"
              >
                <el-date-picker
                  v-model="item.validEndDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择合同结束时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="资格状态"
                :prop="`productGroup.${index}.certificationStatus`"
                :rules="rules.certificationStatus"
              >
                <el-select v-model="item.certificationStatus" placeholder="资格状态">
                  <el-option label="未过期" value="1"></el-option>
                  <el-option label="已过期" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                label="附件上传"
                :prop="`productGroup.${index}.accessory`"
                :rules="rules.accessory"
              >
                <el-upload
                  class="upload-demo"
                  v-model="form.accessory"
                  action
                  :on-change="handleChange"
                  :file-list="fileList"
                  :auto-upload="false"
                  :limit="1"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <!-- <input type="file" v-model="item.certificationCode" name="photoFile" /> -->
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
              <el-button type="primary" round class="cancel-style" @click.native="cancel('form')">取消</el-button>
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
  props:['data'],
  data() {
    return {
      activeName: "",
      labelPosition: "left",
      options: options,
      field: "certificate",
      form: {
        productGroup: [
          {
            grantCompany: "",
            certificationName: "",
            grantOrg: "",
            certificationType: "",
            certificationCode: "",
            credentialLevelType: "",
            value1: "",
            firstBeginDate: "",
            validBeginDate: "",
            validEndDate: "",
            certificationStatus: "",
            accessory: "",
            pInfoId:null
          }
        ]
      },
      getImgCodeResults: "",
      keyResults: "",
      // 校验规则
      rules: {
        grantCompany: [
          { required: true, message: "请输入真伪查询", trigger: "blur" }
        ],
        certificationName: [
          { required: true, message: "请输入证书名称", trigger: "blur" }
        ],
        grantOrg: [
          { required: true, message: "请输入发证机关", trigger: "blur" }
        ],
        certificationType: [
          { required: true, message: "请输入证书类型", trigger: "blur" }
        ],
        certificationCode: [
          { required: true, message: "请输入专业编码", trigger: "blur" }
        ],
        credentialLevelType: [
          { required: true, message: "请输入证书等级", trigger: "blur" }
        ],
        firstBeginDate: [
          { required: true, message: "请选择第一次发证时间", trigger: "blur" }
        ],
        validBeginDate: [
          { required: true, message: "请选择合同起始时间", trigger: "blur" }
        ],
        validEndDate: [
          { required: true, message: "请选择合同结束时间", trigger: "blur" }
        ],
        certificationStatus: [
          { required: true, message: "请选择资格状态", trigger: "blur" }
        ],
        accessory: [
          { required: true, message: "请选择附件上传", trigger: "change" }
        ]
      },
      //图片上传
      fileList: [],
      value1: "",
      value2: "",
      id:null
    };
  },
  activated(){
    this.id=this.data;
  },
  mounted() {
    // if(this.id==0){
      if (sessionStorage.getItem("certificate") != null) {
        JSON.parse(sessionStorage.getItem("certificate")).productGroup.filter(
          (item, index, arr) => {
            // return item.hot == true;
          }
        );
        this.form = JSON.parse(sessionStorage.getItem("certificate"));
      }
    // }
    // else{
    //    var url =
    //   "/bashUrl/smart/worker/roster/" +
    //   sessionStorage.getItem("userId") +
    //   "/labour/credential/" +
    //   this.id;
    // this.http.get(url, null).then(res => {
    //   if (res.code == 200) {
    //     //渲染数据
    //     var result = res.data;
    //     this.form=result;
    //     sessionStorage.setItem("certificate", JSON.stringify(this.form));
    //   }
    // });
    // }
  },
  methods: {
    handleClick(tab, event) {

    },
    onSubmit() {

    },
    handleRemove(file, fileList) {

    },
    handlePreview(file) {

    },
    cancel(form){
      this.$refs[form].resetFields();
      sessionStorage.removeItem('certificate');
      Object.assign(this.$data.form, this.$options.data().form); // 初始化data
      this.$router.push({ path: "/roster/personnel" });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          handleCofirm("确认保存吗", "warning")
            .then(res => {
              this.$global_msg.photoArr = this.form.productGroup;
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
          return false;
        }
      });
    },
    addLadder() {
      this.form.productGroup.push({
        grantCompany: "",
        certificationName: "",
        grantOrg: "",
        certificationType: "",
        certificationCode: "",
        credentialLevelType: "",
        value1: "",
        firstBeginDate: "",
        validBeginDate: "",
        validEndDate: "",
        certificationStatus: "",
        accessory: ""
      });
    },
    deleteLadder(index) {
      if (this.form.productGroup.length > 1) {
        this.form.productGroup.splice(index, 1);
      }
    },
    getFile(file, fileList) {

    },
    getsuccessFile(response, file, fileList) {

    },
    uploadFile() {},
    handleChange(file, fileList) {
      this.$refs.form.clearValidate();
      this.form.productGroup[0].accessory = fileList;
      this.form.productGroup.forEach((item, index, array) => {

        item.accessory = fileList;
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
  height: 700px;
}
</style>
