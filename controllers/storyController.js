const db = require('../mysqllib/db')

sp_addstory = async ( task, req, res)=>
{
    try
    {
        var task_id=8;
        if( req.body.task_id) task_id=req.body.task_id;

      const [[[{affectedRows}]]] = await db.query("CALL story_add_or_edit(?,?,?,?)",
        [task, req.body.narration, task_id, req.body.user_id]
         )
 
        res.status(201).json( {
            status : 'success',
            rowsaffected: affectedRows
        })
    }
    catch (err) {
        res.status(400).json(  {
            status: 'Failed',

            message: err
        })
    }
}

exports.addstory = async (req, res, next) => {
    sp_addstory(0, req, res);
}


exports.modifystory = async (req, res, next) => {
    const [stories] = await db.query("SELECT * from story WHERE id = ?", [req.params.id]);

    if ( stories[0] )
    {
        sp_addstory(req.params.id, req, res)
    }
    else{
            res.status(400).json(  {
                status: 'failed',  
                message: 'story not found in db'
            })
    }        
}


exports.getallstories = async (req, res, next) => {
    
    try
    {
        const [stories] = await db.query("SELECT * from story");

        if ( stories[0] )
        {
            res.status(201).json( {
                status : 'success',
                rowsaffected: stories
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


exports.getuserstories = async (req, res, next) => {
    
    try
    {
        const [stories] = await db.query("SELECT * from story WHERE user_id = ?", [req.params.id]);
        //get stories based on user id

        if ( stories[0] )
        {
            res.status(201).json( {
                status : 'success',
                rowsaffected: stories
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
