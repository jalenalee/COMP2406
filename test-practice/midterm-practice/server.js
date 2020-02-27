let fs = require('fs')
let path = require('path');
let items = { "items": [{ name: "study" }] };
//Helper function for sending 404 message
function send404(response) {
    response.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    response.end('Error 404: Resource not found.');
}
let server = http.createServer(function(req, res) {
    if (req.method == 'GET') {
        if (req.url == "/todo.html" || req.url == '/') {
            res.writeHead(200, {
                'content-type': "text/html"
            });
            fs.createReadStream("./todo.html").pipe(res);
        } else if (req.url == '/todo.js') {
            res.writeHead(200, {
                'content-type': "application/javascript"
            });
            fs.createReadStream("./todo.js").pipe(res);
        } else if (req.url == '/list') {
            res.writeHead(200, {
                'content-type': "application/json"
            });
            res.end(JSON.stringify(items));
        } else {
            send404(res);
            return;
        }
    } else if (req.url == "/items" && req.method == "POST") {
        res.writeHead(200, {
            'content-type': "text/html"
        });
        fs.createReadStream("./todo.html").pipe(res);
    } else if (req.method == "POST" && req.url == '/list') {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            newItem = JSON.parse(body);
            items.items.push(newItem);
            res.writeHead(200, {
                'content-type': "application/json"
            });
            res.end();
        });
    } else {
        send404(res);
    }
});
server.listen(5500);;