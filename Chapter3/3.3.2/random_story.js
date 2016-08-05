/**
 * Created by baymax on 16/8/5.
 */
var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');

var configFileName = './rss_feeds.txt';

function checkFoeRSSFile() {
    //任务1: 确保包含RSS 预定源URL列表的文件存在
    fs.exists(configFileName, function (exists) {
        if(!exists){
            //只要有错误尽早返回
            return next(new Error('Missing RSS File: ' + configFileName));
        }
        next(null, configFileName);
    })
};

function readRSSFile(configFileName) {
    //任务2: 读取并解析包含预定源URL的文件
    fs.readFile(configFileName, function (err, feedList) {
        if(err) return next(err);
        //将预定源URL 列表转换成字符串,然后分隔成一个数组
        feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n');
        console.log(feedList);
        //从预定源URL 数组中随机选择一个
        var random = Math.floor(Math.random() * feedList.length);
        console.log(random);
        next(null, feedList[random])
    })
};

function downloadRSSFeed(feedUrl) {
    //任务3: 向选定的预定源发送HTTP 请求以获取数据
    request({uri: feedUrl}, function (err, res, body) {
        // console.log("body: "+ body);
        if(err) return next(err);
        if(res.statusCode != 200){
            return next(new Error('Abnormal response status code'))
        };
        next(null, body);
    })
}

function parserRSSFeed(rss) {
    //任务4: 将预定源数据解析到一个条目数组中
    var handler = new htmlparser.RssHandler();
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if(!handler.dom.items.length){
        return next(new Error('No RSS items found'));
    };

    //如果有数据, 显示第一个预定源条目的标题和URL
    var item = handler.dom.items.shift();
    console.log("title: "+item.title);
    console.log("link: "+item.link);
};

//把要做的任务按顺序添加到一个数组中
var tasks = [checkFoeRSSFile, readRSSFile, downloadRSSFeed, parserRSSFeed];

//负责执行任务的next 函数
function next(err, result) {
    if(err) throw err;      //如果任务出错抛出异常
    //从任务数组中取出下一个任务
    var currentTask = tasks.shift();
    if(currentTask){
        currentTask(result);    //执行当前任务
    }
};

next();