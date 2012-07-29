var http = require("http")
    , server = http.createServer()
    , routes = require("routes")
    , ejs = require("ejs")
    , Templar = require("templar")
    , router = new routes.Router()
    , path = require("path")
    , errorPage = require("error-page")
    , send = require("send")
    , url = require("url")

Templar.loadFolder('./templates')

module.exports = {
    template: template
}

router.addRoute("/public/*?", function (req, res) {
    function error(err) {
        res.statusCode = err.status || 500;
        res.end(err.message);
    }

    // your custom directory handling logic:
    function redirect() {
        res.statusCode = 301;
        res.setHeader('Location', req.url + '/');
        res.end('Redirecting to ' + req.url + '/');
    }

    // transfer arbitrary files from within
    // /www/example.com/public/*
    send(req, url.parse(req.url).pathname)
        .root(__dirname)
        .on('error', error)
        .on('directory', redirect)
        .pipe(res);
})
router.addRoute("/", require("./routes/home"))
router.addRoute("/issues", require("./routes/issues"))
router.addRoute("/issues/:issueId", require("./routes/issuesItem"))
router.addRoute("/user/signup", require("./routes/user/signup"))
router.addRoute("/user", require("./routes/user/main.js"))

server.on("request", function (req, res) {
    var route = router.match(req.url)
    if (!route) {
        return errorPage(req, res, {})(404)
    }

    route.fn(req, res, route.params, route.splats)
})

server.listen(8080, function () {
    console.log("listening on port 8080")
})

function template(req, res, name, data) {
    Templar(req, res, {
        engine: ejs
        , folder: './templates'
    })(name, data || {})
}