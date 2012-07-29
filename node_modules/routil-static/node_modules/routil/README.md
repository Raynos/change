# routil

Gently manipulate req and res

## Examples

A lot of this code is inspired by [npm-www][3] and [tako][4]

Routil wraps [ErrorPage][1] and [templar][2] and provides other utilities

    var routil = require("routil")

    /*
        Configure routil, this allows you to pass config options to both
            error-page and templar
    */
    routil.config({
        errorPage: errorPageConfigOptions,
        templar: templarConfigOptions
    })

    function handler(req, res) {
        // Calls ErrorPage(req, res)(500, new Error("send error"))
        routil.errorPage(req, res, [500 new Error("send error")])

        // Redirect to another uri
        // Status code defaults to 302
        // Returns either JSON or HTML dependending on Accept header
        routil.redirect(req, res, "/redirecting/to/foo", optionalStatusCode)

        // Reads the Accept header and returns one of the functions based
        // on what mediaType the client would like
        var f = routil.mediaTypes(req, res,{
            "application/json": handleJSON,
            "text/html": handleHTML,
            "default": handleDefault
        })

        // Reads the content type header and returns one of the functions based
        // on what content was send from the client
        var f = routil.contentTypes(req, {
            "application/json": handleJSONContent,
            "application/x-www-form-urlencoded": handleForm,
            "default": "handleDefault"
        })

        // Reads the encoding headers and returns one of the functions based
        // on what encoding the client would like
        var f = routil.encoding(req, {
            "gzip": handleGzip,
            "identity": handleIdentity,
            "default": handleDefault
        })

        // Sends json to the client
        routil.sendJson(res, someJsonObject, optionalStatusCode)

        // send html to the client
        routil.sendHtml(res, someHtmlString, optionalStatusCode)

        // send data to the client
        routil.send(res, data, statusCode, headers)

        // Handle different methods. Returns a function which takes req as 
        // the first parameter and then calls the correct function based on 
        // the method
        var f = methods({
            "GET": handleGet,
            "POST": handlePost,
            "DELETE": handleDelete,
            "PUT": handlePut
        })

        // Handle different methods but also read the _method field on a HTML
        // form. This will map a POST with _method=PUT to a PUT handler
        var f = methods({
            "PUT": worksWithForms
        }, true)

        // Calls Templar(req, res, config)(templateName, data)
        routil.template(req, res, templateName, data)

        // extracts the HTTP body from the request and returns it in the callback
        // as a string
        routil.body(req, callback<String>)

        // extracts the HTTP body and maps it into an object based on querystring
        // parsing
        routil.formBody(req, res, callback<Object>)

        // extracts the HTTP body and maps it into an object based on JSON parsing
        routil.jsonBody(req, res, callback<Object>)
    }

## Documentation

Later

## Credit

Most of the code is inspired by isaacs and mikeal
        
## MIT Licenced

  [1]: https://github.com/isaacs/error-page
  [2]: https://github.com/isaacs/templar
  [3]: https://github.com/isaacs/npm-www
  [4]: https://github.com/mikeal/tako