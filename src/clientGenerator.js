/*
Copyright Netfoundry, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var fs = require('fs');
var path = require('path');
var CodeGen = require('./codegen.js').CodeGen;

var file = 'spec/client.json';
var json = fs.readFileSync(file, 'UTF-8');
json = json.trim(); 
var swagger = JSON.parse(json);

const mkdirsSync = function(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
}
   
mkdirsSync('dist');

// For now, we skip direct auso-generation of JS.  Instead, we will 
// auto-generate typescript and then transpile that into JS.
// This approach allows TS-based environments to consume this
// module.
//
//
// var clientSourceCode = CodeGen.getJavaScriptCode(
//     { 
//         className: 'ZitiEdgeClient', 
//         swagger: swagger 
//     }
// );
// fs.writeFileSync("dist/ziti-browzer-edge-client.js", clientSourceCode);

var clientSourceCode = CodeGen.getTypescriptCode(
    { 
        className: 'ZitiEdgeClient', 
        swagger: swagger 
    }
);

fs.writeFileSync("dist/ziti-browzer-edge-client.ts", clientSourceCode);
