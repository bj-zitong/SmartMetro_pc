<template>
  <div class="LabourNewlyaddedbox">
    <!-- <div v-if='isCertificate'>oljlln</div> -->
    <el-container class="LabourNewlyadded">
      <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 个人基本信息 -->
          <el-tab-pane
            label="个人基本信息"
            name="second"
            class="information"
            :disabled="personalPersonal"
          >
            <personal @field="getField" :data="pid"></personal>
          </el-tab-pane>
          <!-- 合同信息 -->
          <el-tab-pane label="合同信息" name="third" :disabled="contractInformation">
            <contract @field="getContractInformation" :data="pid"></contract>
          </el-tab-pane>
          <!-- 工资记录 -->
          <el-tab-pane label="工资记录" name="fourth" :disabled="payrollRecords">
            <payrollRecords @field="getPayrollRecords" :data="pid"></payrollRecords>
          </el-tab-pane>
          <!-- 资质证书 -->
          <el-tab-pane
            label="资质证书"
            name="certificate"
            :disabled="qualification"
            v-if="isCertificate"
          >
            <certificate @field="getQualification" :data="pid"></certificate>
          </el-tab-pane>
          <!-- 历史评价记录 -->
          <!-- <el-tab-pane label="历史评价记录" name="evaluate" :disabled="History">
            <evaluationRecord @field="getHistory"></evaluationRecord>
          </el-tab-pane> -->
          <!-- 来源地消息 -->
          <el-tab-pane label="来源地消息" name="first" :disabled="SourceInformation">
            <asource :data="pid"></asource>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script>
