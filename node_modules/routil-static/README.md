# routil-static [![build status][1]][2]

Serve static files

## Example

    var path = require("path")
        , $static = require("routil-static")({
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

## Custom options example (stylus)

    var path = require("path")
        , http = require("http")
        , router = new require("routes").Router()
        , stylus = require("stylus")
        , nib = require("nib")
        , routilStatic = require("routil-static")

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

## Installation

`npm install routil-static`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/routil-static.png
  [2]: http://travis-ci.org/Raynos/routil-static