$(document).ready(function () {
  $("a.scrollto").click(function () {
    elementClick = $(this).attr("href")
    destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination - 90 }, 800);
    close();
    return false;
  });
});

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', (close));

function close() {
  menu.classList.toggle('menu_active');
  hamburger.classList.toggle('hamburger_active');
}
function addClass(element, classA) {
  element.classList.add(classA);
}
function removeClass(element, classR) {
  element.classList.remove(classR);
}