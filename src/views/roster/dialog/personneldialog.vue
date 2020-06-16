<template>
  <el-dialog
    title
    :visible.sync="changOrder"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :show-close="false"
    width="80%"
  >
    <div class="AddEquipment_form">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 个人基本信息 -->
        <el-tab-pane label="个人基本信息" name="second" class="information">
          <div class="AddEquipment_form">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  姓名:
                  <span>{{person.name}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  性别:
                  <span v-if="person.gender==0">男</span>
                  <span v-if="person.gender==1">女</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  年龄:
                  <span>{{person.age}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  民族:
                  <span>{{person.nation}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  工种:
                  <span>{{person.workType}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  电话:
                  <span>{{person.cellPhone}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  承建单位:
                  <span>{{person.buildCorpName}}</span>
                </div>
              </el-col>
              <!-- <el-col :span="8">
                <div class="grid-content bg-purple">部门:</div>
              </el-col>-->
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  紧急联系人:
                  <span>{{person.urgentLinkMan}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  电话:
                  <span>{{person.urgentLinkManPhone}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  现居住地:
                  <span>{{person.address}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  籍贯:
                  <span>{{person.birthPlaceCode}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  婚姻状况:
                  <span>{{person.maritalStatus}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  学位:
                  <span>{{person.degree}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  文化程度:
                  <span>{{person.cultureLevelType}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  证件类型:
                  <span>{{person.idCardType}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  户口类型:
                  <span>{{person.registrationType}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  证件编码:
                  <span>{{person.idCardCode}}</span>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  班组长:
                  <span>{{person.isTeamLeader}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  参加培训:
                  <span>{{person.isProjectTrain}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  持证上岗:
                  <span>{{person.isRelatedCertificates}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  居住证:
                  <span>{{person.isResidencePermit}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  居住证办理日期:
                  <span>{{person.residencePermitDate}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  特殊工种体检情况:
                  <span>{{person.isSpecialWorkTypeCheckups}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  班组:
                  <span>{{person.teamName}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  政治面貌:
                  <span>{{person.politicsType}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  一寸照片:
                  <span>{{person.photoPath}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- 合同信息 -->
        <el-tab-pane label="合同信息" name="third">
          <div class="AddEquipment_form">
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  项目编号:
                  <span>{{contract.projectCode}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  项目名称:
                  <span>{{contract.projectName}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  合同编号:
                  <span>{{contract.contractCode}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  合同期限:
                  <span>{{contract.endDate}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  结算方式:
                  <span>{{contract.clearingType}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  所属企业组织机构代码:
                  <span>{{contract.corpCode}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- 工资记录 -->
        <el-tab-pane label="工资记录" name="fourth">
          <div class="AddEquipment_form">
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  工资单编号:
                  <span>{{pay.payRollCode}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  发放金额:
                  <span>{{pay.totalPayAmount}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  发放日期:
                  <span>{{pay.balanceDate}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  发放方式:
                  <span>{{pay.provideType}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  发放银行:
                  <span>{{pay.provideBank}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  银行卡号:
                  <span>{{pay.payRollBankCardNumber}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- 资质证书 -->

        <el-tab-pane label="资质证书" name="certificate">
          <div
            class="AddEquipment_form"
            style="background:#ccc"
            v-for="(item,index) in credential"
            :key="index"
          >
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  真伪查询:
                  <span>{{item.grantCompany}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  证书名称:
                  <span>{{item.certificationName}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  证书类型:
                  <span>{{item.certificationType}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  专业编码:
                  <span>{{item.certificationCode}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  证书等级:
                  <span>{{item.credentialLevelType}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  发证日期:
                  <span>{{item.firstBeginDate}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  有效时间:
                  <span>{{item.validBeginDate}}</span>-
                  <span>{{item.validEndDate}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  资格状态:
                  <span>{{item.certificationStatus}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  附件上传:
                  <span>{{item.accessoryPath}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- 历史评价记录 -->
        <!-- <el-tab-pane label="历史评价记录" name="evaluate">
          <div class="AddEquipment_form">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="grid-content bg-purple">
                  评价记录:
                  <span></span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>-->
        <!-- 来源地消息 -->
        <!-- <el-tab-pane label="来源地消息" name="first">
          <div class="AddEquipment_form">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  职务:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">到京时间:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">返京地:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  返京地风险程度:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">是否有湖北接触史:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">是否有疑似人员:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  是否有确诊人员:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">是否到京:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">到京方式:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  列车/航班:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">隔离情况:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">是否满足返岗条件:</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  返场时间:
                  <span></span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">返京制约因素:</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">备注:</div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>-->
      </el-tabs>
    </div>
    <template slot="footer" class="dialog-footer">
      <el-button type="default" @click="handleClose" round class="T-R-B-Grey">取消</el-button>
      <!-- <el-button type="primary" @click="handleSubmit">提交</el-button> -->
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "turntorepairorder",
  props: ["data"],
  data() {
    return {
      changOrder: false,
      activeName: "second",
      pid: null,
      person: null,
      contract: null,
      pay: null,
      credential: null
    };
  },
  methods: {
    //页面初始化时加载的事件
    init() {
      this.changOrder = true;
    }, //关闭页面

    handleClose() {
      this.changOrder = false;
      this.$emit("tyonke", this.changOrder);
    }, //表单提交
    handleSubmit() {},
    handleClick() {},
    //详情
    getDetail() {
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
          this.getContract();
        }
      });
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
  },
  //监听
  watch: {
    changOrder(newValue, oldValue) {
      this.changOrder = newValue;
      this.pid = this.data;
      this.getDetail();
    }
  }
};
</script>

<style scoped lang="stylus">
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  // background: #99a9bf;
}

.bg-purple {
  // background: #d3dce6;
}

.bg-purple-light {
  // background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  font-size: 14px;

  span {
    color: rgba(0, 88, 162, 1);
  }
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
