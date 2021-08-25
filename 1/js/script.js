// $(document).ready(function(){
//     $('ul.tabs').on('click', 'li:not(.tab_active)', function() {
//         $(this)
//           .addClass('tab_active').siblings().removeClass('tab_active')
//           .closest('div.form__content').find('form.form__input').removeClass('form__input_active').eq($(this).index()).addClass('form__input_active');
//     });

//     $('ul.tabs-less').on('click', 'li:not(.tab_active)', function() {
//         $(this)
//           .addClass('tab_active').siblings().removeClass('tab_active')
//           .closest('div.form-lessons__content').find('div.form-lessons_cards').removeClass('form-lessons_cards_active').eq($(this).index()).addClass('form-lessons_cards_active');
//     });

//     $('ul.tabs-time').on('click', 'li:not(.tab_active)', function() {
//         $(this)
//           .addClass('tab_active').siblings().removeClass('tab_active')
//           .closest('div.form-lessons__content').find('div.card_price').toggleClass('card_price_active')
//           .closest('div.form-lessons__content').find('div.card_descr').toggleClass('card_descr_active');
//     });

//     $('ul.history__line_items').on('click', 'li:not(.history__line_item_active)', function() {
//         $(this)
//           .addClass('history__line_item_active').siblings().removeClass('history__line_item_active')
//           .closest('section.history').find('div.history__slider').removeClass('history__slider_active').eq($(this).index()).addClass('history__slider_active');
//     });

//     $('[data-modal=trial]').on('click', function(){
//         $('.overlay, #trial').fadeIn('slow');
//     });

//     $('[data-modal=buy]').on('click', function(){
//         $('.overlay, #buy').fadeIn('slow');
//     });

//     $('[data-modal=pay]').on('click', function(){
//         $('.overlay, #pay').fadeIn('slow');
//     });

//     $('.close').on('click', function() {
//         $('.overlay, #pay, #trial, #buy').fadeOut('slow')
//     });


//     $('.button_card').each(function(i) {
//         $(this).on('click', function() {
//             $('#buy .form__subtitle').text($('.card_descr_active').eq(i).text());
//             $('.overlay, #buy').fadeIn('slow');
//             $('#buy .form__amount span').text($('.card_price_active').eq(i).text());
//             $('.overlay, #buy').fadeIn('slow');
//         });
//     });
// });

// Menu

const menu = document.querySelector('.header__links'),
      hamburger = document.querySelector('.hamburger');

function toggleMenu () {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('header__links_active');
}

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

document.body.addEventListener('click', (e) => {
    const target = e.target,
          itsMenu = target == menu,
          itsHamb = target == hamburger,
          menuActive = menu.classList.contains('header__links_active');

    
    if (!itsMenu && !itsHamb && menuActive) {
        toggleMenu();
    }
});

// Tabs

const tabsAll = document.querySelectorAll('.tabs');

tabsAll.forEach((tabs) => {
    tabs.addEventListener('click', (e) => {
        const tab = tabs.querySelectorAll('.tab'),
              tabsParent = tabs.parentElement,
              tabContentName = tabsParent.lastElementChild.className.split(' ')[0],
              tabContent = tabsParent.querySelectorAll(`.${tabContentName}`);
        tab.forEach((item, i) => {    
            if (e.target == item) {
                tab.forEach((item) => {
                    item.classList.remove('tab_active');
                });  
                if (tabs.classList.contains('tabs-time')) {
                    tabContent.forEach((item) => {
                        item.classList.remove(`${tabContentName}_active`);
                    });
                    item.classList.add('tab_active');
                    tabContent[i + 2].classList.add(`${tabContentName}_active`);
                } else {
                    tabContent.forEach((item) => {
                        item.classList.remove(`${tabContentName}_active`);
                    });
                    item.classList.add('tab_active');
                    tabContent[i].classList.add(`${tabContentName}_active`);
                }
            }
        });
    });
});

// Slide

if (document.querySelector('.history__line')) {
    const sliderParent = document.querySelector('.history__line'),
          slider = sliderParent.querySelectorAll('.history__line_item'),
          sliderContent = document.querySelectorAll('.history__slider');

    sliderParent.addEventListener('click', (e) => {
        slider.forEach((item, i) => {
            item.classList.remove('history__line_item_active');
            if (e.target == item) {
                item.classList.add('history__line_item_active');
                sliderContent.forEach((item) => {
                    item.classList.remove('history__slider_active');
                });
                sliderContent[i].classList.add('history__slider_active');
            }
        });
    });
}


// Modal

function modal(btnSel, modalSel) {
    const btn = document.querySelectorAll(btnSel),
          overlay = document.querySelector('.overlay'),
          modalName = overlay.querySelector(modalSel),
          closeModal = modalName.querySelector('[data-close]');

    btn.forEach((item) => {
        item.addEventListener('click', () => {
            overlay.style.display = 'block';
            modalName.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        closeModalFunc();
    });
    

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModalFunc();
        }
    });

    function closeModalFunc() {
        overlay.style.display = 'none';
        modalName.style.display = 'none';
    }
}

modal('[data-modal="trial"]', '#trial');
modal('[data-modal="pay"]', '#pay');
modal('[data-modal="buy"]', '#buy');



