<template>
  <div class="login_container">
    <!--头部-->
    <div class="container_center">
      <img src="../../../resource/logo.png" style="width:30px;height:30px;margin: 10px 0 0 10px" />
      <span class="register-head">智慧地铁管理系统</span>
      <!--表单-->
      <!---->
      <div class="accout-style">
        <router-link :to="{path: '/login' }" style="color:#0058A2">返回登录</router-link>
      </div>
      <div class="tab-title">
        <el-button type="primary" class="button-head" @click="updateState1">
          <span class="button-head-title">忘记密码</span>
        </el-button>
        <el-button type="primary" class="button-end" @click="updateState2">
          <span class="button-head-title-end">修改密码</span>
        </el-button>
      </div>
       <div class="login_box">
        <!-- 修改密码 -->
        <el-form :rules="formRules" :model="form" ref="register" class="form-content" id="btn">
          <!--手机号-->
          <el-form-item prop="phone">
            <el-input type="text" v-model="register.phone" placeholder="邮箱/手机号"></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="password">
            <el-input type="password" v-model="register.password" placeholder="初始密码"></el-input>
            <!-- <span class="svg-container svg-container_password">
              <svg-icon icon-class="password" />
            </span> -->
          </el-form-item>
          <el-form-item prop="newpassword">
            <el-input type="password" v-model="register.newpassword" placeholder="重置密码"></el-input>
            <!-- <span class="svg-container svg-container_password">
              <svg-icon icon-class="password" />
            </span> -->
          </el-form-item>
          <!--确认密码-->
          <el-form-item prop="confirmPassword">
            <el-input type="password" v-model="register.confirmPassword" placeholder="确认密码"></el-input>
            <!-- <span class="svg-container svg-container_password">
              <svg-icon icon-class="password" />
            </span> -->
          </el-form-item>
          <!--验证码-->
          <div>
            <el-form-item prop="authCode" style="width:100px;float:left">
              <el-input type="text" v-model="register.authCode" placeholder="验证码"></el-input>
            </el-form-item>
            <el-form-item  style="width:100px;float:left;margin-left:15px">
              <el-input type="text" v-model="register.authCode" value="1256"></el-input>
            </el-form-item>
            <!-- <img
              src="../../../resource/code.png"
              style="width:94px;height:35px;vertical-align:middle;margin-left:15px"
              alt="验证码"
            /> -->
            <img src="../../../resource/shuaxin.png" style="width:16px;height:16px;margin-left:10px">
          </div>
          <el-button type="primary" class="button-end" @click="updatePassword()">
            <span class="button-head-title">确定</span>
          </el-button>
        </el-form>
        <!--忘记密码 -->
         <el-form :rules="forgetFormRules" :model="forgetForm" ref="register" class="form-content" id="btn1">
          <!--手机号-->
          <el-form-item prop="account">
            <el-input type="text" v-model="register.account" placeholder="账号/手机号"></el-input>
          </el-form-item>
            <el-form-item prop="username">
            <el-input type="text" v-model="register.userName" placeholder="姓名"></el-input>
          </el-form-item>
          <!--身份证号-->
          <el-form-item prop="idNum">
            <el-input type="text" v-model="register.idNum" placeholder="身份证号"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input type="text" v-model="register.phone" placeholder="手机号码"></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="password">
            <el-input type="password" v-model="register.password" placeholder="重置密码"></el-input>
            <!-- <span class="svg-container svg-container_password">
              <svg-icon icon-class="password" />
            </span> -->
          </el-form-item>
          <!--确认密码-->
          <el-form-item prop="confirmPassword">
            <el-input type="password" v-model="register.confirmPassword" placeholder="确认密码"></el-input>
            <!-- <span class="svg-container svg-container_password">
              <svg-icon icon-class="password" />
            </span> -->
          </el-form-item>
          <!--验证码-->
          <div>
            <el-form-item prop="authCode" style="width:100px;float:left">
              <el-input type="text" v-model="register.authCode" placeholder="验证码"></el-input>
            </el-form-item>
            <el-form-item  style="width:100px;float:left;margin-left:15px">
              <el-input type="text" id="code"></el-input>
            </el-form-item>
            <!-- <img
              src="../../../resource/code.png"
              style="width:94px;height:35px;vertical-align:middle;margin-left:15px"
              alt="验证码"
            /> -->
            <img src="../../../resource/shuaxin.png" style="width:16px;height:16px;margin-left:10px">
          </div>
          <el-button type="primary" class="button-end" @click="forgetPassword()">
            <span class="button-head-title">确定</span>
          </el-button>
        </el-form>
      </div>
    </div>
  <div class="container_end">
      <p class="content-end">Copyright 2017 北京市轨道交通运营管理有限公司 All Rights Reserved</p><br/>
      <p class="content-end1">京ICP备17067133号  京公网安备11010602006143号</p>
    </div>
  </div>
