/**
 * Created by baymax on 16/8/5.
 */
/**
 * 用匿名函数保留全局变量的值
 * */

function asyncFunction(callback){
    setTimeout(callback, 200);
}

var color = "blue";

(function (color) {
    asyncFunction(function () {
        //下面的 console 在200毫秒之后执行
        console.log("The color is " + color);
    });
})(color);

color = "green";