<template>
  <div>
    <!-- 添加用户弹框 -->
    <el-dialog
      title="添加劳务公司"
      width="450px"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      class="popupDialog"
    >
      <!-- 添加用户的表单 -->
      <el-form ref="addFormRef" :rules="rulesForm" :model="addLabor" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="company" label="公司名称">
          <el-input v-model="addLabor.company"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonName" label="负责人">
          <el-input v-model="addLabor.responsiblePersonName"></el-input>
        </el-form-item>
        <el-form-item prop="responsiblePersonPhone" label="联系方式">
          <el-input v-model="addLabor.responsiblePersonPhone"></el-input>
        </el-form-item>
        <el-form-item prop="serviceCompany" label="服务单位">
          <el-input v-model="addLabor.serviceCompany"></el-input>
        </el-form-item>
        <el-form-item prop="projectCode" label="项目编号">
          <el-input v-model="addLabor.projectCode"></el-input>
        </el-form-item>
        <el-form-item prop="projectName" label="项目名称">
          <el-input v-model="addLabor.projectName"></el-input>
        </el-form-item>
        <el-form-item prop="contractCode" label="合同编号">
          <el-input v-model="addLabor.contractCode"></el-input>
        </el-form-item>
        <el-form-item label="有效时间" required>
          <el-col :span="11">
            <el-form-item prop="start">
              <el-date-picker type="date" :editable="false" placeholder="开始日期" v-model="addLabor.start" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="end">
              <el-date-picker type="date" :editable="false" placeholder="结束日期" v-model="addLabor.start" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop="contractPeriodType" label="合同期限类型">
          <el-select v-model="addLabor.contractPeriodType">
            <el-option label="固定期限合同" value="0"></el-option>
            <el-option label="以完成一定工作为期限的合同" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="corpCode" label="所属企业组织机构代码" class="labelWidth">
          <el-input v-model="addLabor.corpCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogTableVisible = false, submitForm('addLabor')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Utils from "../../../assets/js/util.js";

export default {
  data() {
    return {
      // 表单数据初始为空
      addLabor: {
        company: '',
        responsiblePersonName: '',
        responsiblePersonPhone: '',
        serviceCompany: '',
        projectCode: '',
        projectName: '',
        contractCode: '',
        start: '',
        end: '',
        contractPeriodType: '',
        corpCode: ''
      },
      // 自定义表单验证
      rulesForm:
      {
        company:
          [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
        responsiblePersonName:
          [
            { required: true, message: '请输入负责人', trigger: 'blur' }
          ],
        responsiblePersonPhone:
          [
            { required: true, message: '请输入联系方式', trigger: 'blur' }
          ],
        serviceCompany:
          [
            { required: true, message: '请输入服务单位', trigger: 'blur' }
          ],
        projectCode:
          [
            { required: true, message: '请输入项目编号', trigger: 'blur' }
          ],
        projectName:
          [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
        contractCode:
          [
            { required: true, message: '请输入合同编号', trigger: 'blur' }
          ],
        start:
          [
            { required: true, message: '请选择开始日期', trigger: 'change' }
          ],
        end:
          [
            { required: true, message: '请选择结束日期', trigger: 'change' }
          ],
        contractPeriodType:
          [
            { required: true, message: '请选择合同期限类型', trigger: 'change' }
          ],
        corpCode:
          [
            { required: true, message: '请输入组织机构代码', trigger: 'blur' }
          ]
      },
      dialogTableVisible: true,
      rulesFormLabor: [],
      addUser: {}
    };
  },
  mounted() {
    var that = this;
    Utils.$on("addLabor", function(msg) {
      
    });
  }
};
</script>>
<style lang="stylus">
.popupDialog .el-dialog__header {
  height: 60px;
  background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
  opacity: 1;
  border-radius: 4px 4px 0px 0px;
  text-align: center;
}

.popupDialog .el-dialog__header .el-dialog__title {
  font-size: 20px;
  font-family: Microsoft YaHei;
  color: #fff;
}
.popupDialog .el-dialog__header i{
  color: #fff;
}
.popupDialog .labelWidth label {
  width: 40% !important;
}

.popupDialog .labelWidth .el-input {
  width: 60% !important;
}
</style>