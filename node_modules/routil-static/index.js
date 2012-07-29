var glob = require("glob")
    , extend = require("xtend")
    , mimetypes = require("filed/mimetypes.js")
    , path = require("path")
    , crypto = require("crypto")
    , zlib = require("zlib")
    , fs = require("fs")
    , Routil = require("routil")
    , encoding = Routil.encoding
    , routilErrorPage = Routil.errorPage
    , cache = {}

module.exports = Static

function Static(options) {
    var config = extend({
            uri: path.join(process.cwd(), 'static'),
            errorPage: routilErrorPage,
            render: asyncIdentity,
            mapUri: identity,
            defaultType: null
        }, options || {})
        , errorPage = config.errorPage

    $static.load = load

    return $static

    function render(fileName, raw, callback)  {
        var cached = cache[fileName]
        if (cached) {
            return callback(null, cached)
        }
        var etag = getETag(raw)
        config.render(raw, gzipRendered)

        function gzipRendered(err, rendered) {
            if (err) {
                return callback(err)
            }

            zlib.gzip(rendered, cacheRendered)

            function cacheRendered(err, zipped) {
                if (err) {
                    return callback(err)
                }

                var ext = path.extname(fileName).substr(1)
                    , type = mimetypes.lookup(ext, config.defaultType)

                var cached = cache[fileName] = [etag, rendered, zipped, type]
                callback(null, cached)
            }
        }
    }

    function load(uri, callback) {
        glob.sync(uri).forEach(readFile)

        function readFile(fileName) {
            fs.readFile(fileName, renderRaw)

            function renderRaw(err, raw) {
                if (err) {
                    return callback(err)
                }

                render(fileName, raw, passback)
            }
        }

        function passback(err) {
            if (err) {
                callback(err)
            }
        }
    }

    function $static(req, res, params, splats) {
        var fileRequested = path.join("/", splats.join("/"))
            , uri =  config.mapUri(path.join(config.uri, fileRequested))
            , cached = cache[uri]

        if (cached) {
            return send(req, res, cached)
        }

        fs.readFile(uri, handleRaw)

        function handleRaw(err, raw) {
            if (err) {
                console.log("could not find", err, uri)
                return errorPage(req, res, 404)
            }

            render(uri, raw, sendCachedData)
        }

        function sendCachedData(err, cached) {
            if (err) {
                return errorPage(req, res, [err, 500])
            }

            send(req, res, cached)
        }
    }
}

function asyncIdentity(raw, callback) {
    callback(null, raw)
}

function identity(raw) {
    return raw
}

function send(req, res, cache) {
    var etag = cache[0],
        raw = cache[1],
        zipped = cache[2],
        type = cache[3]

    if (req.headers["If-None-Match"] === etag) {
        res.statusCode = 304
        return res.end()
    }

    res.setHeader('Content-Type', type)
    res.setHeader('ETag', etag)
    encoding(req, {
        gzip: function () {
            res.setHeader("Content-Encoding", "gzip")
            res.end(zipped)
        },
        default: function () {
            res.end(raw)
        }
    })()
}

function getETag(str) {
    var h = crypto.createHash("sha1")
    h.update(str)
    return '"' + h.digest('base64') + '"'
}