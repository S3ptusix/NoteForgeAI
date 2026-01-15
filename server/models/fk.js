import Cards from "./Card.js";
import Decks from "./Deck.js";
import Questions from "./Question.js";
import Quizzes from "./Quiz.js";
import Users from "./User.js";


Decks.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(Decks, { foreignKey: 'userId' });

Cards.belongsTo(Decks, { foreignKey: 'deckId' });
Decks.hasMany(Cards, { foreignKey: 'deckId' });

Quizzes.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(Quizzes, { foreignKey: 'userId' });

Questions.belongsTo(Quizzes, { foreignKey: 'quizId' });
Quizzes.hasMany(Questions, { foreignKey: 'quizId' });

export { Cards, Decks, Users, Quizzes, Questions };