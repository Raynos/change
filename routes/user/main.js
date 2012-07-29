var methods = require("routil-methods")()
    , Users = require("mongo-col")("Users", "LobbyMen")
    , formBody = require("routil-body")().formBody
    , errorPage = require("error-page")

module.exports = methods({
    "POST": createUser
})

function createUser(req, res) {
    formBody(req, res, function (body) {
        Users.insert(body, {
            safe: true
        }, function (err, docsInserted) {
            if (err) {
                return errorPage(req, res, {})(err)
            }
        })
    })
}