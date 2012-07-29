var main = require("..")
    , template = main.template
    , redirect = require("redirecter")

module.exports = home

function home(req, res)  {
    redirect(req, res, "/public/index.html")
}