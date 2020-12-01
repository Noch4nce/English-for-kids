const ready = (callback) => {
    if (document.readyState !== 'loading') callback();
    else document.addEventListener('DOMContentLoaded', callback);
};

ready(() => {
    document.querySelector('.first-button').addEventListener('click', () => {
        document.querySelector('.animated-icon1').classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach((element) => {
        element.addEventListener('click', () => {
            document.querySelector('.animated-icon1').classList.remove('open');
            document.querySelector('.show').classList.remove('show');
        });
    });
});
