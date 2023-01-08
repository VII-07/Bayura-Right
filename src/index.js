// Import our custom CSS
import './styles/main.scss'

// Import all of Bootstrap's JS
import 'bootstrap';

const kasaValue = document.getElementById('kasa');
const goodName = document.getElementById('goodName');
const goodId = document.getElementById('goodId');
const goodPrice = document.getElementById('goodPrice');
const goodCol = document.getElementById('goodCol');
const addBtn = document.getElementById('addGood');
const toCalculate = document.getElementById('toCalculate');
const cardWrapper = document.getElementById('goodList');
const outputWrapper = document.querySelector('.output__wrapper');
const cardNumMono = document.querySelector('.bank__wrapper__card_1')
const cardNumPrivate = document.querySelector('.bank__wrapper__card_2')

let evenObj = []; // масив для обєктів з чотними цінами (тому що при діленні на чотні обєкти легше ділити залишки)
let notEvenObj = []; // масив для обєктів з нечотними цінами
let kasa = kasaValue; // сума яку треба поділити на пива

function createGood(name, price, id, col) { // cтворює обєкт пива (імя, ціна пива, код пива, і залишок)

    let good = {};

    good.name = name;
    good.price = price;
    good.id = id;
    good.col = col;

    sortObj(good);
}

function isEven(num) {
    return num % 2 == 0;
}

function functionCopy(elem) {
    navigator.clipboard.writeText(elem.innerHTML)
        .then(() => {
            successMessage.classList.add('active');
            setTimeout(() => successMessage.classList.remove('active'), 2500);
        })
        .catch(err => {
            console.log(err);
        })
}

function sortObj(good) { // пушить обєкти в масив
    (isEven(good.price)) ? evenObj.push(good): notEvenObj.push(good);
}

function isDecimal(num) {
    if (num.toString().split('.')[1] !== undefined) {
        if (num.toString().split('.')[1].length > 1) {
            return false;
        }

        return true;
    }
}

function isClear(mas) {
    return (mas.length == 0) ? true : false;
}

function ifAllNumbersAreTheSame(masif) {
    masif.forEach(good => { // перебирає масив з пивами які мають не чотну ціну
        for (let i = kasa.value; i > 0; i--) {
            let decimalNum1 = i / good.price; // шукає дільник і записує залишок

            if (Number.isInteger(decimalNum1)) {

                masif.forEach(evenGood => { // перебирає масив з пивами які мають чотну ціну і ділить на їхню ціну залишок
                    let decimalNum2 = (kasa.value - i) / evenGood.price;
                    if ((Number.isInteger(decimalNum2) || isDecimal(decimalNum2)) && good.col >= decimalNum1 && decimalNum2 <= evenGood.col) {
                        // console.log(`Kod ${good.id} треба помножити ${decimalNum1} і ...`);
                        // console.log(`Kod ${evenGood.id} треба помножити ${decimalNum2}`); // ось тут ділить залишок
                        // console.log('......................................................');
                        let output = `
                            <div class="output__card">
                                <p class="output">${decimalNum1} треба помножити на код ${good.id}і.. </p>
                                <p class="output">${decimalNum2} треба помножити на код ${evenGood.id}</p>
                            </div>`;
                        outputWrapper.insertAdjacentHTML("afterbegin", output);
                    }
                })
            }
        }

    })


    //     masif.forEach(good => {
    //         let ost = kasa.value / good.price;
    //         if ((Number.isInteger(ost) || isDecimal(ost)) && ost < good.col) {

    //             outputWrapper.innerHTML = '';
    //             let output = `
    // <div class="output__card">
    // <p class="output"> ${ost} треба помножити на код ${good.id}</p>
    // </div>`;
    //             outputWrapper.insertAdjacentHTML("afterbegin", output);
    //         }
    //     })
}


function calcValue() {
    if (isClear(notEvenObj)) {
        ifAllNumbersAreTheSame(evenObj);
    } else if (isClear(evenObj)) {
        ifAllNumbersAreTheSame(notEvenObj)
    } else {
        notEvenObj.forEach(good => { // перебирає масив з пивами які мають не чотну ціну
            for (let i = kasa.value; i > 0; i--) {
                let decimalNum1 = i / good.price; // шукає дільник і записує залишок

                if (Number.isInteger(decimalNum1)) {

                    evenObj.forEach(evenGood => { // перебирає масив з пивами які мають чотну ціну і ділить на їхню ціну залишок
                        let decimalNum2 = (kasa.value - i) / evenGood.price;
                        if ((Number.isInteger(decimalNum2) || isDecimal(decimalNum2)) && good.col >= decimalNum1 && decimalNum2 <= evenGood.col) {
                            // console.log(`Kod ${good.id} треба помножити ${decimalNum1} і ...`);
                            // console.log(`Kod ${evenGood.id} треба помножити ${decimalNum2}`); // ось тут ділить залишок
                            // console.log('......................................................');
                            let output = `
                            <div class="output__card">
                                <p class="output"> ${decimalNum1} треба помножити на код ${good.id}і.. </p>
                                <p class="output">$${decimalNum2} треба помножити  ${evenGood.id}</p>
                            </div>`;
                            outputWrapper.insertAdjacentHTML("afterbegin", output);
                        }
                    })
                }
            }

        })
    }
}
addBtn.addEventListener('click', () => {
    createGood(goodName.value, goodPrice.value, goodId.value, goodCol.value);
    const card = `    
<div class="card d-flex flex-row justify-content-between">
    <p class="card__id card__text"><span>Код: </span> ${goodId.value}</p>
    <p class="card__name card__text"><span>Ім'я: </span> ${goodName.value}</p>
    <p class="card__price card__text"><span>Ціна: </span> ${goodPrice.value}</p>
    <p class="card__col card__text"><span>Кількість: </span> ${goodCol.value}</p>
</div>`

    cardWrapper.insertAdjacentHTML("afterbegin", card);

    goodId.value = '';
    goodName.value = '';
    goodPrice.value = '';
    goodCol.value = '';
});
toCalculate.addEventListener('click', () => {
    calcValue();
})
cardNumMono.addEventListener('click', () => {
    functionCopy(cardNumMono);
})