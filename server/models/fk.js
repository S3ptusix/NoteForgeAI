import Cards from "./Card.js";
import Decks from "./Deck.js";
import Users from "./User.js";

Cards.belongsTo(Decks, { foreignKey: 'deckId' });
Decks.hasMany(Cards, { foreignKey: 'deckId' });

Decks.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(Decks, { foreignKey: 'userId' });

export { Cards, Decks, Users };