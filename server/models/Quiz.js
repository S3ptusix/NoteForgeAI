import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Quizzes = sequelize.define('quiz', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quizName: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
});

export default Quizzes;