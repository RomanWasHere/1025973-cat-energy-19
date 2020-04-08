var mobileToggle = document.querySelector('.page-header__toggle');
var navSite = document.querySelector('.site-nav');

navSite.classList.remove('site-nav--nojs');

mobileToggle.addEventListener('click', function () {
    if (navSite.classList.contains('site-nav--closed')) {
        navSite.classList.remove('site-nav--closed')
        navSite.classList.add('site-nav--opened')
    } else {
        navSite.classList.add('site-nav--closed')
        navSite.classList.remove('site-nav--opened')
    }
})