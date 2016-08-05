# NodejsInAction
《node.js 实战》代码(持续学习……持续更新)

#0804
  Chapter3/3.2.2/中的3-11.js，对应书中代码清单3-11的程序，调试时发现24行代码client.on 不能触发，搜了很多后发现，不需要监听 connect 事件，注释掉以后可以正确运行
#0805
  Chapter3/3.3.2中random_story.js 对应代码清单3-17，rss_feeds.txt 为RSS 预定源列表，在豆瓣上找到一个 RSS 源推荐(https://www.douban.com/note/77547342/)
  但是有些不能用了，测试到两个能用，所谓预定源列表就是把 url 贴上去就行，Google 了半天……基础跟不上没治
  如果你下载后有报错，要考虑是不是 txt 中的 URL 不能用了
