## 不使用配置文件
### 多个入口多个出口，一一对应（一个入口对应一个入口）
a.js 引用了 b.js，c.js是一个独立的模块

    cd multi-entries-multi-output
    npx webpack index1=./a.js index2=./c.js -o ./dist/[name].js
- a=a.js 即使用 **[name]=[request]** 形式，name 被用作对应chunk的name
  

**执行结果**：==dist下生成index1.js,index2.js==

若不使用**[name]=[request]**给chunk命名：

    npx webpack ./a.js ./c.js -o ./dist/[name].js

**执行结果**：==dist/mian.js，也只生成一个js,默认使用main 作为名称。可以不用[name]变量，直接指定生成文件名==

### 多个入口，多个出口，混合模式（不一一对应）
将a.js,c.js打包，d.js 单独打包

    npx webpack ./a.js ./c.js fromD=./d.js -o ./dist1/[name].js

**执行结果**：==生成 dist1/mian.js，fromD.js ，即a.js,b.js,c.js被打包成main.js（默认名称）,d.js 被打包成 fromD.js==

### ==【尝试】== 多个入口，多个出口，混合模式（不一一对应，但指定每个bundle名（不在使用默认main名））

    npx webpack fromAC=./a.js ./c.js fromD=./d.js -o ./dist2/[name].js
**执行结果**：预期生成 fromAC.js 和 fromD.js，而实际上生成 fromAC.js,main.js,fromD.js

==继续改进，以达到预期==：

    npx webpack fromAC=./a.js fromAC=./c.js fromD=./d.js -o ./dist3/[name].js

**执行结果**:达到预期，只生成 fromAC.js 和 fromD.js

基于以上信息，甚至可以做到一个入口多个出口（将一个文件打包为不同的名称）==（暂时想不到可以适用的场合）==

    npx webpack fromA01=./a.js fromA02=./a.js fromA03=./a.js -o ./dist4/[name].js

### 查看打包详情
    npx webpack index1=./a.js index2=./c.js -o ./dist/[name].js --profile --json > stats.json

- --profile
- --json
- "\>" win shell 管道符，利用系统管道输出统计信息到 stats.json 文件