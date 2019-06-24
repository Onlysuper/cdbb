import axios from 'axios';
import { Toast } from 'vant';

//全局响应拦截器
// import Toast from 'vue-toast-mobile';
axios.interceptors.response.use(function (response) {
    Toast.loading({
        mask: true,
        message: '加载中...'
    });
    //如果状态吗正常直接返回data中的数据
    if (response && response.status === 200) {
        let _data = response.data;
        if(_data && _data.code === 0){
            Toast.clear()
            return response.data;
        }else{
            Toast({
                message:_data.msg,
                duration:3000
            });
            return Promise.reject({
                code: _data.code,
                msg: _data.msg
            });
        }
    } 
    else {
        Toast({
            message:response.data.msg||'请求出错！',
            duration:1000
        });
    }
}, function (error) {
    //请求超时
    if (error.code == "ECONNABORTED") {
        Toast({
            message:"请求超时,请稍候再试！",
            duration:1000
        });
        return Promise.reject({
            code: -100,
            msg: "请求超时,请稍候再试！",
        });
      
    } else if (error.code == undefined) {
        Toast({
            message:"请检查网络！",
            duration:2000
        });
        return Promise.reject({
            code: -104,
            msg: "请检查网络！",
        });
    } else {
        Toast({
            message:"未知错误！ERROR_CODE:" + error.code,
            duration:2000
        });
        return Promise.reject({
            code: -101,
            msg: "未知错误！ERROR_CODE:" + error.code,
        });
    }
})
import qs from "qs";
export default {
    postJson: function (baseURL, url, data) {
        return axios({
            method: "post",
            url: url,
            baseURL: baseURL,
            data: data,
            timeout: 10000,
            headers: {
                "X-requested-With": "XMLHttpRequest",
                "Content-Type": "application/json"
            }
        })
    },
    postForm: function (baseURL, url, data) {
        return axios({
            method: "post",
            url: url,
            baseURL: baseURL,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                "X-requested-With": "XMLHttpRequest",
                //使用form表单进行数据交互
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
        })
    },
    getJson: function (baseURL, url, params) {
        return axios({
            method: "GET",
            url: url,
            baseURL: baseURL,
            params: params,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    getForm: function (baseURL, url, params) {
        return axios({
            method: "GET",
            url: url,
            baseURL: baseURL,
            params: params,
            timeout: 10000,
            headers: {
                "X-requested-With": "XMLHttpRequest"
            }
        })
    }
}
