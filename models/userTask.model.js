module.exports = (sequelize, Sequelize) => {
    const UserTask = sequelize.define('UserTask', {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'Users',  // The name of the model the foreign key refers to
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        taskId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'Tasks',  // The name of the model the foreign key refers to
                key: 'id'
            },
            onDelete: 'CASCADE'
        }
    }, {
        tableName: 'UserTasks',  // Specify the table name explicitly
        timestamps: false        // Disable automatic `createdAt` and `updatedAt` fields
    });



    return UserTask;
};
