/**
 * Created by baymax on 16/8/5.
 */
/**
 * 在一个简单的程序中实现并行化流程控制
 * */

var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './text';

function checkIfComplete() {
    console.log("-----checkIfComplete-----");
    completedTasks++;
    if(completedTasks == tasks.length){
        for (var index in wordCounts){
            //当所有任务完成后,列出文件中用到的单词以及用过的次数
            console.log(index +': '+ wordCounts[index]);
        }
    }
}

function countWordsInText(text) {
    var words  = text.toString().toLowerCase().split(/\W+/).sort();
    console.log(words);
    for(var index in words){
        //对文本中出现的单词计数
        var word = words[index];
        if(word){
            wordCounts[word] = (wordCounts[word] ? wordCounts[word] + 1 : 1);
        }
    }
}

fs.readdir(filesDir, function (err, files) {
    //得到 text 目录中的文件列表
    if(err) throw err;
    for(var index in files){
        //定义处理每个文件的任务,每个任务中会调用一个异步读取文件的函数并对文件中使用的单词计数
        var task = (function (file) {
            return function () {
                fs.readFile(file, function (err, text) {
                    if(err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                })
            }
        })(filesDir + '/' + files[index]);
        //把所有任务添加到函数调用数组中
        tasks.push(task);
        // console.log("for");
    }
    for(var task in tasks){
        //开始并执行所有任务
        // console.log("---------forEnd----------");
        tasks[task]();
    }
})