### 打包后的文件长啥样：bundle 解密

    //main.js
    import {A} from './a'
    import B from './b'
    console.log(A)
    B() 
---
    //a.js
    export const A = 'a'
---
    //b.js
    export default function(){
        console.log('b')
    }
---
    cd bundle-decryption
    npx webpack ./main.js -o ./dist/bundle.js --mode=development

### ./dist/bundle.js
    
    //bundle.js
    (function(modules){
        //__webpack_require__ 等辅助函数
        return __webpack_require__(__webpack_require__.s="./main.js");
    })(
        {
          "./a.js":(function(){...}),
          "./b.js":(function(){...}),
          "./main.js":(function(){...}),
        }
    )

==注意一下几点：==
- 所有模块最后被打包成一个IIFE,各模块以==文件相对路径名为key==,以==处理后的源码函数为value==组成一个Object传给IIFE
- 

