'use strict';

(function() {
    var mobileToggle = document.querySelector('.page-header__toggle');
    var navSite = document.querySelector('.site-nav');

    document.addEventListener("DOMContentLoaded", function(e) {
        e.preventDefault();
        if(navSite.classList.contains("site-nav--nojs")) {
            navSite.classList.remove("site-nav--nojs");
        }
    });

    mobileToggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (navSite.classList.contains('site-nav--closed')) {
            navSite.classList.remove('site-nav--closed');
            navSite.classList.add('site-nav--opened');
            mobileToggle.classList.add('page-header__toggle--opened');
        } else {
            navSite.classList.add('site-nav--closed');
            navSite.classList.remove('site-nav--opened');
            mobileToggle.classList.add('page-header__toggle--opened');
        }
    });

    // window.addEventListener("keydown", function(evt) {
    //     if (evt.keyCode === 27) {
    //       if (menu.classList.contains("main-nav--show")) {
    //         menu.classList.remove("main-nav--show");
    //       }
    //     }
    // });
})();

