<template>
  <div class="login_container">
    <!--头部-->
    <div class="container_center">
      <img src="../../../resource/logo.png" style="width:30px;height:30px" />
      <span class="register-head">智慧地铁管理系统</span>
      <!--表单-->
      <!---->
      <p style="accout-style">已有账号，马上登录</p>
      <el-button type="primary" class="button-head">
        <span class="button-head-title">注册</span>
      </el-button>
      <div class="login_box">
        <!-- 注册表单 -->
        <el-form :rules="formRules" :model="form" ref="register" class="form-content">
          <!-- 用户名-->
          <el-form-item prop="username">
            <el-input type="text" v-model="register.userName" placeholder="用户名"></el-input>
          </el-form-item>
          <!--手机号-->
          <el-form-item prop="phone">
            <el-input type="text" v-model="register.phone" placeholder="手机号码"></el-input>
          </el-form-item>
          <!--身份证号-->
          <el-form-item prop="idNum">
            <el-input type="text" v-model="register.idNum" placeholder="身份证号"></el-input>
          </el-form-item>
          <!--账户-->
          <el-form-item prop="account">
            <el-input type="text" v-model="register.account" placeholder="账号"></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="password">
            <el-input type="password" v-model="register.password" placeholder="密码"></el-input>
          </el-form-item>
          <!--确认密码-->
          <el-form-item prop="confirmPassword">
            <el-input type="password" v-model="register.confirmPassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <!--验证码-->
          <el-form-item prop="authCode" class="code-style">
            <el-input type="text" v-model="register.authCode" placeholder="验证码"></el-input>
            <el-input type="text" style="getcode"></el-input>
          </el-form-item>
          <!--生成验证码-->
          <!--获得验证码-->
          <el-form-item class="code-style" prop="getauthCode"  >
            <el-input type="text" v-model="register.getauthCode"></el-input>
          </el-form-item>
          <div>
            <el-button type="text" @click="register('form')">点击注册</el-button>
          </div>
        </el-form>
      </div>
      <!-- <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
      style="height:100%"
    >
      </vue-particles>-->
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
  created() {},
  methods: {
    // 注册
    register() {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>
<style scoped lang="stylus">
/* 总div */
.login_container {
  width: 100%;
  height: 100%;
  background: rgba(244, 244, 244, 1);
  opacity: 1; /* 不透明级别 */

  /* 头部字体 */
  .register-head {
    width: 163px;
    height: 26px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 26px;
    color: rgba(0, 88, 162, 1);
    letter-spacing: 20px;
    opacity: 1;
  }
  .accout-style{
    // margin-right:20px;
    // width:92px;
    height:14px;
    font-size:10px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:14px;
    color:rgba(10,96,177,1);
    letter-spacing:20px;
    opacity:1;
  }

  /* 头部head button */
  .button-head {
    width: 680px;
    height: 60px;
    background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
    box-shadow: 3px 6px 12px rgba(0, 88, 162, 0.23);
    opacity: 1;
    border-radius: 4px;

    /* 按钮文字 */
    .button-head-title {
      width: 56px;
      height: 31px;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 31px;
      color: rgba(255, 255, 255, 1);
      letter-spacing: 20px;
      opacity: 1;
    }
  }

  /* 二层div */
  .container_center {
    width: 680px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -300px 0 0 -340px;

    /* 表单div */
    .login_box {
      .el-form {
        padding: 32px;
        bottom: 0;
        box-sizing: border-box;
        position:absolute;
        left:50%;
        top:44%;
        transform:translate(-50%,-50%);
      }

      .el-form-item {
        width: 260px;
        height: 35px;
        background: rgba(239, 239, 239, 1);
        border: 1px solid rgba(225, 225, 225, 1);
        opacity: 1;
        border-radius: 4px;
      }
      .code-style{
        width: 110px;
        height: 35px;
        background: rgba(239, 239, 239, 1);
        border: 1px solid rgba(225, 225, 225, 1);
        opacity: 1;
        border-radius: 4px;


      }
    }
  }
}
</style>
