/**
 * Created by baymax on 16/8/4.
 */
/**
 * Created by baymax on 16/8/4.
 */
/**
 * 通过尽早返回减少嵌套
 *
 * */

var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
    getTitles(res);
}).listen(8000, "127.0.0.1");

function getTitles(res) {
    fs.readFile('./title.json',function (err, data) {
        if(err) return hadError(err, res);  //如果出错后面不再执行, 直接返回
        getTemplate(JSON.parse(data.toString()), res);
    })
}

function getTemplate(titles, res) {
    fs.readFile('./template.html',function (err, data) {
        if(err) return hadError(err, res);
        formatHtml(titles, data.toString(), res);
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