const express = require('express');
const userRouter = require('./routes/userRoute.js')
const db=require('./dbconfig/db.config.js');
const taskRouter = require('./routes/taskRoute.js');
const server=express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

db.sequelize.sync();

server.use('/api/user',userRouter);
server.use('/api/task',taskRouter);

server.listen(8000,()=>{
    console.log("server started")
})