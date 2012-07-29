var main = require("..")
    , template = main.template
    , Issues = require("mongo-col")("Issues")
    , methods = require("routil-methods")()
    , errorPage = require("error-page")
    , formBody = require("routil-body")().formBody
    , redirect = require('redirecter')


module.exports = methods({
    "GET": renderIssue
    , "PUT": updateIssue
    , "DELETE": deleteIssue
})

function renderIssue(req, res, params) {
    Issues.findOne({
        _id: params.issueId
    }, function (err, issue) {
        template(req, res, "issue.ejs",  {
            issue: {
                _id: "foobar"
            }
        })
    })
}

function updateIssue(req, res)  {
    formBody(req, res, function (body) {
        Issues.update({
            _id: body._id
        }, {
            $set: body
        }, {
            safe: true
            , upsert: true
        }, function (err, nosUpdated) {
            if (err) {
                return errorPage(req, res)(500, err)
            }

            redirect(req, res, "/issues/" + encodeURIComponent(body.email))
        })
    })
}

function deleteIssue(req, res, params) {
    Issues.remove({
        _id: params.issueId
    }, function (err, docsRemoved) {
        if (err)  {
            return errorPage(req, res)(500, err)
        }

        redirect(req, res, "/issues")
    })
}