var fs = require("fs");

function badge(res, version) {
  fs.readFile(__dirname + "/badge.svg", function(fileErr, badge) {
      if(!err) {
          res.setHeader("Content-Type", "image/svg+xml");
          res.end(badge.toString().replace(/:version/g, version));
      }
  });
}

module.exports = badge;
