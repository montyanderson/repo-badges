var express = require("express"),
    request = require("request");

var badge = require("./badge.js");

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
            }

            var version = JSON.parse(packagejson).version || "0.0.0";
            badge(res, version);
        } else {
          badge(res, "0.0.0");
        }
    });
});

var port = process.env.PORT || 8080;
app.listen(port);
