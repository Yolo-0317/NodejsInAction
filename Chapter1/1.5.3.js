var fs = require('fs');
var http = require('http');
var stream = fs.createReadStream('./resource.json');
stream.on('data',function(chunk){
	console.log(JSON.parse(chunk));
});
stream.on('end',function(){
	console.log('finished');
})
