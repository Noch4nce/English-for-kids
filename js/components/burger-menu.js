const ready = (callback) => {
    if (document.readyState !== 'loading') callback();
    else document.addEventListener('DOMContentLoaded', callback);
};

ready(() => {
    document.querySelector('.first-button').addEventListener('click', () => {
        document.querySelector('.animated-icon1').classList.toggle('open');
    });
});
