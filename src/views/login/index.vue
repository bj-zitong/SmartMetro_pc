<template>
  <el-container class="login-container">
    <el-card class="animated flipInY">
      <div class="login_title">
        <p>城市轨道交通智慧工地管理系统</p>
        <p style="padding-top:20px">后台管理系统</p>
      </div>
      <div class="login_import">
        <p class="rl_title">城市轨道交通智慧工地管理系统</p>
        <p class="Under_the_line"></p>
        <el-form
          :rules="rules"
          :model="loginForm"
          ref="loginForm"
          label-width="30px"
          style="margin-top:130px;background:rgba(255,255,255,1)"
        >
          <el-form-item prop="username" style="position:relative;background:rgba(255,255,255,1)">
            <el-input
              type="text"
              v-model="loginForm.username"
              @keyup.enter.native="goToPwdInput"
              placeholder="请输入用户名称"
              style="width:400px"
            ></el-input>
            <span class="svg-container svg-container_user" style="margin-top:2px">
              <img src="../../../static/image/yonghu.png" class="yonghu" />
            </span>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              type="password"
              v-model="loginForm.pwd"
              @keyup.enter.native="onLogin"
              ref="pwd"
              placeholder="请输入密码"
              style="margin-top:30px;width:400px"
            ></el-input>
            <span class="svg-container svg-container_password" style="margin-top:35px">
              <img src="../../../static/image/login_zhengkai.png" class="yonghu" />
            </span>
          </el-form-item>
          <el-form-item prop="verifycode">
            <el-input
              v-model="loginForm.verifycode"
              placeholder="请输入验证码"
              style="width:210px;float:left;margin-top:27px"
            ></el-input>
            <div class="identifybox">
              <div @click="refreshCode">
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
              <el-button @click="refreshCode" type="text" class="textbtn">
                <img src="../../../static/image/shuaxin.png" class="textbtnImg" />
              </el-button>
            </div>
          </el-form-item>
          <el-button
            type="primary"
            @click="onLogin('loginForm')"
            :loading="loading"
          >{{$t('login.login')}}</el-button>
          <div class="register">
            <el-button type="text" @click="updatePassword()" class="updatePassword">忘记密码</el-button>
            <el-button type="text" class="free_registration" @click="register()">免费注册</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
    <el-footer class="login-Footer">
      <p>Copyright 2017 北京市轨道交通建设管理有限公司—北京城市轨道交通咨询有限公司 All Rights Reserved</p>
      <p>京ICP备17067133号 京公网安备11010602006143号</p>
    </el-footer>
  </el-container>
</template>
<script>
import { saveToLocal, loadFromLocal } from "@/common/local-storage";
import { mapActions } from "vuex";

