import http from "./http";
const baseUrl = "http://power.xmfstore.com/power"
// 退还记录查询
const getTrades = ()=>{return (data)=>{return http.getJson(baseUrl,'/trade/list',data)}}
// 成为会员
const beVip =()=>{return (data)=>{return http.getJson(baseUrl,'/trade/addMember',data)}}

// 添加手机号
const addPhone =()=>{return (data)=>{return http.getJson(baseUrl,'/trade/addPhone',data)}}

// 添加银行卡
const addCard =()=>{return (data)=>{return http.postJson(baseUrl,'/trade/addBank',data)}}

// 发送短信验证码
const getCheckCode= ()=>{return (data)=>{return http.postJson(baseUrl,'/sms/send',data)}}
export {
    getTrades,
    beVip,
    addPhone,
    addCard,
    getCheckCode
}