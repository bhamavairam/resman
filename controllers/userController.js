const jwt = require('jsonwebtoken')
const db = require('../mysqllib/db')
const bcrypt = require('bcryptjs')

const signToken = function(id, role){
    const secret = process.env.secret;

    return jwt.sign( { id : id, role: role }, secret , { expiresIn: '10d'})

}

exports.signup = async (req, res, next) => {

    try
    {
      password = await bcrypt.hash(req.body.password, 12);
      const [[[{affectedRows}]]] = await db.query("CALL user_add_or_edit(?,?,?,?,?)",
        [0, req.body.name, req.body.email, password, req.body.role]
         )
 
        res.status(201).json( {
            status : 'success',
            rowsaffected: affectedRows
        })
    }
    catch (err) {
        console.log("Error adding :"+err)
        res.status(400).json(  {
            status: 'failed',
            message: err
        })
    }
}

findUserbyEmail = async (email)=> {
    const [user] = await db.query("SELECT * from users WHERE email = ?", [email]);
    return user[0];
}

exports.login =async (req, res, next) => {
    const { email, password } = req.body;

    if ( !email || !password ) {
        res.status(400).json( {
            status: 'failed',
            message: 'mandatory fields missing'
        })
    }

    const user = await findUserbyEmail(email)
    console.log("User found" + JSON.stringify(user))


   if( !user || !(await bcrypt.compare(password, user.password))) {
//    if( !user || !(await bcrypt.compare(password, user.password))) {
        res.status(400).json( {
        status: 'failed',
        message: 'Invalid Credentials'
        })
   }
   else {

   const token = signToken(user.id, user.role);

    res.status(200).json({
        token : token
    })
}
}


exports.getallusers = async (req, res, next) => {
    
    try
    {
        const [users] = await db.query("SELECT * from users");

        if ( users[0] )
        {
            res.status(201).json( {
                status : 'success',
                data: users
            })
                }
        else{
            res.status(400).json(  {
                status: 'failed',  
                message: 'Stories not found in db'
            })
        }        
    }
    catch (err) {
    res.status(400).json(  {
        status: 'failed',
        message: err
    })
    }
}
