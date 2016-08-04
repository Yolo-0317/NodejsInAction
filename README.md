# NodejsInAction
《node.js 实战》代码(持续学习……持续更新)

#0804
  Chapter3/3.2.2/中的3-11.js，对应书中代码清单3-11的程序，调试时发现24行代码client.on 不能触发，搜了很多后发现，不需要监听 connect 事件，注释掉以后可以正确运行
