const jwt = require('jsonwebtoken')

exports.checkToken = (req,res, next ) => {
    if (process.env.security )
    {
        console.log( 'check body for token'+req.body);
        const token = req.header('Authorization');
        if (!token) return res.status(401).json( { error: 'Access Denied'});

        try {
            const decoded = jwt.verify(token, process.env.secret);
            console.log("TOKEN id   "+decoded.id)
            console.log("TOKEN role "+decoded.role)
        }catch( error) {
            res.status(401).json( { status: 'error', message : 'Invalid---- token'})
        }
    }
    else { console.log("TEST mode, security relaxed")}
    next(); 
};
