# webpack5
  - React / Vue脚手架配置
  - 基于webpack5打包原理
  - 基于web
  ## loader
    - 本质是一个函数，处理文件
    - resolveLoader配置loader的解析规则
    - loader从右向左执行
    - loader函数中的pitch从左向右执行，而且先执行pitch函数，再执行loader
      - pitch1 > pitch2 > pitch3 > loader3 > loader2 > loader1
  #### loader的职责
    - 职责单一：一个loader只做一件事
    - 链式调用：第一个loader接收到的是源文件的内容，后续loader都是接收上一个loader返回的处理结果，webpack会按顺序链式调用每个loader
    - 统一原则：遵循Webpack指定的设计规则和结构，输入与输出均为字符串，各个Loader完全独立，即插即用
    - 模块化：保证loader是模块化的。loader生成模块需要遵循和普通模块一样的设计原则
    - 无状态：在多次模块的转化之间，我们不应该在loader中保留状态。每个loader运行时应确保与其他编译好的模块保持独立，同样也应该与前几个loader对相同模块的编译结果保持独立
  
  ## plugin
    - 本质是一个类