const cards = document.querySelector('.cards'); // Блок карточек
const price = document.querySelector('.price'); // Цены в карточках
const amount = document.querySelector('.amount'); // Возраст в карточках
const likeBlock = document.querySelector('.overlow__like'); // Всплывающий блок, в избранное
const unLikeBlock = document.querySelector('.overlow__unlike'); // Всплывающий блок, удалить из избранное
timerLike = null;
const upArrow = document.querySelector('#upArrow'); // Кнопка вверх

render = (param) => {
    let card = document.createElement('div');
    card.classList.add("card");
    card.innerHTML = `
        <div class="card__img">
            <img src=${param.src}>
            <svg width="46" height="42" viewBox="0 0 46 42" fill="none">
                <path class="like"
                    d="M33.7812 0.695312C31.2851 0.695312 28.9966 1.4863 26.9794 3.04634C25.0456 4.54197 23.758 6.44693 23 7.83214C22.242 6.44684 20.9544 4.54197 19.0206 3.04634C17.0034 1.4863 14.7149 0.695312 12.2188 0.695312C5.25298 0.695312 0 6.39293 0 13.9485C0 22.1112 6.55347 27.696 16.4746 36.1505C18.1593 37.5863 20.0689 39.2138 22.0538 40.9494C22.3154 41.1785 22.6514 41.3047 23 41.3047C23.3486 41.3047 23.6846 41.1785 23.9462 40.9495C25.9312 39.2136 27.8408 37.5862 29.5265 36.1496C39.4465 27.696 46 22.1112 46 13.9485C46 6.39293 40.747 0.695312 33.7812 0.695312Z"
                    fill="white" />
            </svg>
            <div class=${param.discount}>-40%</div>
        </div>
        <div class="card__descr">
        <div class="card__title">${param.name}</div>
        <div class="card__specific">
            <div class="card__specific-descr">${param.color} <br>окрас</div>
            <div>
                <div class="card__specific-amount card__amount">${param.amount}</div>
                <div class="card__specific-descr">Возраст</div>
            </div>
            <div>
                <div class="card__specific-amount">4</div>
                <div class="card__specific-descr">Кол-во лап</div>
            </div>
        </div>
        <div class="card__price">${param.price}</div>
        </div>
        <button type="submit" class="button_buy ${param.disabled ? "disabled" : ''}" ${param.disabled ? "disabled" : ''}>
            ${param.disabled ? 'Продан' : 'Купить'}
        </button>
    `;
    cards.appendChild(card);
}

render({
    src: 'img/cards/cat1.jpg',
    discount: 'discount',
    name: 'Кот полосатый',
    color: 'Коричневый',
    amount: '2',
    price: '30 000',
    disabled: false
});
render({
    src: 'img/cards/cat2.jpg',
    discount: 'none',
    name: 'Кот полосатый',
    color: 'Коричневый',
    amount: '4',
    price: '40 000',
    disabled: false
});
render({
    src: 'img/cards/cat3.jpg',
    discount: 'none',
    name: 'Кот полосатый',
    color: 'Коричневый',
    amount: '3',
    price: '20 000',
    disabled: true
});
render({
    src: 'img/cards/cat1.jpg',
    discount: 'none',
    name: 'Кот полосатый',
    color: 'Коричневый',
    amount: '2.5',
    price: '25 000',
    disabled: false
});
render({
    src: 'img/cards/cat3.jpg',
    discount: 'none',
    name: 'Кот полосатый',
    color: 'Коричневый',
    amount: '6',
    price: '30 000',
    disabled: true
});
render({
    src: 'img/cards/cat1.jpg',
    discount: 'none',
    name: 'Кот полосатый',
    color: 'Коричневый',
    amount: '1',
    price: '10 000',
    disabled: false
});

// Фильтры
price.addEventListener('click', () => sort({ parametrClicked: price, className: '.card__price' }));
amount.addEventListener('click', () => sort({ parametrClicked: amount, className: '.card__amount' }));

const sort = ({ parametrClicked, className }) => {
    parametrClicked.classList.toggle('active');
    if (parametrClicked === price) {
        amount.classList.remove('active');
    } else {
        price.classList.remove('active');
    }
    cardAll = document.querySelectorAll('.card');
    const sorted = [...cardAll].sort((a, b) => {
        const priceA = a.querySelector(className);
        const priceB = b.querySelector(className);
        const getPrice = (el) => parseFloat(el.innerHTML);
        if (parametrClicked.classList.contains('active')) {
            return getPrice(priceA) - getPrice(priceB);
        }
        return getPrice(priceB) - getPrice(priceA);
    });
    cards.innerHTML = null;
    sorted.forEach(el => cards.appendChild(el));
}

// Добавить в избранное
cards.addEventListener('click', (e) => {
    const likeAll = document.querySelectorAll('.like');
    likeAll.forEach(like => {
        if (e.target === like) {
            clearTimeout(timerLike);
            removeClass();
            if (!like.classList.contains('like_active')) {
                likeBlock.classList.add('overlow_active');
            } else {
                unLikeBlock.classList.add('overlow_active');
            }
            like.classList.toggle('like_active');

            timerLike = setTimeout(() => removeClass(), 2200)
        }
        function removeClass() {
            likeBlock.classList.remove('overlow_active');
            unLikeBlock.classList.remove('overlow_active');
        }
    })
})

const formSubscribe = document.querySelector('.mailing__form');
formSubscribe.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('.mailing__input').value;
    let message = document.querySelector('.mailing__message');
    message.classList.add('show');
    message.classList.remove('none');
    if (!email) {
        message.innerHTML = `Введите email`;
        return false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        message.innerHTML = `Неверный email`;
        return false;
    } else {
        message.innerHTML = `Сообщение отправлено`;
        return true;
    }
})

function scrollTo(to, duration = 700) {
    const
        element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date(),
        easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },
        animateScroll = function () {
            const currentDate = +new Date();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
            else {
                element.scrollTop = to;
            }
        };
    animateScroll();
}
window.addEventListener('scroll', () => {
    upArrow.hidden = (window.pageYOffset < document.documentElement.clientHeight / 2);
});

upArrow.addEventListener('click', (e) => {
    scrollTo(0, 400);
})


const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('menu_active');
    hamburger.classList.toggle('hamburger_active');
});
