import http from "./http";
// const baseUrl = "http://power.xmfstore.com/power"//生产环境
const baseUrl = process.env.VUE_APP_BASEURL// 测试环境
const SignKey = "zFzFcomTransKey1" // 加密key
// 首页信息
const getAbout = ()=>{return (data)=>{return http.getJson(baseUrl,'/trade/getDefaultValue',data)}}
// 退还记录查询
const getTrades = ()=>{return (data)=>{return http.postForm(baseUrl,'/trade/list',data)}}
// 成为会员
const beVip =()=>{return (data)=>{return http.postForm(baseUrl,'/trade/addMember',data)}}

// 发送短信验证码
const getCheckCode= ()=>{return (data)=>{return http.postForm(baseUrl,'/sms/send',data)}}

// 判断搜索的内容是手机号还是银行卡号 还是已经存在的手机号
const getWhichNumber= ()=>{return (data)=>{return http.postForm(baseUrl,'/trade/checkCard',data)}}

// 添加手机号
const addPhone =()=>{return (data)=>{return http.postForm(baseUrl,'/trade/addPhone',data)}}

// 添加银行卡
const addCard =()=>{return (data)=>{return http.postForm(baseUrl,'/trade/addBank',data)}}

// 查看详情
const getDetail =()=>{return (data)=>{return http.getJson(baseUrl,'/trade/getBuyDetail',data)}}

export {
    getTrades,
    beVip,
    addPhone,
    addCard,
    getCheckCode,
    getWhichNumber,
    getDetail,
    getAbout,
    SignKey
}