var fs = require("fs");
fs.readFile('./resource.json',function(er, data){
	console.log(JSON.parse(data));
})
