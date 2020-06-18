<template>
  <el-container class="payrollRecords">
    <el-main class="main">
      <el-form
        :label-position="labelPosition"
        label-width="140px"
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-col :span="8">
          <el-form-item label="职务" prop="post">
            <el-select v-model="form.post" placeholder="请选择职务">
              <el-option label="劳务人员" value="1"></el-option>
              <el-option label="管理人员" value="2"></el-option>
              <el-option label="监理人员" value="3"></el-option>
              <el-option label="其他类人员" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到京时间" prop="value1">
            <el-date-picker
              v-model="form.value1"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择到京时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="返京地" prop="returnto">
            <el-input v-model="form.returnto" placeholder="请输入返京地（省、市、县/旗）"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="返京地风险程度" prop="riskLevel">
            <el-select v-model="form.riskLevel" placeholder="请选择返京地风险程度">
              <el-option label="高" value="gao"></el-option>
              <el-option label="中" value="zhong"></el-option>
              <el-option label="低" value="di"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否有湖北接触史" prop="sfyhbjcs">
            <el-select v-model="form.sfyhbjcs" placeholder="请选择是否有湖北接触史">
              <el-option label="是" value="shi"></el-option>
              <el-option label="否" value="fou"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否有疑似人员" prop="suspectedPerson">
            <el-select v-model="form.suspectedPerson" placeholder="是否有疑似人员">
              <el-option label="是" value="shi"></el-option>
              <el-option label="否" value="fou"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否有确诊人员" prop="Confirmed">
            <el-select v-model="form.Confirmed" placeholder="是否有确诊人员">
              <el-option label="是" value="shi"></el-option>
              <el-option label="否" value="fou"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否到京" prop="whetherTo">
            <el-select v-model="form.whetherTo" placeholder="是否到京">
              <el-option label="是" value="shi"></el-option>
              <el-option label="否" value="fou"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到京方式" prop="wayto">
            <el-select v-model="form.wayto" placeholder="到京方式">
              <el-option label="高铁" value="gt"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="列车/航班" prop="flightno">
            <el-input v-model="form.flightno" placeholder="请输入列车/航班"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="隔离情况" prop="isolation">
            <el-select v-model="form.isolation" placeholder="请选择隔离情况">
              <el-option label="隔离期满" value="glqm"></el-option>
              <el-option label="正在隔离" value="zzgl"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否满足返岗条件" prop="MeetTheConditions">
            <el-select v-model="form.MeetTheConditions" placeholder="是否满足">
              <el-option label="是" value="shi"></el-option>
              <el-option label="否" value="fou"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="返场时间" prop="value2">
            <el-date-picker
              v-model="form.value2"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择返场时间"
            ></el-date-picker>
            <!-- <el-date-picker v-model="form.value2" type="date" placeholder="返场时间"></el-date-picker> -->
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="返京制约因素" prop="constraints">
            <el-input type="textarea" v-model="form.constraints" placeholder="请填写返京制约因素具体原因及采取措施"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="desc">
            <el-input type="textarea" v-model="form.desc" placeholder="请填写备注（谁跟谁同村，谁跟谁是家庭亲属）"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <p>
            风险程度：
            <br />疫情高风险地区：
            县、市、区、
            <br />旗累计确诊病例超过
            <br />50例，14天内有聚集性疫情。
            <br />疫情中风险地区：
            县、市、区、
            <br />旗14天内有新增确诊病例，累计确诊病例
            <br />不超过50例；或累计确诊病例超过
            <br />50例，14天内未发生聚集性疫情。
            疫情低
            <br />风险地区：
            县、市、区、旗为无确诊
            <br />病例，或连续14天无新增确诊病例。
          </p>
        </el-col>
        <div style="float:right">
          <el-button
            type="primary"
            round
            style="margin-top:60px;margin-left:80px"
            @click="preservationClick"
          >保存</el-button>
          <div style="margin-top:20px">
            <el-button
              type="primary"
              round
              style="background:#ccc;border:1px solid #ccc"
              @click.native="cancel('form')"
            >取消</el-button>
            <el-button type="primary" round @click="submitForm('form')">提交</el-button>
          </div>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
