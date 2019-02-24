// index.js

const msg = m=>o=>{
    return Object.entries(o).reduce(
        (p0, [k0, v0])=>{
            const a = Object.entries(v0).reduce(
                (p1, [k1, v1])=>{
                    if(v1!==false) return p1
                    p1.push(m[k0][k1]())
                    return p1
		}, []
            )
            return p0.concat(a)
        }, []
    )
}

module.exports = msg


if(module.parent) return

// sample
const o = {
    id: { type: true ,min: false ,max: null }
   ,name: { type: false,min: null ,max: null }
   ,birthday: { type: true ,min: true ,max: false }
}

const res = require('./index.js')({
    id: {
        type: ()=>`id:不正な値です.`
       ,min:  ()=>`id:0以上を指定してください.`
       ,max:  ()=>`id:20000以下を指定してください.`
    }
   ,name: {
        type: ()=>`name:不正な値です.`
       ,min:  ()=>`name:1文字以上10文字以下を指定してください.`
       ,max:  ()=>`name:姓と名の間に半角空白を入力してください.`
    }
   ,birthday: {
        type: ()=>`birthday:不正な値です.`
       ,min:  ()=>`birthday:1900/01/01以上を指定してください.`
       ,max:  ()=>`birthday:3000/12/31以下を指定してください.`
    }
})(o)

console.log(res)

