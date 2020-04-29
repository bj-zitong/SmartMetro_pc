<template>
    <div>
        <!-- 添加用户弹框 -->
    <el-dialog
      title="添加劳务分包单位公司"
      width="450px"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
    >
    <!-- 添加用户的表单 -->
      <el-form ref="addFormRef" :rules="rulesAddUser" :model="addUser" label-width="80px">
        <el-form-item prop="companyName" label="公司名称" :required="true">
          <el-input v-model="addUser.companyName" ></el-input>
        </el-form-item>
        <el-form-item prop="personnel" label="负责人" :required="true">
          <el-input v-model="addUser.personnel"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系方式" :required="true">
          <el-input v-model="addUser.phone"></el-input>
        </el-form-item>
        <el-form-item prop="serviceCompany" label="服务单位" :required="true">
          <el-input v-model="addUser.serviceCompany"></el-input>
        </el-form-item>
        <el-form-item prop="projectNo" label="项目编号" :required="true">
          <el-input v-model="addUser.projectNo"></el-input>
        </el-form-item>
        <el-form-item prop="projectName" label="项目名称" :required="true">
          <el-input v-model="addUser.projectName"></el-input>
        </el-form-item>
        <el-form-item prop="contractNo" label="合同编号" :required="true">
          <el-input v-model="addUser.contractNo"></el-input>
        </el-form-item>
        <el-form-item prop="contractTerm" label="合同期限" :required="true">
          <el-input v-model="addUser.contractTerm"></el-input>
        </el-form-item>
        <el-form-item prop="contractType" label="合同类型" :required="true">
          <el-select v-model="addUser.contractType">
            <el-option label="劳务分包" value="labor"></el-option>
            <el-option label="专业分包" value="major"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="mechanismCode" label="所属企业组织机构代码" :required="true" id="labelWidth">
          <el-input v-model="addUser.mechanismCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    </div>
</template>
<script>
import Utils from '../../../assets/js/util.js'

export default {
  data() {
    return {
      dialogTableVisible:true,
      rulesAddUser:[],
      addUser:{}
    }
  },
    mounted(){
        var that = this;
        Utils.$on('demo', function (msg) {
          console.log(213)
        })
    }
}
</script>>
<style lang="stylus">
.el-dialog__header{
    height:60px;
    background:linear-gradient(180deg,rgba(54,130,243,1) 0%,rgba(0,88,162,1) 100%);
    opacity:1;
    border-radius:4px 4px 0px 0px;
    text-align: center;
    
}
.el-dialog__header .el-dialog__title{
    font-size:20px;
    font-family:Microsoft YaHei;
    color : #fff;
}
#labelWidth label {
    width : 40% !important;
}
#labelWidth .el-input {
    width : 60% !important;
}
</style>