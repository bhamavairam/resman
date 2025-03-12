var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = "bottle"    
    const api = process.env.API_URL_LOGIN;

    return jwt({
        secret,
        algorithms: ['HS256']
    }).unless({       path: [
            { url: process.env.API_URL_LOGIN, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']},//working
            { url: /\/api\/v1\/users\/login(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']},//working
            // { url: /\/mk-api\/v1\/job(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']},//working
            // { url: /\/mk-api\/v1\/attendance(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']},//working
            // { url: /\/mk-api\/v1\/user(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']},//working
            // { url: /\/mk-api\/v1\/employee(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']},//working
               { url: /\/mk-api\/v1\/password(.*)/, methods: ['GET', 'POST','PUT', 'DELETE', 'OPTIONS']},//working
            // { url: /\/mk-api\/v1\/employee(.*)/, methods: ['GET',  'DELETE', 'OPTIONS']},//working
            // { url: /\/mk-api\/v1\/reports(.*)/, methods: ['GET', 'POST', 'DELETE', 'OPTIONS']},//working
            // { url: /\/mk-api\/v1\/transactions(.*)/, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']},//working
            // { url: /(.*)/ } //Allow every URL
        ]                                                               //regex101.com
    })
}

module.exports = authJwt;
