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


exports.profile = async (req, res, next) => {

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

      var profile=0;
      if (req.params.id) profile=req.params.id;
      console.log("prfile "+profile)

      const [[[{affectedRows}]]] = await db.query("CALL profile_add_or_edit(?,?,?,?,?,?,?,?,?)",
        [profile, req.body.user_id, dob,employee_id,job_title,address1,address2,address3,address4]
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

