const tabsConteiner = document.querySelector('.tasks__tabs'); // Таб-контейнер
const tabs = document.querySelectorAll('.tab'); // Табы
const listsTasks = document.querySelectorAll('.tasks__list'); // Все списки задач
const buttonAddElement = document.querySelector('.button:not(.hide)'); // Кнопка - добавить элемент
const buttonChange = document.querySelectorAll('.js-button'); // Кнопки - сохранить, отменить
const inputName = document.querySelector('.form input[name = "name"]'); // Поля ввода
const inputDate = document.querySelector('.form input[name = "date"]'); 
const inputMoney = document.querySelector('.form input[name = "money"]'); 
const overlay = document.querySelector('.overlay');
const footer = document.querySelector('.add'); // Подвал
const findTask = document.querySelector('.find input');

let balanceItems = document.querySelectorAll('.balance__money');
let balanceSum = document.querySelector('.to-do__sum');

let selectValue = document.querySelector('select'); // Выбор валюты
let simvol = ''; // Сивол валюты

// Local Storage
let toDO = [];
let selectSave;
if (localStorage.todo) {
    toDO = JSON.parse(localStorage.getItem("todo"));
}
if (localStorage.select) {
    selectValue.options[localStorage.getItem('select')].selected = true;
}
function funcCall (func) {
    if (selectValue.value == 'Рубль') {
        simvol = '₽';
        func('sumRub');
    }
    if (selectValue.value == 'Доллар') {
        simvol = '$';
        func('sumUsd');
    }
    if (selectValue.value == 'Евро') {
        simvol = '€';
        func('sumEur');
    }
    if (selectValue.value == 'Юань') {
        simvol = '¥';
        func('sumChy');
    }
}
funcCall(showToDoLocal);
funcCall(balance);
clickedButton();
selectCurrency();

tabsConteiner.addEventListener('click', event => { // Табы
    tabs.forEach((elem, i) => {
        if (event.target == elem) {
            removeClass(tabs, 'tab-active');
            removeClass(listsTasks, 'tasks__list-active');
            addClass(listsTasks[i], 'tasks__list-active');
            addClass(elem, 'tab-active');
            // Для второго таба
            removeClass(footer, 'opacity');
            if (i == 2) { addClass(footer, 'opacity'); }
        }
    });
});

function clickedButton() { // Клик по кнопке "Добавить элемент"
    buttonAddElement.addEventListener('click', e => {
        if (inputName.value && inputDate.value && inputMoney.value) {
            e.preventDefault();
            const listTaskActive = document.querySelector('.tasks__list-active');
            let temp = {};
            let index;

            listsTasks.forEach((item, i) => {
                if (listTaskActive == item) {
                    index = i;
                }
            });

            addHTML(inputName.value, inputDate.value, inputMoney.value, listTaskActive);
            addHTML(inputName.value, inputDate.value, inputMoney.value, listsTasks[2], index);
            addClass(buttonChange);
            
            temp.indexList = index;
            temp.name = `${inputName.value}`;
            temp.date = `${inputDate.value}`;
            temp.sum = calcCurs(inputMoney.value);

            toDO.push(temp);
            localStorage.setItem("todo", JSON.stringify(toDO));
            funcCall(balance);

            inputClean();
        }
    });
}

function addHTML(value1, value2, value3, tasksList, index) { // Добавление разметки
    let div = document.createElement('div');
    div.classList.add('task');
    if (index == 0 && tasksList == listsTasks[2]) {
        div.classList.add('green');
    } else if (index == 1 && tasksList == listsTasks[2]) {
        div.classList.add('red');
    }
    let date = splitAndJoin(value2, '-', '.');
    addElement(div, value1, date, value3);
    if (tasksList != listsTasks[2]) {
        div.insertAdjacentHTML('beforeend',
        `<div class="task__icons">
            <i class="fa fa-pencil" aria-hidden="true"></i>
            <i class="fa fa-trash-o" aria-hidden="true"></i>
        </div>`);
    }
        
    tasksList.appendChild(div);
    div.addEventListener('click', e => {
        followIcons(div, e);
    });
}

