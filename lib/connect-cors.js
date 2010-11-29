
/*!
 * Ext JS Connect
 * Copyright(c) 2010 Antono Vasiljev
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var url = require('url');


/**
 * Setups access for CORS requests.
 * http://www.w3.org/TR/cors/
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */

/*
 * The resource sharing policy described by w3c specification is bound to a particular resource.
 * Each resource is bound to the following:
 *
 * - A list of origins consisting of zero or more origins that are allowed access to the resource.
 * - A list of methods consisting of zero or more methods that are supported by the resource.
 * - A list of headers consisting of zero or more header field names that are supported by the resource.
 * - A supports credentials flag that indicates whether the resource supports user credentials
 *   in the request. It is true when the resource does and false otherwise.
 */

// corsOptions = {
//     '/resource': {
//         origins: ['http://w3.org', ...],
//         methods: ['GET', 'POST', 'PUT', ...],
//         headers: ['X-Header-For', ...],
//         credentails: true,
//     },
//     '/resource2': { ... },
// }
module.exports = function corsSetup(options) {

    var corsConfig = options || [];

    return function corsHandle(req, res, next) {

        if (!req.headers.origin) return next(); // spec: 5.1.1
        if (req.method === 'OPTIONS') return next(); // TODO process preflight requests

        var origin = req.headers.origin,
            resource = url.parse(req.url).pathname,
            resourceConfig = corsConfig[resource];

        if (resourceConfig) {

            // wrap writeHead
            var writeHead = res.writeHead;
            res.writeHead = function(status, headers) {
                headers = headers || {};

                // 5.1.3
                if (resourceConfig.origins && resourceConfig.origins.indexOf(origin) != -1) {
                    headers['Access-Control-Allow-Origin'] = origin;
                }

                // 5.1.3
                if (resourceConfig.credentails) {
                    headers['Access-Control-Allow-Credentials'] = true.toString();
                }

                // 5.1.4
                if (resourceConfig.headers) {
                    headers['Access-Control-Expose-Headers'] = resourceConfig.headers.join(', ');
                }

                res.writeHead = writeHead;
                return res.writeHead(status, headers);
            }
            next();
        } else {
            next();
        }
    };
};
