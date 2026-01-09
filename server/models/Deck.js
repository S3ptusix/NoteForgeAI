import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Decks = sequelize.define('deck', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deckName: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
});

export default Decks;