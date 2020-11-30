export default class WordCards {
    constructor(cardData) {
        this.cardData = cardData;
        this.wordCardsList = document.querySelector('.word-cards_container');
        this.wordCardsDraw();
    }

    wordCardsDraw = () => {
        // const cardsContainer = document.createElement('div');
        // this.wordCardsList.append(cardsContainer);
        for (let i = 2; i < this.cardData.length; i += 1) {
            this.wordCardsList.insertAdjacentHTML('beforeend',
                '<div class="word-cards_list"><div class="word-cards_content"><img class="word-cards_image" src="assets/images/bird.jpg"><div class="word-cards_info"><h2 class="word-cards_name">bird</h2><img class="word-cards_repeat" src="assets/images/repeat.svg"></div></div></div>');
        }
    }
}
