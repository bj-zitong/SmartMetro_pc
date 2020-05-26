<template>
  <div class="contain">
    <div class="contain-title">
      <img
        src="../../../static/image/logo.png"
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
              <el-input type="text" v-model="form.account" placeholder="账号"></el-input>
            </el-form-item>
            <!--密码-->
            <el-form-item prop="password">
              <el-input
                :type="passForm.show.new?'text':'password'"
                v-model="form.password"
                placeholder="密码"
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
        idNum: [{ required: true, validator: rules.FormValidate.Form().IdentityCode, trigger: "blur"}],
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
          var idNumState = this.IdentityCode(form.idNum);
          if (idNumState == false) {
            this.$message("身份证号格式不正确！");
            return;
          }
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
          this.http
            .post(this.PersonnelLocalhosts + "/smart/auth/regist", params)
            .then(res => {
              if (res.code == 200) {
                this.$message("注册成功！");
                this.$router.push({ path: "/login" });
              }
            });
        } else {
        }
      });
    },
    // 使用
    //身份证号校验
    IdentityCode(code) {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
      };
      var pass = true;
      var msg = "验证成功";
      //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
      if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(
          code
        )
      ) {
        pass = false;
        msg = "身份证号格式错误";
      } else if (!city[code.substr(0, 2)]) {
        pass = false;
        msg = "身份证号地址编码错误";
      } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split("");
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          if (parity[sum % 11] != code[17].toUpperCase()) {
            pass = false;
            msg = "身份证号校验位错误";
          }
        }
      }
      return pass;
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

  /* 头部 */
  .contain-title {
    height: 30px;
    width: 680px;
    position: absolute;
    top: 126px;
    left: 614px;

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
      bottom: 80px;
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
  }

  .identifybox {
    float: left;
  }

  .textbtnImg {
    width: 16px;
    height: 16px;
    margin-left: 115px;
  }
}
</style>
