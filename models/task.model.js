module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('Task', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        status: {
            type: Sequelize.ENUM('Todo', 'In Progress', 'Done'),
            defaultValue: 'Todo'
        },
        priority: {
            type: Sequelize.ENUM('Low', 'Medium', 'High'),
            defaultValue: 'Medium'
        },
        due_date: {
            type: Sequelize.DATE
        },
    }, {
        timestamps: true,  // Automatically add `createdAt` and `updatedAt` fields
    });


    return Task;
};
