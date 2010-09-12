# Connect CORS

## Installation

    $ npm install connect-cors

## Examples


     var Connect = require('connect'),
         CORS = require('connect-cors');
     
     var server = Connect.createServer(
         CORS({
    	    '/': {
    	        origins: ['*'],
     	        methods: ['GET'],
    	        headers: ['X-Header-For'],
            },
            '/posts': {
     	        origins: ['*'],
     	        methods: ['GET', 'POST', 'PUT', 'DELETE'],
            },
        }),
        function(req, res) {
             res.writeHead(200, { 'Content-Type': 'text/plain' });
             res.end('Hello World');
        }
     );

     server.listen(3000);


## TODO

 - Implement handler for preflight request.

## License 

(The MIT License)

Copyright (c) 2010 Antono Vasiljev

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
