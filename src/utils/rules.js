/**
 * @author 何廷坤
 * @date 2019/4/30
 * @Description: 校验公共方法
*/
// 账号
let codeReg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/
// 电话
let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/

// 必须为数字
let numberReg = /^\d+$|^\d+[.]?\d+$/

// 密码
let passwordReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/

// 联系人
let contactsReg = /^[\u0391-\uFFE5A-Za-z]+$/

//只能是汉字的校验
var chinesecharacters = /^[\u4e00-\u9fa5]+$/;

let regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/

let FormValidate = (function () {
  function FormValidate () {}
  // From表单验证规则  可用于公用的校验部分
  FormValidate.Form = function () {
    return {
      // 账号的验证规则
      validateCode (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入账号'))
        }
        if (!codeReg.test(value)) {
          callback(new Error('账号必须为6-20位字母和数字组合'))
        } else {
          callback()
        }
      },

      // 只能数字的验证
      validateNumber (rule, value, callback) {
        if (value !== '') {
          if (!numberReg.test(value)) {
            callback(new Error('必须为数字'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },

      // 密码的验证
      validatePsdReg (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入密码'))
        }
        if (!passwordReg.test(value)) {
          callback(new Error('请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'))
        } else {
          callback()
        }
      },

      // 联系人
      validateContacts (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入联系人'))
        }
        if (!contactsReg.test(value)) {
          callback(new Error('联系人不可输入特殊字符'))
        } else {
          callback()
        }
      },

      // 邮箱的验证规则
      validateEmail (rule, value, callback) {
        if (value !== '') {
          if (!emailReg.test(value)) {
            callback(new Error('邮箱格式不正确'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      },

      // 电话号码的验证
      validatePhone (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入手机号码'))
        }
        if (!phoneReg.test(value)) {
          callback(new Error('手机格式不正确'))
        } else {
          callback()
        }
      },

      // 身份证的验证规则
      ID (rule, value, callback) {
        if (!value) {
          return callback(new Error('身份证不能为空'))
        }
        if (!regId.test(value)) {
          callback(new Error('请输入正确的二代身份证号码'))
        } else {
          callback()
        }
      },
        //身份证号校验
    IdentityCode(rule,code,callback) {
      if (!code) {
        return callback(new Error('身份证不能为空'))
      }
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
      // var pass = true;
      // var msg = "验证成功";
      //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
      if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(
          code
        )
      ) {
        // pass = false;
        callback(new Error('身份证号格式错误'))
        // msg = "身份证号格式错误";
      } else if (!city[code.substr(0, 2)]) {
        // pass = false;
        // msg = "身份证号地址编码错误";
        callback(new Error('身份证号地址编码错误'))
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
            callback(new Error('身份证号校验位错误'))
          }
        }
      }
      // return pass;
    }
    }
  }

  return FormValidate
}())

exports.FormValidate = FormValidate
