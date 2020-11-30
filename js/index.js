import '../styles/scss/main.scss';
import cardData from './data/cards';
import './components/burger-menu';
import WordCards from './components/word-cards';
import Game from './components/game';

const wordCards = new WordCards(cardData);
const gameMain = new Game(wordCards);
