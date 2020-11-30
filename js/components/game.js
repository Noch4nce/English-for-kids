export default class Game {
    constructor(wordCards) {
        this.isGameMode = false;
        this.wordCards = wordCards;
        this.createSelector();
        this.createEvent();
    }

    createSelector = () => {
        this.mainWarp = document.querySelector('.cards_warp');
        this.mainCardsWrapper = document.querySelector('.main-cards_wrapper');
        this.wordCardsWrapper = document.querySelector('.word-cards_wrapper');
        this.mainCardsLink = document.querySelectorAll('.main-cards_link');

        this.wordCardsWrapper.remove();
    }

    createEvent = () => {
        this.mainCardsLink.forEach((element) => element.addEventListener('click', (event) => this.createWordCards(event)));
    }

    createWordCards = () => {
        this.mainCardsWrapper.remove();
    }
}
