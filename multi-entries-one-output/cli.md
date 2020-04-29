## 不使用配置文件
### 多个入口一个出口
a.js 引用了 b.js，c.js是一个独立的模块

    cd multi-entries-one-output
    npx webpack a=./a.js c=./c.js -o dist/index.js
- a=a.js 即使用 **[name]=[request]** 形式，name 被用作对应chunk的name
- **【error】**:使用[name]=[request] 形式想多入口一出口时，会报错：
  
> Conflict: Multiple chunks emit assets to the same filename index.js 

**执行结果**：==Conflict: Multiple chunks emit assets to the same filename index.js== 

==因而不能使用[name]=[request]这种形式进行多入口一出口的打包，只能使用无 **name** 形式==

    npx webpack ./a.js ./c.js -o dist/index.js

执行结果：生成dist/index.js 文件

    node dist/index.js

执行结果：
>hello webpack！
>hello world!

---

从 =="多个入口，多个出口混合模式"== 受到的启发：

    npx webpack fromAC=./a.js fromAC=./c.js -o ./dist1/

执行结果：生成 dist1,不符合预期dist1/fromAC.js
要达到预期如下操作即可：

    npx webpack fromAC=./a.js fromAC=./c.js -o ./dist1/[name].js

---


### 查看打包详情
    npx webpack ./a.js ./c.js -o ./dist/index.js --profile --json > stats.json

- --profile
- --json
- "\>" win shell 管道符，利用系统管道输出统计信息到 stats.json 文件