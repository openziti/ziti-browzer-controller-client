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

import request from 'request';
import fs from 'fs';

/**
 *  This is the source of the Swagger Spec we use to auto-generate the edge client
 */
const CLIENT_SPEC = 'https://raw.githubusercontent.com/openziti/edge/main/specs/client.yml';


request(CLIENT_SPEC, function(err, res, body) {
    fs.mkdirSync('spec');
    fs.writeFileSync("spec/client.yml", body);
});
  