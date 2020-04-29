## 不使用配置文件
### 一个入口一个出口
a.js 引用了 b.js

    cd one-entry-one-output
    npx webpack a.js -o dist/index.js

执行结果：生成 dist/index.js

    node dist/index.js

执行结果：hello webpack！

### 查看打包详情
    npx webpack a.js -o dist/index.js --profile --json > stats.json

- --profile
- --json
- "\>" win shell 管道符，利用系统管道输出统计信息到 stats.json 文件