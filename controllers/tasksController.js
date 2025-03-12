const db = require('../mysqllib/db')

sp_task = async ( task, req, res)=>
{
    try
    {
      const [[[{affectedRows}]]] = await db.query("CALL task_add_or_edit(?,?,?,?,?)",
        [task, req.body.name, req.body.project_id, req.body.estimation, req.body.status]
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

exports.addtask = async (req, res, next) => {
    sp_task(0, req, res);
}


exports.modifytask = async (req, res, next) => {
    const [tasks] = await db.query("SELECT * from tasks WHERE id = ?", [req.params.id]);

    if ( tasks[0] )
    {
        sp_task(req.params.id, req, res)
    }
    else{
            res.status(400).json(  {
                status: 'failed',  
                message: 'task not found in db'
            })
    }        
}


exports.assigntask = async (req, res, next) => {
    try
    {
      const [[[{affectedRows}]]] = await db.query("CALL assign_task_add(?,?)",
        [req.body.user_id, req.body.task_id]
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

exports.usertask = async (req, res, next) => {
    try
    {
        console.log("calling sp_get_my_tasks : "+req.body.user_id);

        const [rows] = await db.query('CALL sp_get_user_tasks(?)', [req.body.user_id]);

//      const [[[{affectedRows}]]] = await db.query("CALL sp_get_my_tasks(?)",
  //      [req.body.user_id]
    //     )
         console.log("Fetched Data:" + rows)
        res.status(201).json( {
            status : 'success',
            records : rows[0]
        })
    }
    catch (err) {
        res.status(400).json(  {
            status: 'ERROR ',

            message: err
        })
    }
}

exports.get_task_by_id = async (req,res,next) => {
    try
    {
        const [task] = await db.query("SELECT * from tasks WHERE id = ?", [req.params.id]);
        if (task[0])
        {    
            res.status(201).json( {
            status : 'success',
            rowsaffected: task[0]
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

exports.getalltasks = async (req, res, next) => {
    
    try
    {
        const [tasks] = await db.query("SELECT * from tasks");

        if ( tasks[0] )
        {
            res.status(201).json( {
                status : 'success',
                rowsaffected: tasks
            })
                }
        else{
            res.status(400).json(  {
                status: 'failed',  
                message: 'tasks not found in db'
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
