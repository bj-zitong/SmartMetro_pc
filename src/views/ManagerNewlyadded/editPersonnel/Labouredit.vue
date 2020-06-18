<template>
  <div class="LabourNewlyaddedbox">
    <!-- <div v-if='isCertificate'>oljlln</div> -->
    <el-container class="LabourNewlyadded">
      <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 个人基本信息 -->
          <el-tab-pane label="个人基本信息" name="first">
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
                  <el-form-item label="工种" class="region" prop="workType">
                    <el-select v-model="form.workType" placeholder="请选择工种" filterable clearable>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.no"
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
                      <el-option label="学位1" value="1"></el-option>
                      <el-option label="学位2" value="2"></el-option>
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
                  <el-form-item label="签发日期" prop="residencePermitDate">
                    <el-date-picker
                      v-model="form.residencePermitDate"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择签发日期"
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
                  <el-form-item label="一寸照片" prop="photoPath">
                    <img src="form.photoPath" style="width:100px;height:100px;" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="一寸照片" prop="photo">
                    <el-upload
                      class="upload-demo"
                      v-model="form.photo"
                      action
                      :on-change="handlePersonChange"
                      :file-list="fileList"
                      :auto-upload="false"
                      :limit="2"
                      :show-file-list="true"
                    >
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item style="float:right;position:relative;bottom:6px;">
                    <el-button
                      type="primary"
                      round
                      class="cancel-style"
                      @click.native="cancel('form')"
                    >取消</el-button>
                    <el-button type="primary" round @click.native="submitPersonForm('form')">提交</el-button>
                    <!-- {{options}} -->
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </el-tab-pane>
          <!-- 合同信息 -->
          <el-tab-pane label="合同信息" name="second">
            <el-form
              :label-position="labelPosition"
              label-width="160px"
              :model="contract"
              :rules="contractrules"
              ref="contract"
            >
              <el-col>
                <el-form-item label="项目编号" prop="projectCode">
                  <el-input v-model="contract.projectCode" placeholder="请输入项目编号"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="项目名称" prop="projectName">
                  <el-input v-model="contract.projectName" placeholder="请输入项目名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="合同编号" prop="contractCode">
                  <el-input v-model="contract.contractCode" placeholder="请输入合同编号"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="合同开始时间" prop="startDate">
                  <!-- <el-input v-model="contract.startDate"></el-input> -->
                  <el-date-picker
                    v-model="contract.startDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择合同开始时间"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="合同结束时间" prop="endDate">
                  <!-- <el-input v-model="contract.startDate"></el-input> -->
                  <el-date-picker
                    v-model="contract.endDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择合同结束时间"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item prop="contractPeriodType" label="合同期限类型">
                  <el-select v-model="contract.contractPeriodType" placeholder="请选择合同期限类型">
                    <el-option label="固定期限合同" value="0"></el-option>
                    <el-option label="以完成一定工作为期限的合同" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="结算方式" prop="clearingType">
                  <el-select v-model="contract.clearingType" placeholder="请选择结算方式">
                    <el-option label="银行卡" value="0"></el-option>
                    <el-option label="支付宝" value="1"></el-option>
                    <el-option label="微信" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="所属企业组织机构代码" prop="corpCode">
                  <el-input v-model="contract.corpCode" placeholder="请选择所属企业组织机构代码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item style="float:right;position:relative;bottom:6px;">
                  <el-button
                    type="primary"
                    round
                    class="cancel-style"
                    @click.native="cancel('contract')"
                  >取消</el-button>
                  <el-button type="primary" round @click.native="submitContract('contract')">提交</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </el-tab-pane>
          <!-- 资质证书 -->
          <el-tab-pane label="资质证书" name="four" v-if="isCertificate">
            <el-form
              :label-position="labelPosition"
              :rules="cerrules"
              label-width="140px"
              ref="cerform"
              :model="cerform"
            >
              <div class="add" v-for="(item,index) in cerform.productGroup" :key="index">
                <!-- <i class="el-icon-remove-outline" @click="deleteLadder(index,item.pcredentialId)"></i> -->
                <el-col>
                  <el-form-item
                    label="真伪查询"
                    :prop="`productGroup.${index}.grantCompany`"
                    :rules="cerrules.grantCompany"
                  >
                    <el-input v-model="item.grantCompany" placeholder="请输入发证单位"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item
                    label="证书名称"
                    :prop="`productGroup.${index}.certificationName`"
                    :rules="cerrules.certificationName"
                  >
                    <el-input v-model="item.certificationName" placeholder="请输入证书名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item
                    label="发证机关"
                    :prop="`productGroup.${index}.grantOrg`"
                    :rules="cerrules.grantOrg"
                  >
                    <el-input v-model="item.grantOrg" placeholder="请输入发证机关"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item
                    label="证书类型"
                    :prop="`productGroup.${index}.certificationType`"
                    :rules="cerrules.certificationType"
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
                    :rules="cerrules.certificationCode"
                  >
                    <el-input v-model="item.certificationCode" placeholder="请输入专业编码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item
                    label="证书等级"
                    :prop="`productGroup.${index}.credentialLevelType`"
                    :rules="cerrules.credentialLevelType"
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
                    :rules="cerrules.firstBeginDate"
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
                    :rules="cerrules.validBeginDate"
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
                    :rules="cerrules.validEndDate"
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
                    :rules="cerrules.certificationStatus"
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
                    :prop="`productGroup.${index}.accessoryPath`"
                    :rules="cerrules.accessory"
                  >
                    <img
                      src="productGroup.${index}.accessoryPath"
                      style="width:100px;height:100px;"
                    />
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item
                    label="附件上传"
                    :prop="`productGroup.${index}.accessory`"
                    :rules="cerrules.accessory"
                  >
                    <el-upload
                      class="upload-demo"
                      v-model="cerform.accessory"
                      action
                      :on-change="handleCerChange"
                      :file-list="fileList"
                      :auto-upload="false"
                      :limit="1"
                    >
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </div>
              <el-col :span="24" style="float:right;height:40px;margin-top:20px">
                <el-form-item style="float:right">
                  <el-button type="primary" round style="text-aligin:center" @click="addLadder">添加更多</el-button>
                  <!-- <el-button type="primary" round style="text-aligin:center" @click="preservationClick">保存</el-button> -->
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item style="float:right;position:relative;bottom:0;">
                  <el-button
                    type="primary"
                    round
                    class="cancel-style"
                    @click.native="cancel('cerform')"
                  >取消</el-button>
                  <el-button type="primary" round @click="submitaCerForm('cerform')">提交</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </el-tab-pane>
          <!-- 工资记录 -->
          <el-tab-pane label="工资记录" name="three">
            <el-form
              :label-position="labelPosition"
              label-width="160px"
              :model="payform"
              :rules="payrules"
              ref="payform"
            >
              <el-col>
                <el-form-item label="工资单编号" prop="payRollCode">
                  <el-input v-model="payform.payRollCode" placeholder="请输入工资单编号"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="发放金额" prop="totalPayAmount">
                  <el-input v-model="payform.totalPayAmount" placeholder="请输入发放金额"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="发放日期" prop="balanceDate">
                  <el-date-picker
                    v-model="payform.balanceDate"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="发放方式" prop="provideType">
                  <el-select v-model="payform.provideType" placeholder="发放方式">
                    <el-option label="现金" value="0"></el-option>
                    <el-option label="电汇" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="发放银行" prop="provideBank">
                  <el-select v-model="payform.provideBank" placeholder="发放银行">
                    <el-option label="交通银行" value="0"></el-option>
                    <el-option label="建设银行" value="1"></el-option>
                    <el-option label="工商银行" value="2"></el-option>
                    <el-option label="农业银行" value="3"></el-option>
                    <el-option label="招商银行" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="银行卡号" prop="payRollBankCardNumber">
                  <el-input v-model="payform.payRollBankCardNumber" placeholder="请输入银行卡号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item style="float:right;position:relative;bottom:6px;">
                  <el-button
                    type="primary"
                    round
                    class="cancel-style"
                    @click.native="cancel('payform')"
                  >取消</el-button>
                  <el-button type="primary" round @click.native="submitPay('payform')">提交</el-button>
                </el-form-item>
              </el-col>
              <el-button type="primary" style="float:right" round @click="submitForm()">提交111</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import options from "@/common/options";
