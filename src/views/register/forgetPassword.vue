<template>
  <div class="contain">
    <div class="contain-title">
      <img src="../../../resource/logo.png" style="width:30px;height:30px;margin-top:0px;" />
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
            <el-input  :type="passForm.show.new?'text':'password'"  v-model="forgetForm.password2" placeholder="重置密码">
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
            <el-input  :type="passForm.show.check?'text':'password'" v-model="forgetForm.confirmPassword2" placeholder="确认密码">
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
            <el-form-item prop="authCode2" style="width:100px;float:left">
              <el-input type="text" v-model="forgetForm.authCode2" placeholder="验证码"></el-input>
            </el-form-item>
            <el-form-item prop="Code" style="width:100px;float:left;margin-left:15px">
              <el-input type="text" v-model="forgetForm.Code"></el-input>
            </el-form-item>
            <img
              src="../../../resource/shuaxin.png"
              style="width:16px;height:16px;margin-left:10px"
              @click="getNewCode()"
            />
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
</template>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script>
export default {
  data() {
    return {
      code: "",
      forgetFormRules: {
        phone2: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码"
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
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        idNum: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        Code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
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
    //  this.updateState1();
    this.createCode();
  },
  methods: {
    getNewCode() {
      this.createCode();
    },
    // 生成验证码
    createCode() {
      var code;
      // 首先默认code为空字符串
      code = "";
      // 设置长度，这里看需求，我这里设置了4
      var codeLength = 4;
      // 设置随机字符
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      // 循环codeLength 我设置的4就是循环4次
      for (var i = 0; i < codeLength; i++) {
        // 设置随机数范围,这设置为0 ~ 36
        var index = Math.floor(Math.random() * 36);
        // 字符串拼接 将每次随机的字符 进行拼接
        code += random[index];
      }
      // 将拼接好的字符串赋值给展示的code
      this.code = code;
      // 将生成的验证码赋值给全局变量
      this.forgetForm.Code = code;
    },
    // 忘记密码
    forgetPassword(forgetForm) {
      var form = this.forgetForm;
      //校验
      if (
        form.account != undefined &&
        form.userName2 != undefined &&
        form.idNum != undefined &&
        form.phone2 != undefined &&
        form.password2 != undefined
      ) {
        if (form.password2 != form.confirmPassword2) {
          this.$message("密码不一致，请重新输入！");
          return;
        }
        var inputcode = form.authCode2.toUpperCase();
        if (inputcode != form.Code) {
          this.$message("验证码输入不正确，请重新输入！");
          this.createCode();
          return;
        }
        var idNumState = this.IdentityCode(form.idNum);
        if (idNumState == false) {
          this.$message("身份证号格式不正确！");
          return;
        }
        //请求参数
        var params = JSON.stringify({
          name: form.userName2,
          cellPhone: form.phone2,
          idNum: form.idNum,
          account: form.account,
          password: form.password2
        });
        this.http.post("/smart/auth/password/forget", params).then(res => {
          if (res.code == 200) {
            this.$message("修改成功！");
            this.$router.push({ path: "/login" });
          }
        });
        // console.log(params);
      }
    },
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
        top: 44%;
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
      .button-end-title{
        width:30px;
        height:17px;
        font-size:13px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        line-height:17px;
        color:rgba(255,255,255,1);
        letter-spacing:20px;
        opacity:1;
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
</style>