//来源地消息
import asource from "./addPersonnel/source";
//个人基本信息
import personal from "./addPersonnel/personal";
//合同信息
import contract from "./addPersonnel/contract";
//工资记录
import payrollRecords from "./addPersonnel/payrollRecords";
// 资质证书
import certificate from "./addPersonnel/certificate";
// 评价记录
import evaluationRecord from "./addPersonnel/evaluationRecord";
import { updateVegetablesCollection } from "../../utils/utils";
export default {
  components: {
    asource,
    personal,
    contract,
    payrollRecords,
    certificate,
    evaluationRecord
  },
  data() {
    return {
      pid: this.$route.params.id,
      isCertificate: false,
      activeName: "second",
      allArr: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      personalPersonal: false, //个人基本信息
      contractInformation: true, //合同信息
      payrollRecords: true, //工资记录
      qualification: true, //资质证书
      History: true, //I历史评价记录
      SourceInformation: true, //来源地信息,
      typeWorkArr: ["1", "2", "3"],
      //图片上传
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      value1: "",
      value2: "",
      person: null,
      contract: null,
      pay: null,
      getCredential2: null
    };
  },
  watch: {
    // getField(val) {}
  },
  activated() {
    this.pid = this.$route.params.id;
    // if (this.pid != 0) {
    //   this.getDeatli(this.pid);
    // }
    //进入新增页面判断是否特殊工种 如果是显示资质证书
    //根据id 判断 新增
    if (this.pid == 0) {
     console.log()
      let Information = JSON.parse(sessionStorage.getItem("data"));
      if (Information != null) {
        updateVegetablesCollection(
          this.typeWorkArr,
          Information.workType
        ).then(res => {
          if (res == true) {
            this.isCertificate = true;
          } else {
            this.isCertificate = false;
          }
        });
      }
      let getArr = JSON.parse(sessionStorage.getItem("personalPersonal"));
      if (getArr != null && getArr != undefined) {
        this.contractInformation = false;
        this.activeName = "third";
      }
      let getContract = JSON.parse(
        sessionStorage.getItem("getContractInformation")
      );
      if (getContract != null && getContract != undefined) {
        this.payrollRecords = false;
      }
      let getpayroll = JSON.parse(sessionStorage.getItem("salary"));
      console.log(getpayroll)
      if (getpayroll != null) {
        this.qualification = false;
      }
      let getqualification = JSON.parse(
        sessionStorage.getItem("qualification")
      );
      if (getqualification != null && getqualification != undefined) {
        this.History = false;
      }
      let getHistoryRecord = JSON.parse(
        sessionStorage.getItem("HistoryRecord")
      );
      if (getHistoryRecord != null) {
        this.SourceInformation = false;
      }
    } else {
      sessionStorage.removeItem('contractInformation');
      sessionStorage.removeItem('History');
      sessionStorage.removeItem("data");
      sessionStorage.removeItem('certificate');
      sessionStorage.removeItem('payrollRecords1');
      sessionStorage.removeItem('payrollRecords');
      sessionStorage.removeItem('personalPersonal');
      sessionStorage.removeItem('getContractInformation');
      // this.getContractInformation();
      // this.getPayrollRecords();
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/basic/" +
        this.pid;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.person = result;
          updateVegetablesCollection(this.typeWorkArr, result.workType).then(
            res => {
              if (res == true) {
                this.isCertificate = true;
              } else {
                this.isCertificate = false;
              }
            }
          );
          this.contractInformation = false;
          this.payrollRecords = false;
          this.qualification = false;
          this.History = false;
          this.SourceInformation = false;
        }
      });
    }
  },
  methods: {
    handleClick(tab, event) {},
    onSubmit() {},
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleChange() {},
    // fun () {
    //    var url =
    //       "/bashUrl/smart/worker/roster/" +
    //       sessionStorage.getItem("userId") +
    //       "/labour/basic/" +
    //       this.pid;
    //     this.http.get(url, null).then(res => {
    //       if (res.code == 200) {
    //         //渲染数据
    //         alert("接口")
    //         var result = res.data;
    //         sessionStorage.setItem("data", JSON.stringify(result));
    //         // this.getField()
    //       }
    //      });
    // },
    //个人基本信息
    getField(v) {
      this.isCertificate = true;
      //新增
      if (this.pid == 0) {
        sessionStorage.setItem("personalPersonal", JSON.stringify(v));
        this.activeName = "third";
        this.contractInformation = false;
        let Information = JSON.parse(sessionStorage.getItem("data"));
        if (Information != null) {
          updateVegetablesCollection(
            this.typeWorkArr,
            Information.workerType
          ).then(res => {
            if (res == true) {
              this.isCertificate = true;
            } else {
              this.isCertificate = false;
            }
          });
        }
      } else {

      }
    },
    //合同信息
    getContractInformation(v) {
      //新增
      if(this.pid==0){
         sessionStorage.setItem("getContractInformation", JSON.stringify(v));
      this.payrollRecords = false;
      this.activeName = "fourth";
      }else{
         var url =
      "/bashUrl/smart/worker/roster/" +
      sessionStorage.getItem("userId") +
      "/labour/contract/" +
      this.pid;
    this.http.get(url, null).then(res => {
      if (res.code == 200) {
        //渲染数据
        var result = res.data;
        sessionStorage.setItem("getContractInformation", JSON.stringify(result));
      }
    });
      }
    },
    //工资记录
    getPayrollRecords(v) {
      if(this.pid==0){
        sessionStorage.setItem("getPayrollRecords", JSON.stringify(v));
        this.activeName = "certificate";
        this.qualification = false;
      }else{
         //渲染
          var url =
          "/bashUrl/smart/worker/roster/" +
          sessionStorage.getItem("userId") +
          "/labour/salary/" +
          this.pid;
        this.http.get(url, null).then(res => {
          if (res.code == 200) {
            //渲染数据
            var result = res.data;
            sessionStorage.setItem("payrollRecords1",JSON.stringify(result));
          }
        });
      }
    },
    //证书
    getQualification(v) {
      // sessionStorage.setItem("certificate", JSON.stringify(v));
      this.activeName = "first";
      this.SourceInformation = false;
    },

    getHistory(v) {
      sessionStorage.setItem("HistoryRecord", JSON.stringify(v));
      this.activeName = "first";
      this.SourceInformation = false;
    },
    //合同
    getContract() {
      ///smart/worker/roster/{userId}/labour/contract/{pInfoId}
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/contract/" +
        this.pid;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.contract = result;
          this.getPay();
        }
      });
    },
    //支付
    getPay() {
      ///smart/worker/roster/{userId}/labour/salary
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/salary/" +
        this.pid;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.pay = result;
          this.getCredential();
        }
      });
    },
    ///smart/worker/roster/{userId}/labour/credential/{id}
    getCredential() {
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/credential/" +
        this.pid;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.credential = result;
        }
      });
    }
  }
};
</script>
<style scoped lang="stylus">
.el-main {
  background: rgba(255, 255, 255, 1);
  color: #333;
  height: 100%;
}

.LabourNewlyaddedbox {
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  margin: 0 25px;
  padding: 0px;
}

.add {
  position: relative;
  top: 550px;
}

.Operationbutton {
  position: relative;
  top: 570px;
  right: 80px;
}

.information {
  height: 650px;
}
</style>
