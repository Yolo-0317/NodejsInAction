/**
 * Created by baymax on 16/8/5.
 */
/**
 * 用社区贡献的工具实现串行化控制
 * */

var flow = require('nimble');

var count=0;
var c = setInterval(() => {count++}, 100);

flow.series([
    function (callback) {
        setTimeout(function () {
            console.log('I execute first.');
            callback();
        }, 1000);
    },
    function (callback) {
        setTimeout(function(){
            console.log('I execute next.');
            callback()
        }, 500);
    },

    function(callback){
        setTimeout(function(){
            console.log('I execute last.');
            callback();
            console.log(count);
        }, 100);
    }
]);