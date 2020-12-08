export default class Game {
    constructor(wordCards) {
        this.isGameMode = false;
        this.isResult = false;
        this.wordCards = wordCards;
        this.cardData = JSON.parse(localStorage.getItem('stats'));
        this.isGetState = JSON.parse(localStorage.getItem('flag'));
        this.createSelector();
        this.createEvent();
        this.cardsAudio = new Audio();
        this.countMistakes = 0;
        this.mainCardsState = ['Action (set A)', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions', 'Fruits', 'Sport'];
    }

    createSelector = () => {
        this.mainWarp = document.querySelector('.cards_warp');
        this.main = document.querySelector('.main');

        this.mainCardsWrapper = document.querySelector('.main-cards_wrapper');
        this.mainCardsLink = document.querySelectorAll('.main-cards_link');

        if (!this.isGetState) this.cardData = this.wordCards.cardData;
        this.wordCardsWrapper = document.querySelector('.word-cards_wrapper');
        this.wordCardsList = document.querySelectorAll('.word-cards_list');
        this.wordCardsContent = document.querySelectorAll('.word-cards_content');
        this.wordCardsImage = document.querySelectorAll('.word-cards_image');
        this.wordCardsRepeat = document.querySelectorAll('.word-cards_repeat');
        this.wordCardNameTranslate = document.querySelectorAll('.word-cards_name_translate');
        this.wordCardStartBtn = document.querySelector('.word-cards_play-name');
        this.wordCardsStatBtnContainer = document.querySelector('.word-cards_play');
        this.wordCardsInfo = document.querySelectorAll('.word-cards_info');
        this.wordRepeat = document.querySelector('.word_repeat');
        this.wordCardsResult = document.querySelector('.word-cards_result');

        this.navMenuItem = document.querySelectorAll('.nav-link');
        this.wordCardsWrapper.remove();

        this.switchTumbler = document.querySelector('.switch-slider');
        this.switchType = document.querySelector('.switch-name');

        this.navStatsButton = document.querySelector('.nav-stats');
        this.wordStatsContainer = document.querySelector('.word-stats_container');
        this.statsWrapper = document.querySelector('.statistics_wrapper');
        this.statsDifficultBtn = document.querySelector('.stats_difficult');
        this.statsResetBtn = document.querySelector('.stats_reset');

        this.wordCardStartBtn.style.display = 'none';
    }

    createEvent = () => {
        this.mainCardsLink.forEach((element) => element.addEventListener('click', (event) => this.filterLink(event)));
        this.wordCardsContent.forEach((element) => element.addEventListener('click', (event) => this.wordCardPlay(event)));
        this.wordCardsRepeat.forEach((element) => element.addEventListener('click', (event) => this.createRotateBtn(event)));
        this.wordCardsContent.forEach((element) => element.addEventListener('mouseleave', (event) => this.createFlipWordCard(event)));
        this.navMenuItem.forEach((element) => element.addEventListener('click', (event) => this.createNavMenuLink(event)));
        this.switchTumbler.addEventListener('click', (event) => this.createSwitch(event));
        this.wordCardStartBtn.addEventListener('click', () => this.createStartGame());
        this.wordRepeat.addEventListener(('click'), () => this.createWordRepeat());
        this.wordCardsImage.forEach((element) => element.addEventListener('click', (event) => this.createPlayGame(event)));
        this.navStatsButton.addEventListener('click', (event) => this.generateStats(event));
        this.statsDifficultBtn.addEventListener('click', () => this.createDifficultCards());
        this.statsResetBtn.addEventListener('click', () => this.createResetStats());
    }

    createSwitch = () => {
        if (!this.isGameMode) {
            this.switchType.innerHTML = 'PLAY';
            this.mainCardsLink.forEach((element) => {
                const el = element;
                el.style = 'background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);';
            });

            this.wordCardsInfo.forEach((element) => {
                const el = element;
                el.style.display = 'none';
            });

            this.wordCardStartBtn.style.display = 'block';
            this.wordRepeat.style.display = 'none';

            this.isGameMode = true;

            return;
        }

        if (this.isGameMode) {
            this.switchType.innerHTML = 'TRAIN';
            this.mainCardsLink.forEach((element) => {
                const el = element;
                el.style = 'background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)';
            });

            this.wordCardsInfo.forEach((element) => {
                const el = element;
                el.style.display = 'flex';
            });

            this.wordCardStartBtn.style.display = 'none';
            this.wordRepeat.style.display = 'none';

            this.isGameMode = false;
            this.isResult = false;
        }

        document.querySelectorAll('.word-cards_wrong').forEach((element) => {
            element.remove();
        });
        document.querySelectorAll('.word-cards_correct').forEach((element) => {
            element.remove();
        });
        this.wordCardsImage.forEach((element) => {
            const el = element;
            el.style = 'pointer-events: auto';
            el.style.opacity = '1';
        });

        this.countMistakes = 0;
    }

    filterLink = (event) => {
        const targetPage = event.target.closest('.main-cards_link');

        this.currentMainCardIndex = 0;
        this.mainCardsState.forEach((item, index) => {
            if (targetPage.getAttribute('href').slice(1) === item) {
                this.currentMainCardIndex = index;
            }
        });

        this.shuffleWordCards();
        this.createWordCards(this.currentMainCardIndex);
    }

    createNavMenuLink = (event) => {
        const targetNav = event.target;
        this.mainWarp.classList.remove('main_hide');
        this.statsWrapper.classList.remove('stats_active');
        if (document.querySelector('.active')) {
            document.querySelector('.active').classList.remove('active');
        }

        if (targetNav.getAttribute('href').slice(1) === 'Main Page') {
            this.wordCardsWrapper.remove();
            this.mainWarp.appendChild(this.mainCardsWrapper);
            targetNav.classList.add('active');
            this.wordRepeat.style.display = 'none';
            this.countMistakes = 0;

            document.querySelectorAll('.word-cards_wrong').forEach((element) => {
                element.remove();
            });
            document.querySelectorAll('.word-cards_correct').forEach((element) => {
                element.remove();
            });
            this.wordCardsImage.forEach((element) => {
                const el = element;
                el.style = 'pointer-events: auto';
                el.style.opacity = '1';
            });

            if (this.isGameMode) {
                this.wordCardStartBtn.style.display = 'block';
            } else {
                this.wordCardStartBtn.style.display = 'none';
            }
            this.isResult = false;

            return;
        }

        this.currentMainCardIndex = 0;
        this.mainCardsState.forEach((item, index) => {
            if (targetNav.getAttribute('href').slice(1) === item) {
                this.currentMainCardIndex = index;
                targetNav.classList.add('active');
            } else {
                targetNav.classList.add('active');
            }
        });

        if (this.isGameMode) {
            this.wordCardStartBtn.style.display = 'block';
        } else {
            this.wordCardStartBtn.style.display = 'none';
        }

        document.querySelectorAll('.word-cards_wrong').forEach((element) => {
            element.remove();
        });
        document.querySelectorAll('.word-cards_correct').forEach((element) => {
            element.remove();
        });
        this.wordCardsImage.forEach((element) => {
            const el = element;
            el.style = 'pointer-events: auto';
            el.style.opacity = '1';
        });

        this.countMistakes = 0;
        this.isResult = false;
        this.wordRepeat.style.display = 'none';
        this.shuffleWordCards();
        this.createWordCards(this.currentMainCardIndex);
    }

    createWordCards = (currentMainCardIndex) => {
        this.mainCardsWrapper.remove();

        this.mainWarp.appendChild(this.wordCardsWrapper);

        this.wordCardsList.forEach((element, index) => {
            const el = element;
            el.querySelector('.word-cards_image').src = `${this.cardData[currentMainCardIndex][index].image}`;
            el.querySelector('.word-cards_name').innerText = `${this.cardData[currentMainCardIndex][index].word}`;
            el.querySelector('.word-cards_name_translate').innerText = `${this.cardData[currentMainCardIndex][index].translation}`;
        });
    }

    shuffleWordCards = () => {
        this.cardData.forEach((element) => element.sort(() => Math.random() - 0.5));
    }

    wordCardPlay = (event) => {
        if (!this.isGameMode) {
            const targetWordCard = event.target.closest('.word-cards_image');
            if (targetWordCard === null) return;
            const atr = targetWordCard.getAttribute('src').slice(17, -4);

            this.cardsAudio.src = `../assets/audio/${atr}.mp3`;
            this.cardsAudio.play();

            let currentTrainWord = 0;
            for (let i = 0; i < this.cardData.length; i += 1) {
                for (let k = 0; k < this.cardData[i].length; k += 1) {
                    if (atr === this.cardData[i][k].word) {
                        currentTrainWord = k;
                    }
                }
            }
            this.cardData[this.currentMainCardIndex][currentTrainWord].clicks += 1;
        }
    }

    createRotateBtn = (event) => {
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

    createStartGame = () => {
        this.wordCardStartBtn.style.display = 'none';
        this.wordRepeat.style.display = 'block';
        this.isResult = true;

        const wordFormat = this.cardData.length;

        this.generateRndSound = [];
        this.index = 0;
        while (this.generateRndSound.length < wordFormat) {
            const rndNumber = Math.floor(Math.random() * wordFormat - 1) + 1;
            if (this.generateRndSound.indexOf(rndNumber) === -1) {
                this.generateRndSound.push(rndNumber);
            }
        }

        this.cardsStartSound();
    }

    cardsStartSound = () => {
        const currentSound = this.generateRndSound;
        if (this.index < this.cardData.length) {
            this.index += 1;
        }

        this.cardsAudio.src = `${this.cardData[this.currentMainCardIndex][currentSound[this.index - 1]].audioSrc}`;
        this.cardsAudio.play();
    }

    createWordRepeat = () => {
        this.cardsAudio.play();
    }

    createPlayGame = (event) => {
        if (this.isResult) {
            const correctResult = document.createElement('div');
            const wrongResult = document.createElement('div');
            const targetImage = event.target;
            correctResult.classList.add('word-cards_correct');
            wrongResult.classList.add('word-cards_wrong');
            correctResult.style.backgroundImage = 'url(\'../assets/images/star-win.svg\')';
            wrongResult.style.backgroundImage = 'url(\'../assets/images/star.svg\')';
            const currentImage = event.target.getAttribute('src').slice(17, -4);
            const currentAudio = this.cardsAudio.src.slice(this.cardsAudio.src.indexOf('audio') + 6, -4);

            let findCurrentWord = 0;
            for (let i = 0; i < this.cardData.length; i += 1) {
                for (let k = 0; k < this.cardData[i].length; k += 1) {
                    if (currentImage === this.cardData[i][k].word) {
                        findCurrentWord = k;
                    }
                }
            }

            if (currentImage === currentAudio || currentAudio === 'failure' || currentAudio === 'success') {
                if (document.querySelectorAll('.word-cards_correct').length === 7) {
                    this.createFinishGame();
                } else {
                    this.wordCardsResult.appendChild(correctResult);
                    new Audio('../assets/audio/correct.mp3').play();
                    targetImage.style = 'pointer-events: none';
                    targetImage.style.opacity = '0.3';
                    this.cardData[this.currentMainCardIndex][findCurrentWord].correct += 1;
                    setTimeout(this.cardsStartSound, 1000);
                }
            } else if (currentImage !== currentAudio) {
                this.wordCardsResult.appendChild(wrongResult);
                new Audio('../assets/audio/error.mp3').play();
                this.countMistakes += 1;
                this.cardData[this.currentMainCardIndex][findCurrentWord].wrong += 1;
            }
        }
    }

    createFinishGame = () => {
        this.mainWarp.style.display = 'none';
        const mistakes = document.createElement('h2');
        const correct = document.createElement('img');
        const wrong = document.createElement('img');

        if (document.querySelectorAll('.word-cards_wrong').length > 0) {
            this.main.appendChild(mistakes).classList.add('mistakes');
            mistakes.innerText = `Mistakes: ${this.countMistakes}`;
            this.main.appendChild(wrong).classList.add('finish_wrong');
            this.cardsAudio.src = '../assets/audio/failure.mp3';
            this.cardsAudio.play();
        } else {
            this.main.appendChild(correct).classList.add('finish_correct');
            this.cardsAudio.src = '../assets/audio/success.mp3';
            this.cardsAudio.play();
        }

        setTimeout(() => {
            this.mainWarp.style.display = 'block';
            this.wordCardStartBtn.style.display = 'block';
            this.wordRepeat.style.display = 'none';
            this.wordCardsWrapper.remove();
            this.mainWarp.appendChild(this.mainCardsWrapper);
            this.isResult = false;
            this.countMistakes = 0;

            document.querySelectorAll('.word-cards_wrong').forEach((element) => {
                element.remove();
            });
            document.querySelectorAll('.word-cards_correct').forEach((element) => {
                element.remove();
            });
            this.wordCardsImage.forEach((element) => {
                const el = element;
                el.style = 'pointer-events: auto';
                el.style.opacity = '1';
            });

            mistakes.remove();
            wrong.remove();
            correct.remove();
        }, 3000);
    }

    generateStats = () => {
        this.statsWrapper.classList.toggle('stats_active');
        this.mainWarp.classList.toggle('main_hide');
        this.wordStatsContainer.innerHTML = '';

        for (let i = 0; i < this.cardData.length; i += 1) {
            for (let k = 0; k < this.cardData[i].length; k += 1) {
                const cellTable = document.createElement('tr');
                const category = document.createElement('td');
                const word = document.createElement('td');
                const translate = document.createElement('td');
                const clicks = document.createElement('td');
                const correct = document.createElement('td');
                const mistakes = document.createElement('td');
                const errors = document.createElement('td');
                const countRight = this.cardData[i][k].correct;
                const countError = this.cardData[i][k].wrong;

                category.innerText = this.mainCardsState[i];
                word.innerText = this.cardData[i][k].word;
                translate.innerText = this.cardData[i][k].translation;
                clicks.innerText = this.cardData[i][k].clicks;
                correct.innerText = countRight;
                mistakes.innerText = countError;

                if (countError > 0) {
                    errors.innerText = ((countError / (countError + countRight)) * 100).toFixed(1);
                } else {
                    errors.innerText = 0;
                }

                cellTable.appendChild(category);
                cellTable.appendChild(word);
                cellTable.appendChild(translate);
                cellTable.appendChild(clicks);
                cellTable.appendChild(correct);
                cellTable.appendChild(mistakes);
                cellTable.appendChild(errors);
                this.wordStatsContainer.appendChild(cellTable);
            }
        }

        this.isGetState = true;
        localStorage.setItem('stats', JSON.stringify(this.cardData));
        localStorage.setItem('flag', JSON.stringify(this.isGetState));
    }

    createResetStats = () => {
        const parseState = this.cardData.flat();
        for (let i = 0; i < parseState.length; i += 1) {
            parseState[i].clicks = 0;
            parseState[i].correct = 0;
            parseState[i].wrong = 0;
        }
        document.querySelector('.nav-stats').classList.remove('active');
        this.generateStats();
    }

    createDifficultCards = () => {
        this.statsWrapper.classList.toggle('stats_active');
        this.mainWarp.classList.toggle('main_hide');
        this.mainWarp.appendChild(this.wordCardsWrapper);
    }
}