export default {
  props: ["data"],
  data() {
    return {
      labelPosition: "left",
      id: null,
      msg: this.$global_msg.photo,
      pInfoId: null, //添加人员返回id
      form: {
        post: "",
        returnto: "",
        riskLevel: "",
        sfyhbjcs: "",
        suspectedPerson: "",
        Confirmed: "",
        whetherTo: "",
        wayto: "",
        flightno: "",
        isolation: "",
        MeetTheConditions: "",
        value2: "",
        constraints: "",
        desc: ""
      },
      rules: {
        post: [{ required: true, message: "请选择职务", trigger: "blur" }],
        returnto: [
          { required: true, message: "请输入返京地 ", trigger: "blur" }
        ],
        value1: [
          { required: true, message: "请选择到京日期", trigger: "blur" }
        ],
        riskLevel: [
          { required: true, message: "请选择返京地风险程度 ", trigger: "blur" }
        ],
        sfyhbjcs: [
          {
            required: true,
            message: "请选择是否有湖北接触史 ",
            trigger: "blur"
          }
        ],
        suspectedPerson: [
          { required: true, message: "请选择是否有疑似人员", trigger: "blur" }
        ],
        Confirmed: [
          { required: true, message: "请选择是否有确诊人员", trigger: "blur" }
        ],
        whetherTo: [
          { required: true, message: "请选择是否到京", trigger: "blur" }
        ],
        wayto: [{ required: true, message: "请选择到京方式", trigger: "blur" }],
        flightno: [
          { required: true, message: "请输入列车/航班", trigger: "blur" }
        ],
        isolation: [
          { required: true, message: "请选择隔离情况", trigger: "blur" }
        ],
        MeetTheConditions: [
          { required: true, message: "请选择是否满足返岗条件", trigger: "blur" }
        ],
        value2: [
          { required: true, message: "请选择返场时间", trigger: "blur" }
        ],
        constraints: [
          {
            required: true,
            message: "请填写返京制约因素具体原因及采取措施",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "请填写备注（谁跟谁同村，谁跟谁是家庭亲属）",
            trigger: "blur"
          }
        ]
      }
    };
  },
  activated() {
    this.id = this.$global_msg.uId; //获取传来id
  },
  mounted() {
    if (sessionStorage.getItem("source") != null) {
      this.form = JSON.parse(sessionStorage.getItem("source"));
    }
  },
  methods: {
    cancel(form) {
      this.$router.push({ path: "/roster/personnel" });
      this.$refs[form].resetFields();
      sessionStorage.removeItem("contractInformation");
      sessionStorage.removeItem("History");
      sessionStorage.removeItem("data");
      sessionStorage.removeItem("certificate");
      sessionStorage.removeItem("salary");
      Object.assign(this.$data.form, this.$options.data().form); // 初始化data
      this.$router.push({ path: "/roster/personnel" });
    },
    //新增
    submitForm(formName) {
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //历史评价记录
      var History = sessionStorage.getItem("History");
      //来源地消息
      var History = sessionStorage.getItem("source");
      //个人基本信息
      var data = JSON.parse(sessionStorage.getItem("data"));
      var formData = new FormData();
      formData.append("name", data.name);
      formData.append("gender", data.gender);
      formData.append("age", data.age);
      formData.append("nation", data.nation);
      formData.append("workType", data.workType);
      formData.append("cellPhone", data.cellPhone);
      formData.append("buildCorpName ", data.buildCorpName);
      formData.append("urgentLinkMan", data.urgentLinkMan);
      formData.append("urgentLinkManPhone", data.urgentLinkManPhone);
      formData.append("address", data.address);
      formData.append("birthPlaceCode", data.birthPlaceCode);
      formData.append("cultureLevelType", data.cultureLevelType);
      formData.append("maritalStatus", data.maritalStatus);
      formData.append("degree", data.degree);
      formData.append("idCardCode", data.idCardCode);
      formData.append("isResidencePermit", data.isResidencePermit);
      formData.append("residencePermitDate", data.residencePermitDate);
      formData.append("registrationType", data.registrationType);
      formData.append("idCardType", data.idCardType);
      formData.append("politicsType", data.politicsType);
      formData.append("isRelatedCertificates", data.isRelatedCertificates);
      formData.append(
        "isSpecialWorkTypeCheckups",
        data.isSpecialWorkTypeCheckups
      );
      formData.append("teamId ", data.teamId);
      formData.append("isTeamLeader", data.isTeamLeader);
      formData.append("isProjectTrain", data.isProjectTrain);
      formData.append("photo", this.$global_msg.photo.raw);
      formData.append("pinfoId", data.pinfoId);
      //新增
        var dataUrl =
          "/bashUrl/smart/worker/roster/" +
          sessionStorage.getItem("userId") +
          "/labour/basic";
        this.http.post(dataUrl, formData).then(res => {
          if (res.code == 200) {
            //获得新增的id
            var id = res.data;
            this.pInfoId = id;
            this.addContract(formName);
          }
        });
    },
    //
    addCer(formName) {
      //资质证书
      var certificate = JSON.parse(sessionStorage.getItem("certificate"));
      if (certificate != null) {
        for (var i = 0; i < certificate.productGroup.length; i++) {
          for (var i = 0; i < this.$global_msg.photoArr.length; i++) {
            var certificateFormdata = new FormData();
            certificateFormdata.append(
              "grantCompany",
              certificate.productGroup[i].grantCompany
            );
            certificateFormdata.append("pInfoId", this.pInfoId);
            certificateFormdata.append(
              "certificationName ",
              certificate.productGroup[i].certificationName
            );
            certificateFormdata.append(
              "grantOrg",
              certificate.productGroup[i].grantOrg
            );
            certificateFormdata.append(
              "certificationType",
              certificate.productGroup[i].certificationType
            );
            certificateFormdata.append(
              "certificationCode",
              certificate.productGroup[i].certificationCode
            );
            certificateFormdata.append(
              "credentialLevelType",
              certificate.productGroup[i].credentialLevelType
            );
            certificateFormdata.append(
              "firstBeginDate",
              certificate.productGroup[i].firstBeginDate
            );
            certificateFormdata.append(
              "validBeginDate",
              certificate.productGroup[i].validBeginDate
            );
            certificateFormdata.append(
              "validEndDate",
              certificate.productGroup[i].validEndDate
            );
            certificateFormdata.append(
              "certificationStatus",
              certificate.productGroup[i].certificationStatus
            );
            certificateFormdata.append(
              "accessory ",
              this.$global_msg.photoArr[i].accessory[0].raw
            );
            // for(var i=0;i<=this.$global_msg.photoArr.length;i++){

            //   certificateFormdata.append("accessory ", this.$global_msg.photoArr[i].accessory[0].raw);
            // }
            var certificateUrl =
              "/bashUrl/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/labour/credential/" +
              this.pInfoId;
            this.http.post(certificateUrl, certificateFormdata).then(res => {
              if (res.code == 200) {
                //请求成功
                this.$router.push({ path: "/roster/personnel" });
                this.cancel(formName);
              }
            });
          }
        }
      } else {
        this.$router.push({ path: "/roster/personnel" });
      }
    },
    //历史记录
    // addHistory(){
    //    //历史评价记录
    //   var History = sessionStorage.getItem("History");
    //   var paramEval = JSON.stringify({
    //     pInfoId: this.pInfoId,
    //     evaluate: History
    //   });
    //   debugger;
    //   var HistoryUrl =
    //     "/bashUrl/smart/worker/roster/" +
    //     sessionStorage.getItem("userId") +
    //     "/labour/evaluate";
    //   this.http.post(HistoryUrl, paramEval).then(res => {
    //     if (res.code == 200) {
    //     }
    //   });
    // },
    //工资
    addPay(formName) {
      //工资记录
      var salary = sessionStorage.getItem("salary");
      var data = JSON.parse(sessionStorage.getItem("salary"));
      data.pInfoId = this.pInfoId;
      var payrollUrl =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/salary";
      this.http.post(payrollUrl, data).then(res => {
        if (res.code == 200) {
          this.addCer(formName);
          //  this.$router.push({ path: "/roster/personnel" });
        }
      });
    },
    //合同信息
    addContract(formName) {
      //合同信息
      var contractInformation = sessionStorage.getItem("contractInformation");
      var data = JSON.parse(sessionStorage.getItem("contractInformation"));
      data.pContractId = this.pInfoId;
      var contractUrl =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/contract";
      this.http.post(contractUrl, data).then(res => {
        if (res.code == 200) {
          this.addPay(formName);
        }
      });
    },
    //保存
    preservationClick() {
      handleCofirm("确认保存吗", "warning")
        .then(res => {
          sessionStorage.setItem("source", JSON.stringify(this.form));
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
