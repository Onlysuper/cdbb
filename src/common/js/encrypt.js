const CryptoJS = require('crypto-js');  //引用AES源码js

// const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

//解密方法
function Decrypt(word, key) {
    let decryptResult = CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse(key), {    //  AES解密
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decryptResult.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
}

//加密方法
function Encrypt(word, key) {//word json格式，key字符串
    let content = word;
    var encryptResult = CryptoJS.AES.encrypt(JSON.stringify(content), CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encryptResult.toString();
}

export default {
    Decrypt,
    Encrypt
}
