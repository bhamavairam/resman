const db = require('../mysqllib/db')

sp_project = async ( project, req, res)=>
{
    try
    {
      const [[[{affectedRows}]]] = await db.query("CALL project_add_or_edit(?,?,?,?)",
        [project, req.body.name, req.body.pso, req.body.budget]
         )
 
        res.status(201).json( {
            status : 'success',
            rowsaffected: affectedRows
        })
    }
    catch (err) {
        res.status(400).json(  {
            status: 'failed',

            message: err
        })
    }
}

exports.addproject = async (req, res, next) => {
    sp_project(0, req, res);
}


exports.modifyproject = async (req, res, next) => {
    const [project] = await db.query("SELECT * from projects WHERE id = ?", [req.params.id]);

    if ( project[0] )
    {
        sp_project(req.params.id, req, res)
    }
    else{
            res.status(400).json(  {
                status: 'failed',  
                message: 'project not found in db'
            })
    }        
}

exports.getproject_by_id = async (req,res,next) => {
    try
    {
        const [project] = await db.query("SELECT * from projects WHERE id = ?", [req.params.id]);
        if (project[0])
        {    
            res.status(201).json( {
            status : 'success',
            rowsaffected: project[0]
            })
        }
        else{
            res.status(400).json( {
                status : 'failed',
                message: "Invalid ID "
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

exports.getallprojects = async (req, res, next) => {
    
    try
    {
        const [projects] = await db.query("SELECT * from projects");

        if ( projects[0] )
        {
            res.status(201).json( {
                status : 'success',
                rowsaffected: projects
            })
                }
        else{
            res.status(400).json(  {
                status: 'failed',  
                message: 'project not found in db'
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
