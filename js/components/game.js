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
        this.wordCardsContent = document.querySelector('.word-cards_content');
        this.wordCardsImage = document.querySelector('.word-cards_image');

        this.wordCardsWrapper.remove();
    }

    createEvent = () => {
        this.mainCardsLink.forEach((element) => element.addEventListener('click', (event) => this.createWordCards(event)));
    }

    createWordCards = (event) => {
        this.mainCardsWrapper.remove();
        const targetPage = event.target.closest('.main-cards_link');
        console.log(targetPage.href);
        // console.log(this.mainCardsLink.getAttribute('href'));
        let currentMainCardIndex = 0;
        this.mainCardsState.forEach((item, index) => {
            if (targetPage.getAttribute('href').slice(1) === item) {
                currentMainCardIndex = index;
            }
        });

        console.log(currentMainCardIndex)
        // for (const el of this.mainCardsState) {
        //     console.log(el)
        //     if (event.target.h2 == el) {
        //     }
        // }
        this.mainWarp.appendChild(this.wordCardsWrapper);
        // const wci = this.wordCardsList.querySelector('.word-cards_image');

        this.wordCardsList.forEach((element, index) => {
            element.querySelector('.word-cards_image').src = `${this.cardData[currentMainCardIndex][index].image}`;
            element.querySelector('.word-cards_name').innerText = `${this.cardData[currentMainCardIndex][index].word}`;
        });
        // for (let i = 0; i < this.wordCardsList.length; i += 1) {
        //     this.wordCardsList[i].wci.src = `${this.cardData[1][i].image}`;
        // }

        // for (let i = 0; i < this.wordCardsList.length; i += 1) {
        //     for (let j = 0; j < this.wordCardsList.length; j += 1) {
        //         this.wordCardsImage.src = `${this.cardData[i + 1][j].image}`;
        //     }
        // }
    }
}
