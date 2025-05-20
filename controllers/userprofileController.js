const db = require('../mysqllib/db')
const jwt = require('jsonwebtoken')

exports.checkbody = (req,res, next ) => {
/*     if ( !req.body.user || !req.body.password)
  //  return res.status(400).json( {
    //    status: 'error',
     //   message: 'user Body missing fields'
    //});
*/ 
    next(); 
};

sp_profile= async (res, profile, user_id, dob, employee_id, job_title, address1, address2, address3, address4)=>
{
    const [[[{affectedRows}]]] = await db.query("CALL profile_add_or_edit(?,?,?,?,?,?,?,?,?)",
        [profile, user_id, dob,employee_id,job_title,address1,address2,address3,address4]
         )
 
    if (affectedRows)
    {
        res.status(201).json( {
        status : 'success',
        data   : affectedRows
        })
    }
    else {
        res.status(201).json( {
            status : 'failed',
            message   : "Unable to add/update profile"
        })
    }
 }

exports.addprofile = async (req, res, next) => {
    try
    {  
        var dob, employee_id, job_title, address1, address2, address3, address4;

        if (req.body.dob) dob = req.body.dob;
        if (req.body.employee_id) employee_id = req.body.employee_id;
        if (req.body.job_title) job_title = req.body.job_title;
        if (req.body.address1)  address1 = req.body.address1;
        if (req.body.address2)  address2 = req.body.address2;
        if (req.body.address3)  address3 = req.body.address3;
        if (req.body.address4)  address4 = req.body.address4;
        sp_profile(res, 0, req.body.user_id, dob, employee_id, job_title, address1, address2, address3, address4);
    }
    catch (err) {
        console.log("Error adding :"+err)
        res.status(400).json(  {
            status: 'failed',
            message: err
        })
    }
}

exports.modifyprofile = async (req, res, next) => {

    try
    {  
        sp_profile(req.params.id, req.user_id, req.body.dob, req.body.employee_id, req.body.job_title, req.body.address1, req.body.address2, req.body.address3, req.body.address4);
    }
    catch (err) {
        console.log("Error adding :"+err)
        res.status(400).json(  {
            status: 'failed',
            message: err
        })
    }
}


exports.get_profile_by_user_id = async (req,res,next) => {
    try
    {
        const [profile] = await db.query("SELECT * from user_profile WHERE user_id = ?", [req.params.id]);
        if (profile[0])
        {    
            res.status(201).json( {
            status : 'success',
            rowsaffected: profile[0]
            })
        }
        else{
            res.status(400).json( {
                status : 'failed',
                message: "Profile doesn't exist of user ID ["+req.params.id +"]"
                })    
        }
    }
    catch(err)
    {
        res.status(400).json( {
            status : 'failed',
            message: "Invalid ID "
            })    

    }
}


