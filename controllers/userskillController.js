const db = require('../mysqllib/db')


update_skill = async function(req, res){
    try{
    const [skill] = await db.query("SELECT * from user_skills WHERE id = ? AND user_id = ?", [req.params.id,req.body.user_id]);

    if ( skill[0] )
    {
        const [[[{affectedRows}]]] = await db.query("CALL skill_add_or_edit(?,?,?,?)",
            [req.params.id, req.body.skill, req.body.rating, req.body.user_id]
             )
     
            res.status(201).json( {
                status : 'success',
                rowsaffected: affectedRows
            })    
    
    } else {
        res.status(400).json(  {
            status: 'failed',
            message: 'skill not found in user'
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

exports.skills = async (req, res, next) => {

    try
    {
      var skill=0;  
      if (req.params.id) 
      { 
        await update_skill(req,res);
      }
      else{
      const [[[{affectedRows}]]] = await db.query("CALL skill_add_or_edit(?,?,?,?)",
        [0, req.body.skill, req.body.rating, req.body.user_id]
         )
 
        res.status(201).json( {
            status : 'success',
            rowsaffected: affectedRows
        })
      }
    }
    catch (err) {
        console.log("Error adding :"+err)
        res.status(400).json(  {
            status: 'failed',
            message: err
        })
    }
}

