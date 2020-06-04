import axios from 'axios';
import { Message } from 'element-ui';
import router from '@/router';
axios.defaults.baseURL = process.env.VUE_APP_URL
// let localhosts = 'http://localhost:8001';   //请求的后台域名
var that = this;
axios.interceptors.request.use(config => {//请求之前(可以设置token)
  return config
}, error => {
  return Promise.reject(error);
});
//后台返回请求
axios.interceptors.response.use(response => {//数据拿到之后
  console.log(response);
  return response.data
}, error => {
  console.log(error.response.data);//unauthorized
  console.log(error.response.status);
  var errorMsg = '服务器繁忙，请稍后重试！';
  //unauthorized 未授权
  if (error.response.data == 'unauthorized') {
    errorMsg = '请登录';
    window.location.href = "../views/login/index.vue";
    return;
  }
  const errorStatus = error.response.status;//返回状态码
  switch (errorStatus) {
    case 401:
      router.push('/login');
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");//删除存储信息
      Notification({
        title: '请重新登录',
        message: '登录已过期，请重新登录',
        showIcon: true,
        center: true,
        type: 'error'
      });
      break
    case 403:
      errorMsg = '没有权限';
      break
    case 404:
      errorMsg = '请求路径找不到';
      break
    case 500:
      errorMsg = '请求失败，请联系管理员';
      break
    default:
      errorMsg = resErrorMsg
  }
  Message.error(errorMsg);//对应状态返回的提示
  router.push('/login');//跳转页面
  return Promise.reject(error.response);
});
//请求成功 返回请求数据
function successfun(res) {//处理后台返回的非200错误
  if (res.code === 200) {
    return res
  } else {
    console.log(res);
    return res;
  }
}
//失败
function errorfun(res) {
  console.log(res);
  // if (res.code != 200) {
  //     this.$router.push("/login")
  //     Message.error(res.message);
  //     return res;
  // }
}
export default {
  post(url, data) {//post请求
    return axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token")
      },
      url: url,
      data: data,
      withCredentials: true,
      timeout: 5000 //响应时间
    }).then(
      res => {
        return successfun(res)
      },
      err => {
        return errorfun(err);
      }
    );
  },
  post2(url, data) {//post请求
    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: url,
      data: data,
      withCredentials: true,
      timeout: 5000,//响应时间,
      responseType: "arraybuffer"
    }).then(res => {
      return successfun(res)
    }, err => {
      return errorfun(err);
    })
  },
  get(url, params) {//get请求
    return axios({
      method: 'get',
      headers: {
        Authorization: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      url: url,
      params,
      withCredentials: true,
      timeout: 5000,
    }).then(res => {
      return successfun(res)
    }, err => {
      return errorfun(err)
    })
  },
  delete(url, data) {//delete请求
    return axios({
      method: 'delete',
      headers: {
        Authorization: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      url: url,
      data: data,
      withCredentials: true,
      timeout: 5000,
    }).then(res => {
      return successfun(res)
    }, err => {
      return errorfun(err)
    })
  },
  put(url, data) {//put请求
    return axios({
      method: 'put',
      headers: {
        Authorization: sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      url: url,
      data: data,
      withCredentials: true,
      timeout: 5000,//响应时间
    }).then(res => {
      return successfun(res)
    }, err => {
      return errorfun(err);
    })
  },
}
