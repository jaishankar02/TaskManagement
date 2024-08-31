const db=require('../dbconfig/db.config.js')
const {Op}=require('sequelize')
const Task=db.tasks
const User=db.users

class taskController{
    static createTask= async(req,res)=>{
        const {title,description,status,priority,due_date}=req.body;
        if(title){
            const task=await Task.findOne({
                where:{title:title}
            })
            console.log(task)
            if(task){
                res.status(200).send({
                    success:false,
                    message:'This task name already Exist'
                })
            }
            else{
                const newTask={
                    title,
                    description,
                    status,
                    priority,
                    due_date
                }
                Task.create(newTask).then((data)=>{
                    res.status(201).send({
                        success:true,
                        message:'Task Created',
                        newTask
                    })
                })
                .catch((error)=>{
                    res.status(500).send({
                        success:false,
                        message:'Error Occured',
                        error
                    })
                })
            }
        }
        else{
            res.status(400).send({
                success:false,
                message:'Please Provide Required Fields'
            })
        }
    }

    static deleteTask=async(req,res)=>{
        try {
            const taskId = req.params.id;  // Assuming the task ID is passed as a URL parameter
    
            const result = await Task.destroy({
                where: {
                    id: taskId
                }
            });
    
            if (result) {
                res.status(200).send({ 
                    success:true,
                    message: `Task with id ${taskId} deleted successfully.` 
                });
            } else {
                res.status(404).send({ 
                    success:false,
                    message: `Task with id ${taskId} not found.` 
                });
            }
        } catch (error) {
            res.status(500).send({ 
                success:false,
                message: 'Error deleting task', error: error.message 
            });
        }
    }

    static updateTask=async(req,res)=>{
        try {
            const taskId = req.params.id;  // Assuming the task ID is passed as a URL parameter
            const { title, description, status, priority, due_date } = req.body;
    
            // Perform the update
            const [updatedRows] = await Task.update(
                {
                    title:description,
                    description:description,
                    status:status,
                    priority:priority,
                    due_date:due_date
                },
                {
                    where: {
                        id: taskId
                    }
                }
            );
            if (updatedRows > 0) {
                // If at least one row was updated
                res.status(200).send({
                    success:true,
                     message: `Task with id ${taskId} updated successfully.` });
            } else {
                // If no rows were updated
                res.status(404).send({ 
                    success:false,
                    message: `Task with id ${taskId} not found.` });
            }
        } catch (error) {
            res.status(500).send({ 
                success:false,
                message: 'Error updating task', error: error.message });
        }
    }

    static assignTask=async(req,res)=>{
        try {
            const {userId,taskId}=req.body
            const user = await User.findByPk(userId);
            const task = await Task.findByPk(taskId);
    
            if (user && task) {
                await user.addTask(task); // Sequelize automatically generates `addTask`
                res.status(201).send({
                    success:true,
                    message:'Task Assigned Successfully'
                })
            } else {
                res.status(404).send({
                    success:false,
                    message:'User or Task not found'
                })
            }
        } catch (error) {
            res.status(500).send({
                success:false,
                message:'Error Occured'
            })
        }
    }

    static getTaskAssignToOneUser=async(req,res)=>{
        try {
            const userId = req.params.id; // Assume userId is provided as a URL parameter
            const user = await User.findByPk(userId);
    
            if (!user) {
                res.status(404).send({
                    success:false,
                    message:'User not found'
                })
            }
    
            
            const userWithTasks = await User.findByPk(userId, {
                include: Task  // This will include associated tasks
            });

            const tasks=userWithTasks?.Tasks;
            res.status(200).send({
                success:true,
                tasks
            });
        } catch (error) {
            res.status(500).send({ 
                success:false,
                message: 'Error retrieving tasks', error: error.message });
        }
    }

    static getAllTasks=async(req,res)=>{
        try {
            // Fetch all tasks from the database
            const tasks = await Task.findAll();
    
            res.status(200).send({
                success:true,
                tasks
            })
        } catch (error) {
            res.status(500).send({ 
                success:false,
                message: 'Error retrieving tasks', error: error.message });
        }
    }

    static getTasksOfuser=async(req,res)=>{
        try {
            const userId = req.userData.userid;
            const user = await User.findByPk(userId);
    
            if (!user) {
                res.status(404).send({
                    success:false,
                    message:'User not found'
                })
            }
    
            // Retrieve tasks assigned to the user using Sequelize's association methods
            const userWithTasks = await User.findByPk(userId, {
                include: Task  // This will include associated tasks
            });
            const tasks=userWithTasks?.Tasks
            res.status(200).send({
                success:true,
                tasks
            });
        } catch (error) {
            res.status(500).send({ 
                success:false,
                message: 'Error retrieving tasks', error: error.message });
        }
    }

    static filterTask=async(req,res)=>{
        try {
            const { status, priority, due_date } = req.query;
            const role=req.userData.role;
            // Build the where condition object based on the query parameters
            let whereCondition = {};

            if (status) {
                whereCondition.status = status;
            }
    
            if (priority) {
                whereCondition.priority = priority;
            }
    
            if (due_date) {
                whereCondition.due_date = due_date;  // Assuming due_date is passed in 'YYYY-MM-DD' format
            }
            
            let tasks;
            if(role==='user'){
                const userId=req.userData.userid
                const userWithTasks=await User.findByPk(userId, {
                    include: {
                        model: Task,
                        where: {
                            ...whereCondition
                        },
                        through: { attributes: [] }  // Exclude the join table attributes
                    }
                });
                tasks=userWithTasks?.Tasks
            }
            else{
                tasks = await Task.findAll({
                    where: whereCondition
                });
            }
            

    
            res.status(200).send({
                success:true,
                Tasks:tasks?tasks:[]
            });
        } catch (error) {
            res.status(500).json({ message: 'Error filtering tasks', error: error.message });
        }
    }

    static searchTask=async(req,res)=>{
        try {
            const { query } = req.query;  // Assuming the search query is passed as a query parameter named 'query'
    
            if (!query) {
                return res.status(400).json({ message: 'Search query is required.' });
            }
    
            // Perform the search using the Op.like operator
            let tasks;
            if(req.userData.role==="user"){
                const userId=req.userData.userid
                const userWithTasks=await User.findByPk(userId, {
                    include: {
                        model: Task,
                        where: {
                            [Op.or]: [
                                { title: { [Op.like]: `%${query}%` } },
                                { description: { [Op.like]: `%${query}%` } }
                            ]
                        },
                        through: { attributes: [] }  // Exclude the join table attributes
                    }
                });
                tasks=userWithTasks?.Tasks
            }
            else{
                tasks = await Task.findAll({
                    where: {
                        [Op.or]: [
                            { title: { [Op.like]: `%${query}%` } },
                            { description: { [Op.like]: `%${query}%` } }
                        ]
                    }
                });
            }
            
    
            res.status(200).send({
                success:true,
                Tasks:tasks?tasks:[]
            });
        } catch (error) {
            res.status(500).json({ message: 'Error searching tasks', error: error.message });
        }
    
    }

}

module.exports=taskController;