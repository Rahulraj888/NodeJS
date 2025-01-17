const fs = require("fs");

function logReqRes(fileName) {
    return (req, res, next) => {
        console.log(req.headers);
        let msg = `${Date.now()}: ${req.path} ${req.method}`;
        fs.appendFile(fileName, msg, (err, data) => {
          console.log("Middleware 2");
          next();
        });
    };
}

module.exports = logReqRes;

