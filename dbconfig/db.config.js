const Sequelize = require('sequelize');
const dbName='taskmanagement';
const dbUser='root';
const dbPassword='Jai@16032004';

const sequelize= new Sequelize(dbName,dbUser,dbPassword,{
    host:'localhost',
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