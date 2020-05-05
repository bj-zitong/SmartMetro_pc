<template>
  <el-container class="personal">
    <el-main class="main">
      <el-form :label-position="labelPosition" label-width="160px" :model="form">
        <el-col>
          <el-form-item label="项目编号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="项目名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="合同编号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="合同期限">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="结算方式">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="所属企业组织机构代码">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="float:right;height:40px;position:relative;bottom:10px;">
          <el-form-item style="float:right">
            <el-button type="primary" round style="text-aligin:center">保存</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item style="float:right;position:relative;bottom:6px;">
            <el-button type="primary" round class="cancel-style">取消</el-button>
            <el-button type="primary" round @click="submitForm('form')">提交</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "left",
      form: {
        name: "",
        gender: "",
        type: [],
        region: ""
      }
      // 校验规则
      //日历选择器
    };
  },
  methods: {}
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