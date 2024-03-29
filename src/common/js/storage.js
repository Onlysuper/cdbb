module.exports ={
    getStorage: function (key) {
                return localStorage.getItem(key)||this.getCookie(key);
    },
    saveStorage: function (key, value) {
            localStorage.setItem(key, value);
            this.saveCookie(key, value,365);
    },
    removeStorage: function (key) {
            localStorage.removeItem(key);
            this.removeCookie(key);
    },
    // cookie
    saveCookie(c_name,value,expiredays){
            var exdate=new Date()
            exdate.setDate(exdate.getDate()+expiredays)
            document.cookie=c_name+ "=" +escape(value)+
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    },
    getCookie(c_name){
            if (document.cookie.length>0){
                    let c_start=document.cookie.indexOf(c_name + "=")
                    if (c_start!=-1){ 
                            c_start=c_start + c_name.length+1 
                            let c_end=document.cookie.indexOf(";",c_start)
                            if (c_end==-1) c_end=document.cookie.length
                            return unescape(document.cookie.substring(c_start,c_end))
                    } 
            }
            return ""
    },
    removeCookie(c_name){
      this.saveCookie(c_name, "", -1);  
    }
}