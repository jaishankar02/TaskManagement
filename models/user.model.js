module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM('admin', 'user'),
            defaultValue: 'user'
        }
    }, {
        timestamps: true,  // Automatically add `createdAt` and `updatedAt` fields
    });


    return User;
};
