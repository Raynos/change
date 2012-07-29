var path = require("path")
    , http = require("http")
    , router = new require("routes").Router()
    , stylus = require("stylus")
    , nib = require("nib")
    , routilStatic = require("../..")

var staticRoute = routilStatic({
    uri: path.join(__dirname, "static")
})

staticRoute.load("static/**/*.*", logError)

router.addRoute("/static/*?", staticRoute)

var stylusRoute = routilStatic({
    uri: path.join(__dirname, "stylus")
    , mapUri: function (uri) {
        return uri.replace(/\.css/, '.styl')
    }
    , render: function (raw, callback) {
        var s = stylus(raw.toString())
        s.use(nib())
        s.render(function (err, css)  {
            if (err) {
                return callback(err)
            }

            callback(null, new Buffer(css))
        })
    }
    , defaultType: "text/css"
})

stylusRoute.load("stylus/**/*.styl", logError)

router.addRoute("/stylus/*?", stylusRoute)

http.createServer(function (req, res) {
    var route = router.match(req.url)
    if (route) {
        route.fn(req, res, route.params, route.splats)
    }
}).listen(8080)

function logError(err) {
    console.log("oh shit load error", err.toString())
}