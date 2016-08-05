/**
 * Created by baymax on 16/8/5.
 */
var fs = require('fs'),
    watchDir = "./watch",
    processedDir = "./done";
var events = require('events');
var util = require('util');

function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

Watcher.prototype = new events.EventEmitter();

//扩展EventEmitter添加处理文件的方法
Watcher.prototype.watch = function () {
    console.log('watch');
    var watcher = this;     //保存对 Watcher对象的引用,以便在回调函数 readdir 使用
    fs.readdir(this.watchDir, function (err, files) {
      if(err) throw err;
        for(var index in files){
            //处理 watch 目录中的所有文件
            watcher.emit('process', files[index]);
        }
    })
};

//扩展EventEmitter,添加开始监控方法
Watcher.prototype.start = function () {
    var watcher = this;
    fs.watchFile(watchDir, function () {
        console.log("watchFile");
        watcher.watch();
    })
};

var watcher = new Watcher(watchDir, processedDir);
watcher.on('process', function process(file) {
    console.log('process');
    var watchFile = this.watchDir + '/' + file;
    var processedFile = this.processedDir + '/' + file.toLowerCase();

    fs.rename(watchFile, processedFile, function (err) {
        if(err) throw err;
    })
});

watcher.start();