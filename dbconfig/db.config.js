const Sequelize = require('sequelize');
const dbName=process.env.DB_NAME;
const dbUser=process.env.DB_USER;
const dbPassword=process.env.DB_PASSWORD;

const sequelize= new Sequelize(dbName,dbUser,dbPassword,{
    host:process.env.DB_HOST,
    port:3306,
    dialect:'mysql'
})

const db={}
db.Sequelize=Sequelize
db.sequelize=sequelize


db.users=require('../models/user.model.js')(sequelize,Sequelize)
db.tasks=require('../models/task.model.js')(sequelize,Sequelize)
db.usertasks=require('../models/userTask.model.js')(sequelize,Sequelize)

db.users.belongsToMany(db.tasks, {
    through: 'UserTask',
    foreignKey: 'userId',
    otherKey: 'taskId'
});

db.tasks.belongsToMany(db.users, {
    through: 'UserTask',
    foreignKey: 'taskId',
    otherKey: 'userId'
});

module.exports=db;