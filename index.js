var http = require("http")
    , server = http.createServer()
    , routes = require("routes")
    , ejs = require("ejs")
    , Templar = require("templar")
    , router = new routes.Router()
    , path = require("path")
    , errorPage = require("error-page")
    , $static = require("routil-static")({
        uri: path.join(__dirname, "static")
    })

Templar.loadFolder('./templates')

module.exports = {
    template: template
}

router.addRoute("/static/*?", $static)
router.addRoute("/", require("./routes/home"))
router.addRoute("/issues", require("./routes/issues"))
router.addRoute("/issues/:issueId", require("./routes/issuesItem"))
router.addRoute("/user/signup", require("./routes/user/signup"))
router.addRoute("/user", require("./routes/user/main.js"))

$static.load("static/**/*.*", function (err) {
    throw err
})

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