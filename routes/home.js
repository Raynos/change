var main = require("..")
    , template = main.template

module.exports = home

function home(req, res)  {
    template(req, res, "index.ejs")
}