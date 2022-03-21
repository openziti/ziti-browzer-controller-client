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

import fs from 'fs';
import path from 'path';
import {getJavaScriptCode} from './codegen.js';

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

// Auto-generation the JS.  A subsequent build step will run the  
// TS compiler and it will generate the associated d.ts file to
// facilitate consumption of this module from TypeScript.
//
var clientSourceCode = getJavaScriptCode(
    { 
        className: 'ZitiBrowzerEdgeClient', 
        swagger: swagger 
    }
);
fs.writeFileSync("dist/index.js", clientSourceCode);

