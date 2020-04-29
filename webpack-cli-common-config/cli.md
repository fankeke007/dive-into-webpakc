### webpack 命令行常用配置

背景知识：

- webpack 命令行配置参数优先级大于配置文件内参数优先级，即对同一个参数若在命令行和配置文件中都有配置，则以命令行配置为准。
- 不使用配置文件，直接在命令行上进行各种配置也能满足build 需求，但是在命令行上各项参数配置首先法重复使用，其次不便于阅读，因而命令行一般结合配置文件使用（--config=webpack.config.js）。
- 命令行结合配置文件，在加上一些常用命令行参数（配合 npm scripts），可以更灵活的定制打包过程（如dev/prod）。


1. 列出所有可用的命令行参数
   
        webpack -h
        webpack --help

2. 使用配置文件

        webpack --config example.config.js
    
3. 指定webpack 输出结果为 **json** （可供打包分析工具使用）

        webpack -j
        webpack --json
        webpack --json > stats.json
    使用管道操作符">"将结果输入到stats.json 文件

4. 指定环境变量(有多种形式)

       webpack --env.production     # sets env.production == true
       webpack --env.platfrom=web   # sets env.platform == "web"
       webpack --env prod           # "prod"
       webpack --env.prod=foo --env min  # [{prod:true},"min"]

    ==--env 当配置文件为一个函数时，会将环境变量传递给这个函数==

5. debug 选项（帮助在编译过程中更好地debug）

        webpack --debug     #默认值为false，因为开启会导致编译速度较慢
        webpack --devtool   #选择一种 source map 格式来增强调试过程
        webpack --progress  #打印编译进度百分比值
        webpack --display-error-details  #打印详细错误

    --devtool 不同的值会明显影响到构建(build)和重新构建(rebuild)的速度,选择不同值map生成形式和位置也不同。==不能同时使用== --devtool 和 SourceMapDevToolPlugin/EvalSourceMapDevToolPlugin，因为 --devtool 在内部调用者两个插件，会导致调用两次影响速度。







