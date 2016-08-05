/**
 * Created by baymax on 16/8/5.
 */
/**
 * 作用域如何导致 bug 出现
 * */

function asyncFunction(callback){
    setTimeout(callback, 200);
}

var color = "blue";

asyncFunction(function () {
    //下面的 console 在200毫秒之后执行
    console.log("The color is " + color);
});

color = "green";