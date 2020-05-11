<template>
  <el-form class="login-form" status-icon :rules="loginRules" :model="loginForm">
    <!-- <el-form-item prop="username">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" :style="fontstyle" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>-->

    <!-- <el-form-item class="verifycode" style="margin-right:60px" prop="verifycode"> -->
    <div class="identifyinput">
      <el-input v-model="loginForm.verifycode" placeholder="请输入验证码"></el-input>
      <h6 class="Verification">{{text}}</h6>
    </div>
  
    <!-- </el-form-item> -->

    <!-- <el-form-item> -->
    <div class="identifybox">
      <div @click="refreshCode">
        <s-identify :identifyCode="identifyCode"></s-identify>
      </div>
      <el-button @click="refreshCode" type="text" class="textbtn">
        <img src="../../../../static/image/shuaxin.png" class="textbtnImg" />
      </el-button>
    </div>
    <!-- </el-form-item> -->
  </el-form>
</template>
<script>
// import { isvalidUsername } from '@/utils/validate'
import SIdentify from "./securityCode";
export default {
  name: "userlogin",
  props: ["message"],
  data() {
    // 用户名自定义验证规则
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     console.log('user', value)
    //     callback()
    //   }
    // }
    // 验证码自定义验证规则
    const validateVerifycode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.identifyCode) {
        console.log("validateVerifycode:", value);
        callback(new Error("验证码不正确!"));
      } else {
        callback();
      }
    };
    return {
      fontstyle: {},
      loginForm: {
        username: "admin",
        password: "123456",
        verifycode: ""
      },
      text: "",
      checked: false,
      identifyCodes: "1234567890",
      identifyCode: "",
      loginRules: {
        // 绑定在form表单中的验证规则
        username: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        verifycode: [
          { required: true, trigger: "blur", validator: validateVerifycode }
        ]
      },
      passwordType: "password"
    };
  },
  watch: {
    message(newV, oldV) {
      if (newV) {
        this.handleLogin();
      }
    }
  },
  components: {
    SIdentify
  },
  created() {},
  mounted() {
    // 验证码初始化
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  computed: {},
  methods: {
    // 通过改变input的type使密码可见
    showPassword() {
      this.fontstyle === ""
        ? (this.fontstyle = "color: red")
        : (this.fontstyle = ""); // 改变密码可见按钮颜色
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    // 点击登入按钮
    handleLogin() {
      // if(this.)
      if (this.loginForm.verifycode == "") {
        this.text = "请输入验证码";
      }
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.$store.dispatch("Login", this.loginForm).then(res => {
      //       // this.$router.push({ path: "/dashboard/dashboard" });
      //     });
      //   }
      // });
    },
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 切换验证码
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
      console.log(this.identifyCode);
    }
  }
};
</script>
<style scoped lang="stylus">
.identifybox {
  // display: flex;
  // justify-content: space-between;
  // margin-top: 7px;
  // width :100px
}

#s-canvas {
  margin-left: 60px;
}

.iconstyle {
  color: #409eff;
}

.identifyinput {
  float: left;
  width: 210px;
  margin-left: 30px;
  margin-right: 60px;
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
.Verification{
   font-size:12px;
  font-weight:normal;
  color:red;
  margin:0 0;
}
</style>
