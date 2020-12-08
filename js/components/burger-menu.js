const ready = (callback) => {
    if (document.readyState !== 'loading') callback();
    else document.addEventListener('DOMContentLoaded', callback);
};

const navButton = document.querySelector('.navbar-toggler');
const navBar = document.querySelector('.navbar-nav');
const overlay = document.querySelector('.overlay');

const navClick = () => {
    navBar.classList.toggle('nav-active');
    overlay.classList.toggle('overlay_active');
    document.querySelector('.animated-icon1').classList.toggle('open');
    document.querySelector('.collapse').classList.toggle('show');
};

ready(() => {
    document.querySelectorAll('.nav-link').forEach((element) => {
        element.addEventListener('click', () => {
            document.querySelector('.animated-icon1').classList.remove('open');
            document.querySelector('.navbar-nav').classList.remove('nav-active');
            document.querySelector('.overlay_active').classList.remove('overlay_active');
        });
    });
});

navButton.addEventListener('click', () => navClick());
overlay.addEventListener('click', () => navClick());
// document.querySelector('.nav-stats').addEventListener('click', () => navClick());
