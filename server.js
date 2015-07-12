var fs = require("fs"),
    express = require("express"),
    request = require("request");

var app = express();

app.get("/:user/:repo", function(req, res) {
    var options = {
        url: "https://api.github.com/repos/:owner/:repo/contents/package.json"
                .replace(":owner", req.params.user)
                .replace(":repo", req.params.repo),
        headers: {
            "User-Agent": "montyanderson"
        }
    };

    request(options, function(err, response, body) {
        if(!err) {
            var data = JSON.parse(body);

            if(data.content) {
                var packagejson = new Buffer(data.content, "base64").toString("utf8");
                var version = JSON.parse(packagejson).version;

                fs.readFile(__dirname + "/badge.svg", function(fileErr, badge) {
                    if(!err) {
                        res.setHeader("Content-Type", "image/svg+xml");
                        res.end(badge.toString().replace(/:version/g, version));
                    }
                });
            }
        }
    });
});

var port = process.env.PORT || 8080;
app.listen(port);
