var path = require("path"),
    cache = {},
    crypto = require("crypto"),
    glob = require("glob"),
    zlib = require("zlib"),
    mimetypes = require("filed/mimetypes.js"),
    Routil = require("../index"),
    encoding = Routil.encoding,
    fs = require("fs"),
    extend = require("xtend")

module.exports = Static()

function Static(options) {
    var config = extend({
        uri: path.join(process.cwd(), 'static'),
        Routil: Routil,
        render: asyncIdentity,
        mapUri: identity,
        defaultType: null
    }, options || {}) 

    extend(static, {
        load: load,
        configure: configure,
        Static: Static
    })

    return static


    function configure(object) {
        extend(config, object)
    }

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

                var ext = path.extname(s).substr(1),
                    type = mimetypes.lookup(ext, config.defaultType)

                var cached = cache[fileName] = [etag, rendered, zipped, type]
                callback(null, cached)
            }
        }
    }

    function load(uri) {
        glob.sync(uri).forEach(readFile)

        function readFile(fileName) {
            fs.readFile(fileName, renderRaw)

            function renderRaw(err, raw) {
                if (err) {
                    throw err
                }
                render(fileName, raw, thrower)
            }
        }

        function thrower(err) {
            if (err) {
                throw err
            }
        }
    }

    function static(req, res) {
        var fileRequested = path.join("/", req.url),
            uri =  config.mapUri(path.join(config.uri, fileRequested)),
            cached = cache[uri]

        if (cached) {
            return send(req, res, cached)
        }

        fs.readFile(uri, handleRaw)

        function handleRaw(err, raw) {
            if (err) {
                return Routil.errorPage(req, res, 404)
            }
            render(uri, raw, sendCachedData)
        }

        function sendCachedData(err, cached) {
            if (err) {
                return Routil.errorPage(req, res, [err, 500])
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
    res.setHeader('ETag')
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

