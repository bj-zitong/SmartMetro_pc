import axios from 'axios';
import { Message } from 'element-ui';
// import router from '../router';
let localhosts = 'http://localhost:8080';   //请求的后台域名
axios.interceptors.request.use(config => {//请求之前(可以设置token)
    return config
},error =>{
    Message.error(error)
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {//数据拿到之后
    return response.data
},error => {
    Message.error('Http请求失败，请联系管理员');
    return Promise.reject(error.response);;
});
function successfun(res){//处理后台返回的非200错误
    if(res.code === 200){
        return res
    }else{
         Message.warning(res.message);
         return res;
    }
}
function errorfun(res){
    if(res.code != 200){
        Message.error(res.message);
        return res;
    }
}
export default{
    post(url,data){//post请求
        return axios({
            method:'post',
            headers:{
                 Authorization:'bdcf1af9c1f9000e465cd970f5a46fbebc26fad7fee9f912d3e9546e023e170d',
                 'Content-Type': 'application/json',
            },
            baseURL:localhosts,
            url,
            data: data,
            withCredentials: true,
            timeout:5000,//响应时间
        }).then(res => {
            return successfun(res)
        },err => {
            return errorfun(err);
        })
    },
    get(url,params){//get请求
        return axios({
            method:'get',
            headers:{
                Authorization:'bdcf1af9c1f9000e465cd970f5a46fbebc26fad7fee9f912d3e9546e023e170d',
                'Content-Type': 'application/json',
            },
            baseURL:localhosts,
            url,
            params,
            withCredentials: true,
            timeout:5000,
        }).then(res => {
            return successfun(res)
        },err => {
            return errorfun(err)
        })
    },
    delete(url,data){//delete请求
      return axios({
          method:'delete',
          headers:{
              Authorization:'bdcf1af9c1f9000e465cd970f5a46fbebc26fad7fee9f912d3e9546e023e170d',
              'Content-Type': 'application/json',
          },
          baseURL:localhosts,
          url,
          data: data,
          withCredentials: true,
          timeout:5000,
      }).then(res => {
          return successfun(res)
      },err => {
          return errorfun(err)
      })
  },
    put(url,data){//put请求
      return axios({
          method:'put',
          headers:{
              Authorization:'bdcf1af9c1f9000e465cd970f5a46fbebc26fad7fee9f912d3e9546e023e170d',
              'Content-Type': 'application/json',
          },
          baseURL:localhosts,
          url,
          data: data,
          withCredentials: true,
          timeout:5000,//响应时间
      }).then(res => {
          return successfun(res)
      },err => {
          return errorfun(err);
      })
},

}