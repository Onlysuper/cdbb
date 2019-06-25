

export default {
    accMul: (arg1, arg2)=> {
            arg1 = arg1 || 0;
            var m = 0,
                    s1 = arg1.toString(),
                    s2 = arg2.toString();
            try {
                    m += s1.split(".")[1].length
            } catch (e) { }
            try {
                    m += s2.split(".")[1].length
            } catch (e) { }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },
    toFixed: function (s) {
            let a = this.accMul(s, 100);
            var _a = s * 100;
            let b = Math.round(a);
            var _b = Math.round(_a);

            let c = this.accMul(b, 0.01);

            return c.toFixed(2)
    }
}



