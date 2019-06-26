const CryptoJS = require('crypto-js');  //引用AES源码js
import { SignKey } from "@src/apis";
export default {
    //解密方法
    Decrypt(word, key) {
        let decryptResult = CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse(key), {    //  AES解密
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        var decryptedStr = decryptResult.toString(CryptoJS.enc.Utf8);
        return decryptedStr;
    },
    //加密方法
    Encrypt(word, key) {//word json格式，key字符串
        let content = word;
        // content=JSON.stringify(content) // 如果word是json格式需要用这个
        var encryptResult = CryptoJS.AES.encrypt(content, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        // return encryptResult.toString();
        return encryptResult.toString();
    },
    //     加密对象处理
    EncryptObj(obj = {}, arr){
        let newobj = {
            sign:[]
        };
        if (obj) {
            for(var i in obj){
                if(arr.includes(i)){
                    let replaceSpace = this.Encrypt(obj[i],SignKey);
                    newobj[i]=replaceSpace;
                    newobj['sign'].push(replaceSpace);
                }else{
                    newobj[i]=obj[i]+'';
                    if(i=='hasPhone'){
                        newobj['sign'].push(obj[i]+'');
                    }
                }
            }
        }
        newobj['sign']=this.Encrypt(newobj['sign'].join("#"),SignKey);
        return newobj;
    }
}
