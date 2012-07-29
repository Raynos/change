var template = require("../..").template

module.exports = signup

function signup(req, res)  {
    template(req, res, "user/signup.ejs")
}