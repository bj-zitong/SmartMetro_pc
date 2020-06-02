import axios from 'axios';
import { Message } from 'element-ui';
axios.defaults.baseURL = process.env.VUE_APP_URL
// import router from '../router';
// let localhosts = 'http://localhost:8001';   //请求的后台域名
axios.interceptors.request.use(config => {//请求之前(可以设置token)
    // axios.defaults.baseURL = localhosts
    // console.log(config)
    return config
}, error => {
    Message.error(error)
    return Promise.reject(error);
});
axios.interceptors.response.use(response => {//数据拿到之后
    return response.data
}, error => {
    Message.error('Http请求失败，请联系管理员');
    return Promise.reject(error.response);
});
function successfun(res) {//处理后台返回的非200错误
    if (res.code === 200) { 
        return res
    } else {
        //  Message.warning(res.message);
        return res;
    }
}
function errorfun(res) {
    if (res.code != 200) {
        Message.error(res.message);
        return res;
    }
}
export default {
    post(url, data) {//post请求
        // return axios({
        //     method: 'post',
        //     headers: {
        //         Authorization: sessionStorage.getItem('token'),
        //         'Content-Type': 'application/json',
        //     },
        //     baseURL: ,
        //     url,
        //     data: data,
        //     withCredentials: true,
        //     timeout: 5000,//响应时间,
        //     responseType: "arraybuffer"
        // }).then(res => {
        //     return successfun(res)
        // }, err => {
        //     return errorfun(err);
        // })
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
