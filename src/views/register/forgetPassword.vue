<template>
  <div class="contain">
    <div class="box-content">
    <div class="contain-title">
      <img
        src="../../../static//image//logo.png"
        style="width:30px;height:30px;margin-top:0px;float:left;margin-left:10px"
      />
      <span class="register-head">城市轨道交通智慧工地管理系统</span>
      <!--表单-->
      <div class="container-head">
        <span>已有账号，</span>
        <router-link :to="{path: '/login' }" style="color:#0058A2">马上登录</router-link>
      </div>
    </div>
    <div class="login_container">
      <!--头部-->
      <div class="container_center">
        <el-button type="primary" class="button-head">
          <span class="button-head-title">忘记密码</span>
        </el-button>
        <div class="login_box">
          <!--忘记密码 -->
          <el-form
            :rules="forgetFormRules"
            :model="forgetForm"
            ref="forgetForm"
            class="form-content"
            id="btn1"
          >
            <!--手机号-->
            <el-form-item prop="account">
              <el-input type="text" v-model="forgetForm.account" placeholder="账号/手机号"></el-input>
            </el-form-item>
            <el-form-item prop="userName2">
              <el-input type="text" v-model="forgetForm.userName2" placeholder="姓名"></el-input>
            </el-form-item>
            <!--身份证号-->
            <el-form-item prop="idNum">
              <el-input type="text" v-model="forgetForm.idNum" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item prop="phone2">
              <el-input type="text" v-model="forgetForm.phone2" placeholder="手机号码"></el-input>
            </el-form-item>
            <!--密码-->
            <el-form-item prop="password2">
              <el-input
                :type="passForm.show.new?'text':'password'"
                v-model="forgetForm.password2"
                placeholder="重置密码"
                autocomplete="new-password"
              >
                <img
                  :src="passForm.show.new?'/static/image/show.png':'/static/image/hide.png'"
                  slot="suffix"
                  alt
                  style="margin: 10px 0;"
                  @click="passForm.show.new=!passForm.show.new"
                />
              </el-input>
            </el-form-item>
            <!--确认密码-->
            <el-form-item prop="confirmPassword2">
              <el-input
                :type="passForm.show.check?'text':'password'"
                v-model="forgetForm.confirmPassword2"
                placeholder="确认密码"
              >
                <img
                  :src="passForm.show.check?'/static/image/show.png':'/static/image/hide.png'"
                  slot="suffix"
                  alt
                  style="margin: 10px 0;"
                  @click="passForm.show.check=!passForm.show.check"
                />
              </el-input>
            </el-form-item>
            <!--验证码-->
            <div>
              <el-form-item prop="authCode2" style="width:100px;float:left;margin-right:20px;">
                <el-input v-model="forgetForm.authCode2" placeholder="验证码"></el-input>
              </el-form-item>
              <div @click="refreshCode" style="margin-left:20px;">
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
              <el-button @click="refreshCode" type="text" class="textbtn">
                <img src="../../../static/image/shuaxin.png" class="textbtnImg" />
              </el-button>
            </div>
            <el-button type="primary" class="button-end" @click="forgetPassword('forgetForm')">
              <span class="button-end-title">确定</span>
            </el-button>
          </el-form>
        </div>
      </div>
      <div class="container_end">
        <p class="content-end">Copyright 2017 北京市轨道交通运营管理有限公司 All Rights Reserved</p>
        <br />
        <p class="content-end1">京ICP备17067133号 京公网安备11010602006143号</p>
      </div>
    </div>
  </div>
  </div>
