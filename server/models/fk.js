import Cards from "./Card.js";
import Decks from "./Deck.js";

Cards.belongsTo(Decks, { foreignKey: 'deckId' });
Decks.hasMany(Cards, { foreignKey: 'deckId' });

export { Cards, Decks };