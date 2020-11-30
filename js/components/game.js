export default class Game {
    constructor(wordCards) {
        this.isGameMode = false;
        this.wordCards = wordCards;
        this.createSelector();
        this.createEvent();
        this.mainCardsState = ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions', 'Fruits', 'Sport'];
    }

    createSelector = () => {
        this.mainWarp = document.querySelector('.cards_warp');

        this.mainCardsWrapper = document.querySelector('.main-cards_wrapper');
        this.mainCardsLink = document.querySelectorAll('.main-cards_link');

        this.cardData = this.wordCards.cardData;
        console.log(this.cardData);
        this.wordCardsWrapper = document.querySelector('.word-cards_wrapper');
        this.wordCardsList = document.querySelectorAll('.word-cards_list');
        this.wordCardsContent = document.querySelectorAll('.word-cards_content');
        this.wordCardsImage = document.querySelector('.word-cards_image');

        // this.wordCardsWrapper.remove();
    }

    createEvent = () => {
        this.mainCardsLink.forEach((element) => element.addEventListener('click', (event) => this.filterLink(event)));
        this.wordCardsContent.forEach((element) => element.addEventListener('click', (event) => this.wordCardPlay(event)));
    }

    filterLink = (event) => {
        const targetPage = event.target.closest('.main-cards_link');

        let currentMainCardIndex = 0;
        this.mainCardsState.forEach((item, index) => {
            if (targetPage.getAttribute('href').slice(1) === item) {
                currentMainCardIndex = index;
            }
        });

        this.shuffleWordCards();
        this.createWordCards(currentMainCardIndex);
    }

    createWordCards = (currentMainCardIndex) => {
        this.mainCardsWrapper.remove();

        this.mainWarp.appendChild(this.wordCardsWrapper);

        this.wordCardsList.forEach((element, index) => {
            element.querySelector('.word-cards_image').src = `${this.cardData[currentMainCardIndex][index].image}`;
            element.querySelector('.word-cards_name').innerText = `${this.cardData[currentMainCardIndex][index].word}`;
        });
    }

    shuffleWordCards = () => {
        this.cardData.forEach((element) => element.sort(() => Math.random() - 0.5));
    }

    wordCardPlay = (event) => {
        const targetWordCard = event.target.closest('.word-cards_image');
        const atr = targetWordCard.getAttribute('src').slice(17, -4);

        new Audio(`../assets/audio/${atr}.mp3`).play();
    }
}
