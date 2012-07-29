var path = require("path")
    , $static = require("../..")({
        uri: path.join(__dirname, "static")
    })
    , http = require("http")
    , router = new require("routes").Router()

router.addRoute("/static/*?", $static)

$static.load("static/**/*.*", function (err) {
    console.log("oh shit load error")
})

http.createServer(function (req, res) {
    var route = router.match(req.url)
    if (route) {
        route.fn(req, res, route.params, route.splats)
    }
}).listen(8080)