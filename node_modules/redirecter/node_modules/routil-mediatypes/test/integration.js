var test = require("tap").test
    , testServer = require("test-server")
    , mediaTypes = require("..")()

testServer(handleRequest, function (request, done) {
    test("json works", function (t) {
        request({
            uri: "/"
            , headers: {
                accept: "application/json"
            }
        }, function (e, r, body) {
            t.equal(body, "json")

            t.end()
        })
    })

    test("html works", function (t) {
        request({
            uri: "/"
            , headers: {
                accept: "text/html"
            }
        }, function (e, r, body) {
            t.equal(body, "html")

            t.end()
        })
    })

    test("normal works", function (t) {
        request("/", function (e, r, body) {
            t.equal(body, "normal")

            t.end()
        })
    })

    test("error works", function (t) {
        request("/error", function (err, res, body) {
            t.equal(err, null)
            t.equal(res.statusCode, 415)
            t.equal(body, "415 mediaType not supported /error\n")

            t.end()
        })
    })

    .on("end", done)
})

function handleRequest(req, res) {
    if (req.url === "/error") {
        return mediaTypes(req, res, {})()
    }
    mediaTypes(req, res, {
        "application/json": json
        , "text/html": html
        , default: normal
    })(res)
}

function json(res) {
    res.end("json")
}

function html(res) {
    res.end("html")
}

function normal(res) {
    res.end("normal")
}