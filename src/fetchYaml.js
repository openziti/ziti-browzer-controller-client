var request = require("request");
var fs = require('fs');

const CLIENT_SPEC = 'https://raw.githubusercontent.com/openziti/edge/main/specs/client.yml';

request(CLIENT_SPEC, function(err, res, body) {
    fs.mkdirSync('lib');
    fs.writeFileSync("lib/client.yml", body);
});
  