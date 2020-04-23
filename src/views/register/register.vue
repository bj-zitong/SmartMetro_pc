<template>
  <div class="register-content">
    <img
      src="../../../resource/logo.png"
      style="width:30px;height:30px;margin:181px 1260px 869px 630px;"
    />
    <p class="register-title">智慧地铁管理系统</p>
    <div class="register-form">
      <el-form :rules="rules" :model="form" ref="register">
        <!-- 用户名-->
        <el-form-item prop="username">
          <el-input type="text" v-model="register.userName"></el-input>
        </el-form-item>
        <!--手机号-->
        <el-form-item prop="phone">
          <el-input type="text" v-model="register.phone"></el-input>
        </el-form-item>
        <!--身份证号-->
        <el-form-item prop="idNum">
          <el-input type="text" v-model="register.idNum"></el-input>
        </el-form-item>
        <!--账户-->
        <el-form-item prop="account">
          <el-input type="text" v-model="register.account"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" v-model="register.password"></el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item prop="confirmPassword">
          <el-input type="password" v-model="register.confirmPassword"></el-input>
        </el-form-item>
        <!--验证码-->
        <el-form-item prop="authCode">
          <el-input type="text" v-model="register.authCode"></el-input>
        </el-form-item>
        <!--生成验证码-->
        <!--获得验证码-->
        <el-form-item>
          <el-input type="text" v-model="register.getauthCode"></el-input>
        </el-form-item>
        <div>
          <el-button type="text" @click="register('form')">点击注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: '',
        phone: '',
        idNum: '',
        account: '',
        password: '',
        confirmPassword: '',
        authCode: ''
      },
      formRules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '目前只支持中国大陆的手机号码'
          }
        ],
        idNum: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ],
        authCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        energencyContactName: [
          { required: true, message: '请输入紧急联系人姓名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      // 获得表单数据
    }
  }
}
</script>
<style>
.register-content {
  width: 1920px;
  height: 1080px;
  background: rgba(244, 244, 244, 1);
  opacity: 1;
}
.register-form {
  width: 680px;
  height: 559px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 0.5;
  border-radius: 4px;
}
.register-title {
  width: 163px;
  height: 26px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 26px;
  color: rgba(0, 88, 162, 1);
  letter-spacing: 20px;
  opacity: 1;
  margin:183px 1077px 871px 680px;
}
</style>
