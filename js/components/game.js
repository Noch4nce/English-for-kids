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
        this.wordCardsRepeat = document.querySelectorAll('.word-cards_repeat');
        this.wordCardNameTranslate = document.querySelectorAll('.word-cards_name_translate');
        this.wordCardStartBtn = document.querySelector('.word-cards_play');

        this.navMenuItem = document.querySelectorAll('.nav-link');
        this.wordCardsWrapper.remove();
        this.wordCardStartBtn.remove();
    }

    createEvent = () => {
        this.mainCardsLink.forEach((element) => element.addEventListener('click', (event) => this.filterLink(event)));
        this.wordCardsContent.forEach((element) => element.addEventListener('click', (event) => this.wordCardPlay(event)));
        this.wordCardsRepeat.forEach((element) => element.addEventListener('click', (event) => this.createRotateBtn(event)));
        this.wordCardsContent.forEach((element) => element.addEventListener('mouseleave', (event) => this.createFlipWordCard(event)));
        this.navMenuItem.forEach((element) => element.addEventListener('click', (event) => this.createNavMenuLink(event)));
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

    createNavMenuLink = (event) => {
        const targetNav = event.target;
        if (document.querySelector('.active')) {
            document.querySelector('.active').classList.remove('active');
        }

        if (targetNav.getAttribute('href').slice(1) === 'Main Page') {
            this.wordCardsWrapper.remove();
            this.mainWarp.appendChild(this.mainCardsWrapper);
            targetNav.classList.add('active');
            return;
        }

        let currentNavMenuIndex = 0;
        this.mainCardsState.forEach((item, index) => {
            if (targetNav.getAttribute('href').slice(1) === item) {
                currentNavMenuIndex = index;
                targetNav.classList.add('active');
            }
        });

        this.shuffleWordCards();
        this.createWordCards(currentNavMenuIndex);
    }

    createWordCards = (currentMainCardIndex) => {
        this.mainCardsWrapper.remove();

        this.mainWarp.appendChild(this.wordCardsWrapper);

        this.wordCardsList.forEach((element, index) => {
            element.querySelector('.word-cards_image').src = `${this.cardData[currentMainCardIndex][index].image}`;
            element.querySelector('.word-cards_name').innerText = `${this.cardData[currentMainCardIndex][index].word}`;
            element.querySelector('.word-cards_name_translate').innerText = `${this.cardData[currentMainCardIndex][index].translation}`;
        });
    }

    shuffleWordCards = () => {
        this.cardData.forEach((element) => element.sort(() => Math.random() - 0.5));
    }

    wordCardPlay = (event) => {
        const targetWordCard = event.target.closest('.word-cards_image');
        if (targetWordCard === null) return;
        const atr = targetWordCard.getAttribute('src').slice(17, -4);

        new Audio(`../assets/audio/${atr}.mp3`).play();
    }

    createRotateBtn = (event) => {
        // this.wordCardNameTranslate.style = 'transform: rotateY( 0deg )';
        // this.wordCardNameTranslate.forEach((el) => {
        //     el.style = 'transform: rotateY( 0deg )';
        // });
        this.rotateWordCard = event.target.closest('.word-cards_content');
        this.rotateWordCard.querySelector('.word-cards_name').style = 'transform: rotateY( 180deg )';
        this.rotateWordCard.querySelector('.word-cards_name_translate').style = 'transform: rotateY( 360deg )';
        this.rotateWordCard.querySelector('.word-cards_repeat').style.display = 'none';
        this.rotateWordCard.style.transform = 'rotateY(360deg)';
    }

    createFlipWordCard = (event) => {
        if (this.rotateWordCard === undefined) return;
        this.reverseWordCard = event.target.closest('.word-cards_content');
        this.reverseWordCard.querySelector('.word-cards_name').style = 'transform: rotateY( 360deg )';
        this.reverseWordCard.querySelector('.word-cards_name_translate').style = 'transform: rotateY( 180deg )';
        this.reverseWordCard.querySelector('.word-cards_repeat').style.display = 'block';
        this.rotateWordCard.style.transform = 'rotateY(0deg)';
    }
}
