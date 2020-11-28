import '../styles/scss/main.scss';
import cardData from './cards';

console.log(cardData);
document.body.insertAdjacentHTML('beforeend', `<img src="${cardData[8][0].image}">`)
const ready = (callback) => {
    if (document.readyState !== 'loading') callback();
    else document.addEventListener('DOMContentLoaded', callback);
};

ready(() => {
    document.querySelector('.first-button').addEventListener('click', () => {
        document.querySelector('.animated-icon1').classList.toggle('open');
    });
});
