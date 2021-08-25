const tabsParent = document.querySelector('.tabs');
const tabsList = document.querySelectorAll('.tab');
const tabsContent = document.querySelectorAll('.menu-company__content');

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav');

tabsParent.addEventListener('click', e => {
    tabsList.forEach((tab, i) => {
        if (e.target == tab) {
            tabsContent.forEach(item => {
                removeClass(item, 'menu-company__content_active');
            });
            tabsList.forEach(item => {
                removeClass(item, 'tab_active');
            });
            addClass(tabsContent[i], 'menu-company__content_active');
            addClass(tab, 'tab_active');
        }
    });
    
});

hamburger.addEventListener('click', () => {
    menu.classList.toggle('nav_active');
    hamburger.classList.toggle('hamburger_active');
});

function addClass(element, classA) {
    element.classList.add(classA);
}
function removeClass(element, classR) {
    element.classList.remove(classR);
}
