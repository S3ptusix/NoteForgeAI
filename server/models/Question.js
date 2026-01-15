import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';
import Quizzes from './Quiz.js'

const Questions = sequelize.define('question', {
    quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Quizzes,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    question: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    optionA: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    optionB: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    optionC: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    optionD: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    answer: {
        type: DataTypes.STRING(1),
        allowNull: false
    }
});

export default Questions;