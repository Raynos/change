var http = require("http")
    , server = http.createServer()
    , routes = require("routes")
    , ejs = require("ejs")
    , Templar = require("templar")
    , router = new routes.Router()
    , path = require("path")
    , $static = require("routil-static")({
        uri: path.join(__dirname, "static")
    })

Templar.loadFolder('./templates')

module.exports = {
    template: template
}

router.addRoute("/static/*?", $static)
router.addRoute("/", require("./routes/home"))

$static.load("static/**/*.*", function (err) {
    throw err
})

server.on("request", function (req, res) {
    var route = router.match(req.url)
    if (!route) {
        return res.end("route not found")
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
    })(name, data)
}