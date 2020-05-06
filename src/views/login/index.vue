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
          label-width="40px"
          style="margin-top:130px"
        >
          <el-form-item prop="username" style="position:relative">
            <el-input type="text" v-model="loginForm.username" @keyup.enter.native="goToPwdInput"></el-input>
            <span class="svg-container svg-container_user">
              <svg-icon icon-class="user" />
            </span>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              type="password"
              v-model="loginForm.pwd"
              @keyup.enter.native="onLogin"
              ref="pwd"
            ></el-input>
            <span class="svg-container svg-container_password">
              <svg-icon icon-class="password" />
            </span>
          </el-form-item>
          <div class="register">
            <el-button type="text" @click="updatePassword()">忘记/修改密码</el-button>
            <el-button type="text" class="free_registration" @click="register()">免费注册</el-button>
          </div>
          <el-button
            type="primary"
            @click="onLogin('loginForm')"
            :loading="loading"
          >{{$t('login.login')}}</el-button>
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
// import { isValidUsername } from '@/utils/validate'
import { saveToLocal, loadFromLocal } from "@/common/local-storage";
import { mapActions } from "vuex";
/* eslint-disable*/
import particles from "particles.js";
export default {
  data() {
    // username 验证
    // const validateUsername = (rule, value, callback) => {
    // if (!isValidUsername(value)) {
    //   callback(new Error("请输入正确的用户名"));
    // } else {
    //   callback();
    // }
    // };
    // pwd 验证
    const validatePwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      // 粒子开关
      // toggleParticles: false,
      loginForm: {
        username: "admin",
        pwd: "123456"
      },
      remember: false,
      loading: false,
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
          // { required: true, trigger: "blur", validator: validateUsername },
          // { required: true, trigger: "change", validator: validateUsername }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { required: true, trigger: "blur", validator: validatePwd },
          // { required: true, trigger: "change", validator: validatePwd }
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
  },
  methods: {
    ...mapActions(["login"]),
    // 用户名输入框回车后切换到密码输入框
    goToPwdInput() {
      this.$refs.pwd.$el.getElementsByTagName("input")[0].focus();
    },
    // 登录操作
    onLogin() {
      
      this.$refs.pwd.$el.getElementsByTagName("input")[0].blur();
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
           this.$router.push({ path: "/Selectpage" });
          // this.login(this.loginForm)
            // .then(() => {
            //   // 保存账号
            //   if (this.remember) {
            //     saveToLocal("username", this.loginForm.username);
            //     saveToLocal("password", this.loginForm.pwd);
            //     saveToLocal("remember", true);
            //   } else {
            //     saveToLocal("username", "");
            //     saveToLocal("password", "");
            //     saveToLocal("remember", false);
            //   }
             
            //   // this.$router.push({ path: "/" })
            // })
            // .catch(() => {
            //   this.loading = false;
            // });
        } else {
          return false;
        }
      });
      // var data ={
      //   "account": "1111",
      //   "password": "2222"
      // }
      // this.http.post('/smart/auth/login',data).then(res => {
      //   // if (res.code == 200) {
      //   //   // this.info = res.data.list;
      //   //   // this.page = res.data;
      //   // }
      // });
    },
    //注册
    register() {
      this.$router.push({ path: "/register" });
    },
    //修改密码
    updatePassword() {
      this.$router.push({ path: "/updatePassword" });
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
      width: 380px;
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
        margin-left: 140px;
      }

      .register {
        margin-left: 40px;
      }

      .free_registration {
        margin-left: 150px;
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
      margin-left: 350px;
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

    .el-input /deep/ .el-input__inner {
      text-indent: 12px;
      width: 300px;
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
    }
  }
}

.el-button--primary {
  position: relative;
  left: 42px;
  top: 90px;
  width: 300px;
  height: 60px;
  background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
  box-shadow: 3px 6px 12px rgba(0, 88, 162, 0.23);
  opacity: 1;
  border-radius: 4px;
  font-size: 24px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
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
  bottom: 0;
  text-align: center;
  width: 100%;

  p {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 19px;
    color: rgba(255, 255, 255, 1);
    opacity: 1;
  }
}
</style>
