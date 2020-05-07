### 打包后的文件长啥样：bundle 解密

    //main.js
    import {A} from './a'
    import B from './b'
    import(/*webpackChunkName:"dynamic1"*/ './c').then(data=>console.log(data))
    import(/*webpackChunkName:"dynamic2"*/ './d').then(data=>console.log(data))
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
    //c.js
    export default {
        key:'something'
    }
---
    //d.js
    export default {
        hello:'haha'
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

==注意以下几点：==
- 所有模块最后被打包成一个IIFE,各模块以==文件相对路径名为key==,以==处理后的源码函数为value==组成一个Object传给IIFE
- 最终返回 ==\_\_webpack_require\_\_('./main.js')==

==\_\_webpack_require\_\_是什么？==（主要作用：返回一个模块导出对象，在引用该模块的程序中如main.js能获取到该导出对象的引用，从而执行相应的操作。详情看main.js编译后源码函数）

    // The require function
 	function __webpack_require__(moduleId) {
 		// Check if module is in cache
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}
  
\_\_webpack_require\_\_会==注册对应模块==，并==执行模块编译后源码函数==，最后==返回模块的导出对象==。

==模块编译后源码函数==

    //a.js编译后源码函数
    (function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(){\r\n    console.log('b')\r\n});\n\n//# sourceURL=webpack:///./b.js?");
    })

==\_\_webpack_require\_\_.r()==：标记传入对象为__esModule。（bundle中传入的是module 对应的 module.export,然后将导出值赋值到 module.export对象属性上）

    // define __esModule on exports
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};

==动态导入==

    //dynamic1.bundle.js
    (window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dynamic1"],{
        "./c.js":(function(){}),
        "./d.js":(function(){})
    }])
---
    //bundle.js中调用形式
    __webpack_require__.e(/*! import() | dynamic1 */ \"dynamic1\").then(__webpack_require__.bind(null, /*! ./c */ \"./c.js\")).then(data=>console.log(data))

动态导入的 bundle 被组织成一个有两个元素的数组，第一个元素Array[string] 类型，存放该chunk包中chunk的名称，第二为元素为 Object类型存放该chunk 的所有 modules 映射。__\[[chunkName],{module1,module2}]__。然后被push 到 window["webpackJsonp"]数组中。
window["webpackJsonp"]数组结够类似如下：
    
    [
        [["dynamic1"],{modules}], //dynamic1.bundle.js
        [["dynamic2"],{modules}], //dynamic2.bundle.js
    ]

webpackJsonpCallback([[dynamicChunkName],modulesObject]):


__webpackJsonpCallback([[dynamicChunkName],modulesObject])__：将 __\_\_webpack_require\_\_.e__ 上注册的promise resolve

__\_\_webpack_require\_\_.e = function requireEnsure(chunkId)__：==加载指定id的chunk，？加载完成后执行resolve？,返回一个 __promise__==（什么时候被resolve？）,注册一个加载chunk的promise到installedChunks上。时机：进入主入口bundle.js即注入。




