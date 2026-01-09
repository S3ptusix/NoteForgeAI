import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Users = sequelize.define('user', {
    fullname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
});

export default Users;