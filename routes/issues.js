var main = require("..")
    , template = main.template
    , Issues = require("mongo-col")("Issues")
    , methods = require("routil-methods")()
    , errorPage = require("error-page")
    , formBody = require("routil-body")().formBody
    , redirect = require('redirecter')

module.exports = methods({
    "GET": renderIssues
    , "POST": insertIssues
})

function renderIssues(req, res)  {
    Issues.find({}, function (err, issues) {
        if (err) {
            return errorPage(req, res)(500, err)
        }

        template(req, res, "issues.ejs", {
            issues: issues
        })
    })
}

function insertIssues(req, res) {
    formBody(req, res, function (body) {
        Issues.insert(body, {
            safe: true
        }, function (err, doc) {
            if (err) {
                return errorPage(req, res)(500, err)
            }

            redirect(req, res, "/issues")
        })
    })
}