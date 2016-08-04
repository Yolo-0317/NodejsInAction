/**
 * Created by baymax on 16/8/4.
 */
/**
 * 创建中间函数以减少嵌套的例子
 *
 * */

var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
    getTitles(res);
}).listen(8000, "127.0.0.1");

function getTitles(res) {
    fs.readFile('./title.json',function (err, data) {
        if(err){
            hadError(err, res);
        }else{
            getTemplate(JSON.parse(data.toString()), res);
        }
    })
}

function getTemplate(titles, res) {
    fs.readFile('./template.html',function (err, data) {
        if(err){
            hadError(err, res);
        }else{
            formatHtml(titles, data.toString(), res);
        }
    })
}

function formatHtml(titles, templ, res) {
    console.log(titles.join("<li></li>"));
    var html = templ.replace('%', titles.join('</li><li>'));
    console.log(html);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}

function hadError(err, res) {
    console.log(err);
    res.end('Server error');
}