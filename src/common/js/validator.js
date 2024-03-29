
export default {

        // 手机号
        phoneNumber: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, // 内地
        mobilePatternHK:/^(\+852\s)?[5689]{1}\d{7}$/, // 香港
        mobilePatternTW:/^(\+886\s)?[0]{1}[9]{1}\d{8}$/,// 台湾
        email: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,

        // 身份证
        idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,

        // 银行卡号
        bankCard: /^\d{5,}$/,
        // 6位数验证码
        verificationCode: {
                reg: /^\d{6}$/
        },

        // 企业税号
        taxCode: {
                reg: /^[a-zA-Z0-9]{15,20}$/
        },

        // 姓名
        name: {
                reg: /^[\u4E00-\u9FA5A-Za-z]{2,}$/
        },
}
