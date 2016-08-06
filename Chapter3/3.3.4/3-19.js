/**
 * Created by baymax on 16/8/6.
 */
/**
 * 在简单的程序中使用社区附加模块中的流程控制工具
 * */

var flow = require('nimble');
var exec = require('child_process').exec;

//下载指定版本的 node 源码
function downloadNodeVersion(version, destination, callback) {
    var url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
    var filepath = destination + '/' + version + '.tgz';
    exec('curl' + url + ' >' + filepath, callback);
}

//按顺序执行串行化任务
flow.series([
    function (callback) {
        //并行下载
        flow.parallel([
            function (callback) {
                console.log('Downloading Node v0.4.6...');
                downloadNodeVersion('0.4.6', '~/Dev', callback);
            },
            function (callback) {
                console.log('Downloading Node v0.4.7...');
                downloadNodeVersion('0.4.7', '~/Dev', callback);
            }
        ],callback);
    },
    function (callback) {
        console.log('Creating archive of downloaded files...');
        exec(
            'tar cvf node_distros.tar ~/Dev/0.4.6.tgz ~/Dev/0.4.7.tgz',
            function (error, stdout, stderr) {
                console.log('All done');
                callback();
            }
        )
    }
])