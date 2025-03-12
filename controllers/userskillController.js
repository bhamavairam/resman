const { json } = require('express')
const db = require('../mysqllib/db')

sp_skills = async ( skill, req, res)=>
    {
        try
        {
            console.log('params '+skill +", "+req.body.user_id)
          const [[[{affectedRows}]]] = await db.query("CALL skill_add_or_edit(?,?,?,?)",
            [skill, req.body.skill, req.body.rating, req.body.user_id])
     
            res.status(201).json( {
                status : 'success',
                data   : affectedRows
            })
        }
        catch (err) {
            res.status(400).json(  {
                status: 'failed',
    
                message: err
            })
        }
    }
    
exports.addskill = async (req, res, next) => {
    sp_skills(0, req, res);
}
    
    
exports.modifyskill = async (req, res, next) => {
    const [skill] = await db.query("SELECT * from user_skills WHERE id = ? AND user_id = ?", [req.params.id,req.body.user_id]);

    if ( skill[0] )
    {
        sp_skills(req.params.id, req, res)
    }
    else{
            res.status(400).json(  {
                status: 'failed',  
                message: 'skill not found in db'
            })
    }        
}
    
    
exports.get_skill_by_user_id = async (req, res, next) => {
    try
    {
        const [skill] = await db.query("SELECT * from user_skills WHERE user_id = ? ", [req.params.id]);

        console.log(JSON.stringify(skill));
        if (skill[0])
        {
        res.status(201).json( {
            status : 'success',
            records : skill
        })}
        else
        {
            res.status(201).json( {
                status : 'failed',
                message : "no skills added for this user"
        })}
    
    }
    catch (err) {
        res.status(400).json(  {
            status: 'ERROR ',

            message: err
        })
    }
}

    



