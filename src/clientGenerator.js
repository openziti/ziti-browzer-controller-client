var fs = require('fs');
var CodeGen = require('./codegen.js').CodeGen;

var file = 'lib/client.json';
var json = fs.readFileSync(file, 'UTF-8');
json = json.trim(); 
var swagger = JSON.parse(json);

var clientSourceCode = CodeGen.getJavaScriptCode(
    { 
        className: 'ZitiEdgeClient', 
        swagger: swagger 
    }
);

fs.mkdirSync('dist');

fs.writeFileSync("dist/ziti-browzer-edge-client.js", clientSourceCode);
