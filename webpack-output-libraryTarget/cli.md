### 将文件作为单独的 library 发布

    cd webpack-output-libraryTarget
    #window (success) [导出在window.Mylib上] 
    npx webpack ./functions.js -o ./package/index.js --output-library-target=window --mode=development --output-library=Mylib 

    #[导出在window上] 
    npx webpack ./functions.js -o ./package/index.js --output-library-target=window --mode=development 

    #var (success) [导出在window.Mylib]
    npx webpack ./functions.js -o ./package/index.js --output-library-target=var --mode=development  --output-library=Mylib
    #var (fail) 丢失了调用 hello1 的引用
    npx webpack ./functions.js -o ./package/index.js --output-library-target=var --mode=development 
    
    #assign [window.Mylib] 若没指定libray 则丢失
    npx webpack ./functions.js -o ./package/index.js --output-library-target=assign --mode=development --output-library=Mylib

    
    #this (success) [导出在window.Mylib上] 若没library 则导出在global 对象上
    npx webpack ./functions.js -o ./package/index.js --output-library-target=this --mode=development--output-library=Mylib
    # this [this上]
    npx webpack ./functions.js -o ./package/index.js --output-library-target=this --mode=development 

    #umd (success)
    npx webpack ./functions.js -o ./package/index.js --output-library=Mylib  --output-library-target=umd --mode=development


    npx webpack ./example.js -o ./js/index.js