# routil-mediatypes [![build status][1]][2]

handle multiple media types

## Example

    var http = require("http")
        , mediaTypes = require("routil-mediatypes")()

    http.createServer(function (req, res) {
        mediaTypes(req, res, {
            "application/json": sendJson
            , "text/html": sendHtml
        })(res)
    }).listen(8080)

    function sendJson(res) { res.end("json") }

    function sendHtml(res) { res.end("html") }

## Example with custom error handling

    var http = require("http")
        , mediaTypes = require("routil-mediatypes")({
            errorPage: function (req, res) {
                return function (error, statusCode) {
                    res.statusCode = statusCode
                    res.end("error :(", err.message)
                }
            }
        })

    http.createServer(function (req, res) {
        mediaTypes(req, res, {
            "application/json": sendJson
            , "text/html": sendHtml
        })(res)
    }).listen(8080)

    function sendJson(res) { res.end("json") }

    function sendHtml(res) { res.end("html") }

## Example with custom error page

    var ErrorPage = require("error-page")
        , partialRight = require("ap").partialRight
        , errorPageOptions = { ... }
        , errorPage = partialRight(ErrorPage, errorPageOptions)
        , mediaTypes = require("routil-mediatypes")({
            errorPage: errorPage
        })

    ...

## Installation

`npm install routil-mediaTypes`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/routil-mediaTypes.png
  [2]: http://travis-ci.org/Raynos/routil-mediaTypes