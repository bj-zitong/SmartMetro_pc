<template>
  <el-container class="personal">
    <el-main class="main">
      <el-form
        :label-position="labelPosition"
        label-width="160px"
        :model="contract"
        :rules="rules"
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
            <el-button type="primary" round class="cancel-style" @click.native="cancel('contract')">取消</el-button>
            <el-button type="primary" round @click.native="submitForm('contract')">提交</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import { handleCofirm } from "@/utils/confirm";
export default {
  data() {
    return {
      labelPosition: "left",
      field: "contractInformation", // 合同信息字段
      contract: {
        projectCode: "",
        projectName: "",
        contractCode: "",
        startDate: "",
        endDate: "",
        contractPeriodType: "",
        clearingType: "",
        corpCode: "",
        pInfoId:null,
        pContractId:null
      },
      rules: {
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
      }
    };
  },
  mounted() {
    if (sessionStorage.getItem("contractInformation") != null) {
      this.contract = JSON.parse(sessionStorage.getItem("contractInformation"));
    }
  },
  methods: {
     cancel(contract){
      this.$refs[contract].resetFields();
      sessionStorage.removeItem('contractInformation');
      Object.assign(this.$data.contract, this.$options.data().contract); // 初始化data
      this.$router.push({ path: "/roster/personnel" });
    },
    submitForm(contract) {
      this.$refs[contract].validate(valid => {
        if (valid) {
          handleCofirm("确认保存吗", "warning")
            .then(res => {
              sessionStorage.setItem(
                "contractInformation",
                JSON.stringify(this.contract)
                // this.contract
              );
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
