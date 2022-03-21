
import {ZitiBrowzerEdgeClient} from "../dist/index.js";


describe("ZitiBrowzerEdgeClient", function () {
  this.timeout(5000);

  it("instantiate", async function () {
    var _zitiBrowzerEdgeClient = new ZitiBrowzerEdgeClient();
    expect(_zitiBrowzerEdgeClient).to.not.equal(undefined);
    expect(_zitiBrowzerEdgeClient.domain).to.equal('https://demo.ziti.dev/edge/client/v1');
  });

});