function addElement(element, value1, value2, value3) { // Добавить элемент
    element.innerHTML = `
    <div class="task__text">
        <div class="task__name">${value1}</div>
        <div class="task__date">${value2}</div>
        <div class="task__sum">${(+value3).toFixed(0) + simvol}</div>
    </div>`;
}


function followIcons(divParent, e) { //  Обработка клика по иконкам
    const tasksContent = document.querySelector('.tasks'); // Контент панели
    const iconsChange = divParent.querySelector('.fa-pencil'); // Иконка "Изменить" в активном элементе
    const iconsRemove = divParent.querySelector('.fa-trash-o'); // Иконка "Удалить" в активном элементе
    const iconsAll = document.querySelector('.tasks__list-active').querySelectorAll('.fa-trash-o'); // Все иконки "Удалить" в активном списке
    let name = divParent.querySelector('.task__name');
    let date = divParent.querySelector('.task__date');
    let sum =  divParent.querySelector('.task__sum');
    let index;
    let indexItem;

    e.stopPropagation();

    listsTasks.forEach((item, i) => { // index активного таба
        if (divParent.parentElement == item) {
            index = i;
        }
    });
    iconsAll.forEach((item, i) => { // index выбранного элемента
        if (item == iconsRemove) {
            indexItem = i;
        }
    });
    if (iconsRemove == e.target) {// Клик по кнопке "Удалить"
        divParent.remove();
        changeLocal(index, indexItem, 'remove');
        funcCall(balance);
    }
    if (iconsChange == e.target) { // Клик по кнопке "Изменить"
        inputName.value = name.innerHTML; // Записать данные в Input-ы
        inputDate.value = splitAndJoin(date.innerHTML, '.', '-');
        inputMoney.value = sum.innerHTML.slice(0, -1);
        removeClass(buttonChange, 'hide');
        overlay.style.height = `${tasksContent.scrollHeight}px`;
        overlay.classList.add('overlay-active');
        
        document.body.addEventListener('click', clickWrapper); // Обработка клика при overlay
    } 
    function clickWrapper(e) {
        e.preventDefault();
        if (e.target == buttonChange[0].firstChild) { // Если нажата кнопка "Сохранить"
            name.innerHTML =  inputName.value;
            date.innerHTML = splitAndJoin(inputDate.value, '-', '.');
            sum.innerHTML =  `${inputMoney.value}$`;
            changeLocal(index, indexItem, 'change', inputName.value, inputDate.value, inputMoney.value);
            removeEvent();
            inputClean();
            funcCall(balance);
        } else if (e.target != inputName && e.target != inputDate && e.target != inputMoney) {
            removeEvent();
            inputClean();
        }
        
    }
    function removeEvent() { // Удалить обработчик
        document.body.removeEventListener('click', clickWrapper);
        addClass(buttonChange, 'hide');
        overlay.classList.remove('overlay-active');
    }
}

function changeLocal(index, indexItem, operation, ...name) { // Работа с Local Storage и 2-ым табом
    toDO = JSON.parse(localStorage.getItem("todo"));
    
    const taksInTaskAll = listsTasks[2].querySelectorAll('.task'); // Все задачи со 2-го таба
    let count = 0; // Счётчик задач у активного таба
    toDO.forEach((item, i) => {
        if (item.indexList == index) { // Таб 1 или таб 2
            if (count == indexItem) { // Индекс в БД = индекс элемента
                if (operation == 'remove') {
                    toDO.splice(i, 1); // Удалить из БД и со 2-го таба
                    taksInTaskAll[i].remove();
                }
                if (operation == 'change') {
                    toDO[i].name = name[0]; // Изменить в БД
                    toDO[i].date = name[1];
                    toDO[i].sum = calcCurs(name[2]);
                    
                    addElement( taksInTaskAll[i], name[0], splitAndJoin(name[1], '-', '.'), name[2]); // Изменить у 2-го таба
                }
            }
            count++;
        }
    });

    localStorage.setItem("todo", JSON.stringify(toDO));
}