/* eslint-disable*/
import code1 from "./securityCode/code";
import SIdentify from "./securityCode/securityCode";
export default {
  components: {
    SIdentify
  },
  data() {
    // pwd 验证
    const validatePwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    const validateVerifycode = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("请输入验证码"));
      } else if (value !== this.identifyCode) {
        callback(new Error("验证码不正确!"));
      } else {
        callback();
      }
    };
    return {
      // 粒子开关
      // toggleParticles: false,
      loginForm: {
        username: "",
        pwd: ""
      },
      istrue: 0,
      remember: false,
      loading: false,
      getvalue: "",
      text: "",
      identifyCodes: "1234567890",
      identifyCode: "",
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verifycode: [
          { required: true, trigger: "blur", validator: validateVerifycode }
        ]
      }
    };
  },
  created() {
    // 初始化时读取localStorage用户信息
    if (loadFromLocal("remember", false)) {
      this.loginForm.username = loadFromLocal("username", "");
      this.loginForm.pwd = loadFromLocal("password", "");
    } else {
      this.loginForm.username = "";
      this.loginForm.pwd = "";
    }
    this.refreshCode();
  },
  methods: {
    ...mapActions(["login"]),
    // 用户名输入框回车后切换到密码输入框
    goToPwdInput() {
      this.$refs.pwd.$el.getElementsByTagName("input")[0].focus();
    },
    // 登录操作
    onLogin() {
      var params = JSON.stringify({
        account: this.loginForm.username,
        password: this.loginForm.pwd
      });
      this.$refs.pwd.$el.getElementsByTagName("input")[0].blur();
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.http
            .post2(this.PersonnelLocalhosts + "/smart/auth/login", params)
            .then(res => {
              if (res.code == 200) {
                sessionStorage.setItem("userId", res.data.userId);
                 this.$global_msg.userId =res.data.userId
                sessionStorage.setItem("user", JSON.stringify(res.data));
                sessionStorage.setItem("token", res.data.token);
                this.loading = true;
                this.$message("登录成功！");
                this.$router.push({ path: "/Selectpage" });
              }
            });
        } else {
          return false;
        }
      });
    },
    getChild(v) {
      this.getvalue = v;
    },
    //注册
    register() {
      this.$router.push({ path: "/register" });
    },
    //修改密码
    updatePassword() {
      this.$router.push({ path: "/forgetPassword" });
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  },
  watch: {},
  mounted() {}
};
</script>
<style scoped lang="stylus">
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: mix(#494166, #424b50) url('../../../static/image/login-bg.jpg') center no-repeat;
  background-size: cover;
  overflow: hidden;

  .show-account {
    position: absolute;
    left: 15px;
    bottom: 20px;
    color: red;
  }

  .login_center {
    width: 1208px;
    height: 649px;
    background: rgba(0, 88, 162, 1);
    opacity: 0.8;
    border: 1px solid #fff;
  }

  .el-card {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -399px 0 0 -679px;
    width: 1358px;
    height: 799px;
    background: url('../../../static/image/zjbj.png') center no-repeat;
    border: none;

    .login_import {
      width: 461px;
      height: 649px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(112, 112, 112, 1);
      opacity: 1;
      float: right;
      margin: 45px 30px 0 0;

      .rl_title {
        height: 37px;
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 37px;
        color: rgba(10, 96, 177, 1);
        opacity: 1;
        text-align: center;
        padding-top: 60px;
      }

      .Under_the_line {
        border-bottom: 2px solid #00206a;
        float: left;
        width: 100px;
        margin-top: 45px;
        text-align: center;
        margin-left: 181px;
      }

      .register {
        margin-left: 44px;

        .updatePassword {
          font-size: 12px;
          color: rgba(192, 192, 192, 1);
        }
      }

      .free_registration {
        font-size: 12px;
        margin-left: 272px;
      }

      .r_login {
        width: 305px;
        height: 60px;
        background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
        box-shadow: 3px 6px 12px rgba(0, 88, 162, 0.23);
        opacity: 1;
        border-radius: 4px;
      }
    }

    .login_title {
      font-size: 38px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin-left: 240px;
      margin-top: 420px;
      opacity: 1;
      float: left;
      text-align: right;
    }

    .el-card-header {
      text-align: center;

      .lang-select {
        float: right;
      }
    }

    .login-title {
      margin: 0;
      text-align: center;
    }

    .svg-container {
      position: absolute;
      top: 0;
      right: 54px;
      color: #889aa4;

      &_user {
        font-size: 20px;
      }

      &_password {
        right: 54px;
        font-size: 16px;
      }

      .yonghu {
        width: 20px;
        height: 20px;
      }
    }
  }
}

.el-button--primary {
  position: relative;
  left: 42px;
  // top: 90px;
  width: 385px;
  height: 60px;
  background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
  box-shadow: 3px 6px 12px rgba(0, 88, 162, 0.23);
  opacity: 1;
  border-radius: 4px;
  font-size: 24px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  margin-top: 80px;
}

.el-input /deep/ .el-input__inner {
  // width: 400px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
  border-bottom: 1px solid rgba(225, 225, 225, 1);
}

#particles {
  width: 100%;
  height: 100%;
  /* background-color: #b61924; */
  /* background-color: #23ae88; */
  background-color: transparent;
  /* background-image: url('../img/bg_particles.png'); */
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.login-Footer {
  position: absolute;
  bottom: 35px;
  text-align: center;
  width: 100%;

  p {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
    padding-top: 10px;
  }
}

.Verification {
  font-size: 12px;
  font-weight: normal;
  color: red;
  margin-top: 0;
  margin-bottom: 0;
  // float:left
}

#s-canvas {
  margin-left: 60px;
}

.iconstyle {
  color: #409eff;
}

.identifyinput /deep/ .el-input__inner {
  width: 210px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
  border-bottom: 1px solid rgba(225, 225, 225, 1);
  margin-top: 10px;
  margin-right: 60px;
  float: left;
}

.textbtnImg {
  width: 16px;
  height: 16px;
  margin-left: 115px;
}

.verifycode {
  float: left;
}

.login-form {
  margin-top: 60px;
}

.identifybox {
  margin-top: 20px;
  margin-left: 60px;
  float: left;
}
</style>