import { updateVegetablesCollection } from "../../../utils/utils";
export default {
  data() {
    return {
      labelPosition: "left",
      activeName: "first",
      options: options,
      form: {
        //人员
        name: "",
        gender: "",
        age: "",
        nation: "",
        workType: "",
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
        isResidencePermit: "",
        residencePermitDate: "",
        idCardType: "",
        politicsType: "",
        photo: null,
        registrationType: "",
        isTeamLeader: "",
        isProjectTrain: "",
        isRelatedCertificates: "",
        isSpecialWorkTypeCheckups: "",
        pinfoId: null,
        photoPath: null
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        workType: [{ required: true, message: "请选择工种", trigger: "blur" }],
        cellPhone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        buildCorpName: [
          { required: true, message: "请输入承建单位", trigger: "blur" }
        ],
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
          { required: true, message: "请选择签发日期", trigger: "blur" }
        ],
        idCardType: [
          { required: true, message: "请选择证件类型", trigger: "blur" }
        ],
        teamId: [{ required: true, message: "请选择班组", trigger: "blur" }],
        politicsType: [
          { required: true, message: "请选择政治面貌", trigger: "blur" }
        ],
        photo: [{ required: false, message: "请上传照片", trigger: "change" }],
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
      contract: {
        //合同
        projectCode: "",
        projectName: "",
        contractCode: "",
        startDate: "",
        endDate: "",
        contractPeriodType: "",
        clearingType: "",
        corpCode: "",
        pinfoId: null,
        pContractId: null
      },
      contractrules: {
        projectCode: [
          { required: true, message: "请输入项目编号", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        contractCode: [
          { required: true, message: "请输入合同编号", trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "请输入合同开始时间", trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "请输入合同结束时间", trigger: "blur" }
        ],
        contractPeriodType: [
          { required: true, message: "请选择合同期限", trigger: "change" }
        ],
        corpCode: [
          {
            required: true,
            message: "请输入所属企业组织机构代码",
            trigger: "blur"
          }
        ],
        clearingType: [
          { required: true, message: "请选择结算方式", trigger: "change" }
        ]
      },
      payform: {
        //工资
        payRollCode: "",
        totalPayAmount: "",
        distributionMethod: "",
        payRollBankCardNumber: "",
        pinfoId: null
      },
      payrules: {
        payRollCode: [
          { required: true, message: "请输入工资单编号", trigger: "blur" }
        ],
        totalPayAmount: [
          { required: true, message: "请输入发放金额 ", trigger: "blur" }
        ],
        balanceDate: [
          { required: true, message: "请输入日期 ", trigger: "blur" }
        ],
        provideType: [
          { required: true, message: "请选择发放方式 ", trigger: "change" }
        ],
        provideBank: [
          { required: true, message: "请选择发放银行", trigger: "change" }
        ],
        payRollBankCardNumber: [
          { required: true, message: "请填写银行卡号", trigger: "blur" }
        ]
      },
      cerform: {
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
            pinfoId: null,
            accessoryPath: null,
            pcredentialId: null,
            paccessoryId: null
          }
        ]
      },
      cerrules: {
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
          { required: false, message: "请选择附件上传", trigger: "change" }
        ]
      },
      pinfoId: null,
      //图片上传
      fileList: [],
      wokerTypeArr: ["010", "020"],
      isCertificate: false
    };
  },
  activated() {
    //获得传入id
    this.pinfoId = this.$route.params.id;
    this.getPerson();
    this.getPay();
    this.getContract();
    this.getCer();
  },
  methods: {
    handleClick(tab, event) {
      //合同
      // if(tab.name=='second'){
      //   this.getContract();
      // }
      // if(tab.name=='three'){
      //   this.getPay();
      // }
      // if(tab.name=='four'){
      //   this.getCer();
      // }
      console.log(tab.name);
    },
    //获得人员详情
    getPerson() {
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/basic/" +
        this.pinfoId;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.form = result;
          //判断是否是特殊工种
          updateVegetablesCollection(
            this.wokerTypeArr,
            this.form.workType
          ).then(res => {
            if (res == true) {
              this.isCertificate = true;
            } else {
              this.isCertificate = false;
            }
          });
          sessionStorage.setItem("person", JSON.stringify(this.form));
          // let name = result.photo;
          // this.fileList.push({ name });
          // sessionStorage.setItem("data", JSON.stringify(this.form));
        }
      });
    },
    //合同
    getContract() {
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/contract/" +
        this.pinfoId;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.contract = result;
          this.contract.pinfoId = this.pinfoId;
          sessionStorage.setItem("contract", JSON.stringify(this.contract));
        }
      });
    },
    //工资
    getPay() {
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/salary/" +
        this.pinfoId;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.payform = result;
          this.payform.pinfoId = this.pinfoId;
          sessionStorage.setItem("pay", JSON.stringify(this.payform));
        }
      });
    },
    //证书
    getCer() {
      var url =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/credential/" +
        this.pinfoId;
      this.http.get(url, null).then(res => {
        if (res.code == 200) {
          //渲染数据
          var result = res.data;
          this.cerform.productGroup = result;
          this.cerform.productGroup.forEach((item, index, array) => {
            item.pinfoId = this.pinfoId;
            // item[index]=fileList
            //执行代码
          });
          // handleCofirm("确认保存吗", "warning")
          //   .then(res => {
          sessionStorage.setItem("CerForm", JSON.stringify(this.cerform)); //证书存储
          console.log(this.cerform);
        }
      });
    },
    addLadder() {
      this.cerform.productGroup.push({
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
    //人员提交
    submitPersonForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // handleCofirm("确认保存吗", "warning")
          // .then(res => {
          sessionStorage.setItem("person", JSON.stringify(this.form));
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        }
        this.activeName = "second";
      });
      console.log(this.form);
    },
    //人员
    handlePersonChange(file, fileList) {
      // this.fileList = [fileList[fileList.length - 1]];
      this.$refs.form.clearValidate();
      this.form.photo = file;
      console.log(file);
    },
    //合同提交
    submitContract(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // handleCofirm("确认保存吗", "warning")
          // .then(res => {
          this.contract.pinfoId = this.pinfoId;
          sessionStorage.setItem("contract", JSON.stringify(this.contract));
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          if (this.isCertificate == true) {
            this.activeName = "four";
          } else {
            this.activeName = "three";
          }
          console.log(sessionStorage.getItem("contract"));
        }
      });
    },
    //工资提交
    submitPay(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // handleCofirm("确认保存吗", "warning")
          // .then(res => {
          this.payform.pinfoId = this.pinfoId;
          sessionStorage.setItem("pay", JSON.stringify(this.payform));
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          console.log(sessionStorage.getItem("pay"));
        }
      });
    },
    handleCerChange(file, fileList) {
      this.$refs.cerform.clearValidate();
      // console.log(index);
      // this.cerform.productGroup[0].accessoryPath = fileList;
      this.cerform.productGroup.forEach((item, index, array) => {
        item.accessory = fileList;
        // item[index]=fileList
        //执行代码
      });
      console.log(this.cerform.productGroup);
    },
    //证书
    submitaCerForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.cerform.productGroup.forEach((item, index, array) => {
            item.pinfoId = this.pinfoId;
            // item[index]=fileList
            //执行代码
          });
          // handleCofirm("确认保存吗", "warning")
          //   .then(res => {
          sessionStorage.setItem("CerForm", JSON.stringify(this.cerform)); //证书存储
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.activeName = "three";
          // })
        }
      });
    },
    //最后提交
    submitForm() {
      //人员
      debugger;
      var data = JSON.parse(sessionStorage.getItem("person"));
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
      formData.append("pinfoId", data.pinfoId);
      if (data.photo != null) {
        formData.append("photo", data.photo.raw);
      }
      var dataUrl =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/basic/" +
        this.pinfoId;
      this.http.put(dataUrl, formData).then(res => {
        if (res.code == 200) {
          this.updateContract();
          this.updatePay();
          this.updateCer();
        }
      });
    },
    //合同
    updateContract() {
      //合同信息
      var contractInformation = sessionStorage.getItem("contract");
      var data = JSON.parse(sessionStorage.getItem("contract"));
      var contractUrl =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/contract";
      this.http.put(contractUrl, data).then(res => {
        if (res.code == 200) {
        }
      });
    },
    //工资
    updatePay() {
      //工资记录
      var salary = sessionStorage.getItem("pay");
      var data = JSON.parse(sessionStorage.getItem("pay"));
      var payrollUrl =
        "/bashUrl/smart/worker/roster/" +
        sessionStorage.getItem("userId") +
        "/labour/salary";
      this.http.put(payrollUrl, data).then(res => {
        if (res.code == 200) {
          //  this.$router.push({ path: "/roster/personnel" });
        }
      });
    },
    updateCer() {
      debugger;
      var certificate = JSON.parse(sessionStorage.getItem("CerForm"));
      console.log(certificate);
      if (certificate != null) {
        for (var i = 0; i < certificate.productGroup.length; i++) {
          // for (var i = 0; i < this.$global_msg.photoArr.length; i++) {
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
            "paccessoryId",
            certificate.productGroup[i].paccessoryId
          );
          certificateFormdata.append(
            "pinfoId",
            certificate.productGroup[i].pinfoId
          );
           certificateFormdata.append(
            "accessoryPath",
            certificate.productGroup[i].accessoryPath
          );
          certificateFormdata.append(
            "certificationStatus",
            certificate.productGroup[i].certificationStatus
          );
          if (certificate.productGroup[i].accessory != null) {
            certificateFormdata.append(
              "accessory ",
              // this.$global_msg.photoArr[i].accessory[0].raw
              certificate.productGroup[i].accessory.raw
            );
          }
          if (certificate.productGroup[i].pcredentialId != null) {
            var certificateUrl =
              "/bashUrl/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/labour/credential/" +
              certificate.productGroup[i].pcredentialId;
            this.http.put(certificateUrl, certificateFormdata).then(res => {
              if (res.code == 200) {
                //请求成功
                this.$router.push({ path: "/roster/personnel" });
                this.cancel(formName);
              }
            });
          } else {
            var certificateUrl =
              "/bashUrl/smart/worker/roster/" +
              sessionStorage.getItem("userId") +
              "/labour/credential/" +
              this.pinfoId;
            this.http.post(certificateUrl, certificateFormdata).then(res => {
              if (res.code == 200) {
                //请求成功
                this.$router.push({ path: "/roster/personnel" });
                this.cancel(formName);
              }
            });
          }
          // }
        }
      } else {
        this.$router.push({ path: "/roster/personnel" });
      }
    },
    cancel(form) {
      this.$router.push({ path: "/roster/personnel" });
      this.$refs[form].resetFields();
      sessionStorage.removeItem("person");
      sessionStorage.removeItem("pay");
      sessionStorage.removeItem("contract");
      sessionStorage.removeItem("CerForm");
      Object.assign(this.$data.form, this.$options.data().form); // 初始化data
      this.$router.push({ path: "/roster/personnel" });
    }
  }
};
</script>
<style>
.LabourNewlyaddedbox {
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  margin: 0 25px;
  padding: 0px;
}
</style>