</template>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script>
export default {
  data() {
    return {
      authCode: '',  // 全局验证码
      code: '',
      form: {
        phone: '',
        newpassword: '',
        password: '',
        confirmPassword: '',
        authCode: ''
      },
      formRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '目前只支持中国大陆的手机号码'
          }
        ],
        newpassword: [{ required: true, message: '请输入重置密码', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ],
        authCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },

      forgetFormRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '目前只支持中国大陆的手机号码'
          }
        ],
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        newpassword: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
        password: [{ required: true, message: '请输入重置密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ],
        authCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        idNum: [{ required: true, message: '请输入身份证号', trigger: 'blur' }]
      },
      forgetForm: {
        phone: '',
        userName: '',
        idNum: '',
        newpassword: '',
        password: '',
        confirmPassword: '',
        authCode: ''
      }
    }
  },
  created() {
  //  this.updateState1();
    this.createCode()
  },
  methods: {

     // 生成验证码
    createCode () {
      var code
    // 首先默认code为空字符串
      code = ''
    // 设置长度，这里看需求，我这里设置了4
      var codeLength = 4
    // 设置随机字符
      var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
    // 循环codeLength 我设置的4就是循环4次
      for (var i = 0; i < codeLength; i++) {
      // 设置随机数范围,这设置为0 ~ 36
        var index = Math.floor(Math.random() * 36)
      // 字符串拼接 将每次随机的字符 进行拼接
        code += random[index]
      }
    // 将拼接好的字符串赋值给展示的code
      this.code = code
      // 将生成的验证码赋值给全局变量
      this.authCode = code
      document.getElementById('code').value = '123'
    },
    // 忘记密码
    forgetPassword() {
      // this.$router.push({ path: '/index' });
      console.log('忘记密码')
    },
    // 修改密码
    updatePassword() {
      console.log('修改密码')
    },
    register() {
      this.$router.push({ path: '/register' })
    },
      // 修改密码
    updateState1() {
      document.getElementById('btn1').style.display = 'block'
      document.getElementById('btn').style.display = 'none'
    },
    // 忘记密码
    updateState2() {
      document.getElementById('btn').style.display = 'block'
      document.getElementById('btn1').style.display = 'none'
    }

  }
}
</script>
<style scoped lang="stylus">
/* 总div */
.login_container {
  width: 100%;
  height: 100vh;
  background-color: rgba(244, 244, 244, 1);
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
    opacity: 1;
    margin-left: 20px;
  }

  .accout-style {
    width: 125px;
    height: 14px;
    font-size: 10px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 14px;
    color: rgba(10, 96, 177, 1);
    opacity: 1;
    float: right;
    margin-top: 14px
  }

  .tab-title{
    width: 680px;
    height: 60px;
    box-shadow: 3px 6px 12px rgba(0, 88, 162, 0.23);
    opacity: 1;
    border-radius: 4px;



  /* 头部head button */
  .button-head {
    width:340px;
    height:60px;
    background:linear-gradient(180deg,rgba(54,130,243,1) 0%,rgba(0,88,162,1) 100%);
    box-shadow:3px 6px 12px rgba(0,88,162,0.23);
    opacity:1;
    border-radius:0px 4px 4px 0px;
  }
  /* */
  .button-end{
    width:340px;
    height:60px;
    background:rgba(246,247,248,1);
    box-shadow:3px 6px 12px rgba(0,88,162,0.23);
    opacity:1;
    border-radius:4px 0px 0px 4px;
    position:absolute;
    margin-left: 0px;


  }
    /* 按钮文字 */
    .button-head-title {
     width:120px;
    height:31px;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    line-height:31px;
    color:rgba(255,255,255,1);
    letter-spacing:20px;
    opacity:1;
    }
  .button-head-title-end{
    width:120px;
    height:31px;
    font-size:24px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:31px;
    color:rgba(99,99,99,1);
    letter-spacing:20px;
    opacity:1;
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
    }
  }

.container_end{
    width: 100%;
    height: 50px;
    position: absolute;
    bottom:80px;
    left: 0;
    text-align center;
     p{
        height:14px;
        font-size:10px;
        font-family:Microsoft YaHei;
        font-weight:400;
        line-height:14px;
        color:rgba(161,161,161,1);
        opacity:1;
     }
  }
}
</style>
