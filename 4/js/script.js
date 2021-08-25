const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      close = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

close.addEventListener('click', () => {
    menu.classList.remove('active');
});

const value = document.querySelectorAll('.skills__progress-value'),
      lines = document.querySelectorAll('.skills__progress-line-bg');

value.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});