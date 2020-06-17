<template>
  <div class="contain">
    <!--表单-->
    <div class="box-content">
      <div class="contain-title">
        <img
          src="../../../static/image/logo.png"
          style="width:30px;height:30px;margin-top:0px;float:left;margin-left:10px"
        />
        <span class="register-head">城市轨道交通智慧工地管理系统</span>
        <div class="container-head">
          <span>已有账号，</span>
          <router-link :to="{path: '/login' }" style="color:#0058A2">马上登录</router-link>
        </div>
      </div>
      <div class="login_container">
        <!--头部-->
        <div class="container_center">
          <el-button type="primary" class="button-head">
            <span class="button-head-title">注册</span>
          </el-button>
          <div class="login_box">
            <!-- 注册表单 -->
            <el-form :rules="formRules" :model="form" ref="form" class="form-content">
              <!-- -->
              <el-form-item prop="orgSite">
                <el-input type="text" v-model="form.orgSite" placeholder="标段/工地"></el-input>
              </el-form-item>
              <!-- 用户名-->
              <el-form-item prop="userName">
                <el-input type="text" v-model="form.userName" placeholder="用户名"></el-input>
              </el-form-item>
              <!--手机号-->
              <el-form-item prop="cellPhone">
                <el-input type="text" v-model="form.cellPhone" placeholder="手机号码"></el-input>
              </el-form-item>
              <!--身份证号-->
              <el-form-item prop="idNum">
                <el-input type="text" v-model="form.idNum" placeholder="身份证号"></el-input>
              </el-form-item>
              <!--账户-->
              <el-form-item prop="account">
                <el-input type="text" style="position:fixed;bottom:-9999px;display:none"></el-input>
                <el-input type="text" v-model="form.account" placeholder="账号"></el-input>
              </el-form-item>
              <!--密码-->
              <el-form-item prop="password">
                <el-input
                  :type="passForm.show.new?'text':'password'"
                  v-model="form.password"
                  placeholder="密码"
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
              <el-form-item prop="confirmPassword">
                <el-input
                  :type="passForm.show.check?'text':'password'"
                  v-model="form.confirmPassword"
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
                <el-form-item prop="authCode" style="width:100px;float:left;margin-right:20px;">
                  <el-input v-model="form.authCode" placeholder="验证码"></el-input>
                </el-form-item>
                <div @click="refreshCode" style="margin-left:20px;">
                  <s-identify :identifyCode="identifyCode"></s-identify>
                </div>
                <el-button @click="refreshCode" type="text" class="textbtn">
                  <img src="../../../static/image/shuaxin.png" class="textbtnImg" />
                </el-button>
              </div>
              <el-button type="primary" class="button-end" @click="register('form')">
                <span class="button-end-title">点击注册</span>
              </el-button>
            </el-form>
          </div>
        </div>
        <!--最后-->
        <div class="container_end">
          <p class="content-end">Copyright 2017 北京市轨道交通运营管理有限公司 All Rights Reserved</p>
          <br />
          <p class="content-end1">京ICP备17067133号 京公网安备11010602006143号</p>
        </div>
      </div>
    </div>
  </div>
</template>
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
      form: {
        orgSite: "",
        userName: "",
        cellPhone: "",
        idNum: "",
        account: "",
        password: "",
        confirmPassword: "",
        authCode: ""
      },
      formRules: {
        orgSite: [
          { required: true, message: "请输入标段/工地", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        cellPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号格式不正确"
          }
        ],
        idNum: [
          {
            required: true,
            trigger: "blur",
            validator: rules.FormValidate.Form().IdentityCode
            // message: "请输入账号",
          }
        ],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" }
        ],
        authCode: [
          { required: true, trigger: "blur", validator: validateVerifycode }
        ]
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
    // 注册
    register(form) {

      // 使用
      var form = this.form;
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (form.password != form.confirmPassword) {
            this.$message("密码不一致，请重新输入！");
            return;
          }
          //请求参数
          var params = JSON.stringify({
            userName: form.userName,
            cellPhone: form.cellPhone,
            idNum: form.idNum,
            account: form.account,
            password: form.password,
            orgSite: form.orgSite
          });
          var url =
            "/systemUrl/smart/auth/regist";
          this.http.post2(url, params).then(res => {
            if (res.code == 200) {
                this.$message("注册成功！");
                this.$router.push({ path: "/login" });
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped lang="stylus">
/* 总div */
.contain {
  width: 100%;
  height: 120vh;
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
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 4px;

        /* 表单div */
        .login_box {
          .el-form {
            padding: 32px;
            bottom: 0;
            box-sizing: border-box;
            position: absolute;
            left: 50%;
            top: 38%;
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
          }

          .button-end-title {
            width: 65px;
            height: 17px;
            font-size: 13px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            line-height: 17px;
            color: rgba(255, 255, 255, 1);
            letter-spacing: 10px;
            opacity: 1;
          }
        }
      }

      .container_end {
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: -10px;
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
    }

    .textbtnImg {
      width: 16px;
      height: 16px;
      margin-left: 115px;
    }
  }
}
</style>