function showToDoLocal(currency) { // Показ контента после перезагрузки
    const tasksAll = document.querySelectorAll('.task');
    tasksAll.forEach(item => {
        item.remove();
    });
    toDO.forEach((item, i) => {
        if (item.indexList == 0) {
            addHTML(item.name, item.date, item.sum[currency], listsTasks[0]);
        } else if (item.indexList == 1) {
            addHTML(item.name, item.date, item.sum[currency], listsTasks[1]);
        }
        addHTML(item.name, item.date, item.sum[currency], listsTasks[2], item.indexList);
    });
}

function balance(currency) { // Отображение баланса актуального
    let income = toDO.filter(item => item.indexList == 0).reduce((s, i) => s = +s + +i.sum[currency], 0);
    let expense = toDO.filter(item => item.indexList == 1).reduce((s, i) => s = +s + +i.sum[currency], 0);

    balanceItems[0].innerHTML = `${Math.floor(income) + simvol}`;
    balanceItems[1].innerHTML = `${Math.floor(expense) + simvol}`;
    balanceSum.innerHTML = `${Math.floor(income- expense) + simvol}`;
}

function selectCurrency() { // Селект
    selectValue.addEventListener('change', () => {
        funcCall(showToDoLocal);
        funcCall(balance);
        localStorage.setItem("select", selectValue.options.selectedIndex);
    });
}

function findFunc() {
    findTask.oninput = function() {
        let value = this.value.toLowerCase();
        let tasks = document.querySelectorAll('.task__name');
        
        tasks.forEach(item => {
            if (!item.innerHTML.toLowerCase().includes(value)) {
                addClass(item.parentElement.parentElement, 'hide');
            } else {
                removeClass(item.parentElement.parentElement, 'hide');
            }
        });
    };
}

findFunc();

function calcCurs(value) { // Объект в LS с курсом валют
    let temp = {};
    let RU = 73.4, RE = 86.5, RC = 11.3, UE = 1.18, UC = 0.15, EC = 0.13;
    if (selectValue.value == 'Рубль') {
        temp.sumRub = `${value}`;
        temp.sumUsd = `${(+value / RU).toFixed(5)}`;
        temp.sumEur = `${(+value / RE).toFixed(5)}`;
        temp.sumChy = `${(+value / RC).toFixed(5)}`;
    }
    if (selectValue.value == 'Доллар') {
        temp.sumRub = `${(+value * RU).toFixed(5)}`;
        temp.sumUsd = `${value}`;
        temp.sumEur = `${(+value / UE).toFixed(5)}`;
        temp.sumChy = `${(+value / UC).toFixed(5)}`;
    }
    if (selectValue.value == 'Евро') {
        temp.sumRub = `${(+value * RE).toFixed(5)}`;
        temp.sumUsd = `${(+value * UE).toFixed(5)}`;
        temp.sumEur = `${value}`;
        temp.sumChy = `${(+value / EC).toFixed(5)}`;
    }
    if (selectValue.value == 'Юань') {
        temp.sumRub = `${(+value * RC).toFixed(5)}`;
        temp.sumUsd = `${(+value / UE).toFixed(5)}`;
        temp.sumEur = `${(+value * EC).toFixed(5)}`;
        temp.sumChy = `${value}`;
    }
    return temp;
}

function addClass(elements, classAdd) {
    if (typeof elements[Symbol.iterator] === 'function') {
        elements.forEach(item => {
            item.classList.add(classAdd);
        }); 
    } else { elements.classList.add(classAdd); }
    
}

function removeClass(elements, classRemove) {
    if (typeof elements[Symbol.iterator] === 'function') {
        elements.forEach(item => {
            item.classList.remove(classRemove);
        });
    } else { elements.classList.remove(classRemove); }
}

function splitAndJoin(value, simv1, simv2) {
    return value.split(simv1).reverse().join(simv2);
}

function inputClean() {
    inputName.value = '';
    inputDate.value = '';
    inputMoney.value = '';
}