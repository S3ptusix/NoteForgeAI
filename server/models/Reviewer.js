import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Reviewers = sequelize.define('reviewer', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reviewerName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

export default Reviewers;