</template>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script>
import SIdentify from "../login/securityCode/securityCode";
import rules from "@/utils/rules";
export default {
  components: {
    SIdentify
  },
  data() {
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
      text: "",
      identifyCodes: "1234567890",
      identifyCode: "",
      code: "",
      forgetFormRules: {
        phone2: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号格式不正确"
          }
        ],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        userName2: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password2: [
          { required: true, message: "请输入重置密码", trigger: "blur" }
        ],
        confirmPassword2: [
          { required: true, message: "请输入确认密码", trigger: "blur" }
        ],
        authCode2: [
          { required: true, trigger: "blur", validator: validateVerifycode }
        ],
        idNum: [
          {
            required: true,
            trigger: "blur",
            validator: rules.FormValidate.Form().IdentityCode
          }
        ]
      },
      forgetForm: {
        account: "",
        phone2: "",
        userName2: "",
        idNum: "",
        password2: "",
        confirmPassword2: "",
        authCode2: "",
        Code: ""
      },
      passForm: {
        oldPass: "",
        newPass: "",
        checkPass: "",
        show: {
          old: false,
          new: false,
          check: false
        }
      }
    };
  },
  created() {
    this.refreshCode();
  },
  methods: {
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
    },
    // 忘记密码
    forgetPassword(forgetForm) {
      this.$refs["forgetForm"].validate(valid => {
        if (valid) {
          var form = this.forgetForm;
          //校验
          if (form.password2 != form.confirmPassword2) {
            this.$message("密码不一致，请重新输入！");
            return;
          }
          //请求参数
          var params = JSON.stringify({
            userName: form.userName2,
            cellPhone: form.phone2,
            idNum: form.idNum,
            account: form.account,
            password: form.password2
          });
          var url = this.PersonnelLocalhosts + "/smart/auth/password/forget";
          this.http.post(url, params).then(res => {
            if (res.code == 200) {
              this.$message("修改成功！");
              this.$router.push({ path: "/login" });
            }
          });
        } else {
        }
      });
    },
    register() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>
<style scoped lang="stylus">
/* 总div */
.contain {
  width: 100%;
  height: 100vh;
  background-color: rgba(244, 244, 244, 1);
  opacity: 1; /* 不透明级别 */

 .box-content {
    width: 680px;
    height: 750px;
    position: absolute;
    top: 45%;
    left: 50%;
    margin: -300px 0 0 -340px;
    background-color: rgba(244, 244, 244, 1);

  /* 头部 */
  .contain-title {
    height: 30px;
    width: 680px;
    position: absolute;
    top: 30px;

    .register-head {
      width: 163px;
      height: 26px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 26px;
      color: rgba(0, 88, 162, 1);
      opacity: 1;
      margin-left: 20px;
      margin-top: 10px;
    }

    .container-head {
      width: 125px;
      height: 14px;
      font-size: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 14px;
      // color: rgba(10, 96, 177, 1);
      opacity: 1;
      float: right;
      margin-top: 20px;
    }
  }

  .login_container {
    /* 头部head button */
    .button-head {
      width: 680px;
      height: 60px;
      background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
      box-shadow: 3px 6px 12px rgba(0, 88, 162, 0.23);
      opacity: 1;
      border-radius: 0px 4px 4px 0px;
    }

    /* 按钮文字 */
    .button-head-title {
      width: 120px;
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
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    // opacity:0.5;
    border-radius: 4px;

    /* 表单div */
    .login_box {
      .el-form {
        padding: 32px;
        bottom: 0;
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
      }

      .el-form-item {
        width: 260px;
        height: 35px;
        background: rgba(239, 239, 239, 1);
        border: 1px solid rgba(225, 225, 225, 1);
        opacity: 1;
        border-radius: 4px;
      }

      .code-style {
        width: 120px;
        height: 35px;
        background: rgba(239, 239, 239, 1);
        border: 1px solid rgba(225, 225, 225, 1);
        opacity: 1;
        border-radius: 4px;
      }

      .button-end {
        width: 260px;
        height: 35px;
        background: linear-gradient(180deg, rgba(54, 130, 243, 1) 0%, rgba(0, 88, 162, 1) 100%);
        box-shadow: 3px 6px 12px rgba(0, 88, 162, 0.23);
        opacity: 1;
        border-radius: 4px;
        margin-top: 10px;
      }

      .button-end-title {
        width: 30px;
        height: 17px;
        font-size: 13px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 17px;
        color: rgba(255, 255, 255, 1);
        letter-spacing: 20px;
        opacity: 1;
      }
    }
  }

  .container_end {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: -10px;
    left: 0;
    text-align: center;

    p {
      height: 14px;
      font-size: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 14px;
      color: rgba(161, 161, 161, 1);
      opacity: 1;
    }
  }

  .textbtnImg {
    width: 16px;
    height: 16px;
    margin-left: 115px;
  }
 }
}
</style>
