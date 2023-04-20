"use strict";

var apicache = require('apicache');

var cache = apicache.options({
  headers: {
    'cache-control': 'no-cache'
  },
  statusCodes: {
    exclude: [],
    // list status codes to specifically exclude (e.g. [404, 403] cache all responses unless they had a 404 or 403 status)
    include: [200] // list status codes to require (e.g. [200] caches ONLY responses with a success/200 code)

  },
  debug: true,
  respectCacheControl: false,
  appendKey: function appendKey(req, res) {
    return req.url;
  }
}).middleware;
var cacheSuccess = cache('1 minutes');
module.exports = {
  cacheSuccess: cacheSuccess,
  cache: cache
};
//# sourceMappingURL=cacheResponse.js.map