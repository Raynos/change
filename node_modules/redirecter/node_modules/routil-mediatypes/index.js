var Negotiator = require("negotiator")
    , ErrorPage = require("error-page")
    , partial = require("ap").partial

module.exports = MediaTypes

function MediaTypes(options) {
    var errorPage = ErrorPage || options.errorPage

    return partial(mediaTypes, errorPage)
}

function mediaTypes(errorPage, req, res, object)  {
    var types = Object.keys(object)
        , mediaType = new Negotiator(req).preferredMediaType(types)

    return object[mediaType] || object.default ||
        partial(notSupportedHandler, errorPage, req, res)
}

function notSupportedHandler(errorPage, req, res) {
    errorPage(req, res)(
        new Error("mediaType not supported"), 415)
}