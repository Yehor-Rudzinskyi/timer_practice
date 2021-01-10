// const logger = time => console.log(`Log every ${time}ms - ${Date.now()}`);
// setInterval(logger, 2000, 2000)
// Интервал позволяет нам с определённой периодичностью вызывать ф-ю
// СОздаём переменную в которой будет храниться кол-во раз вызванной ф-ии а также переменная которая будет содержать информацию: подписался челик или нет
console.log('before');

let hasSubscribed = false; 
let quantityOfPropose = 0;

// Устанавливаем интервал вызова ф-ии и также при каждом вызове увеличиваем quantityOfPropose на 1 и ставим условие, что если показали запрос более трёх раз - то харош и тк нам понадобится Айдишник интервала, то мы его запишем в переменную. Для того чтобы далее код не выполнялся ставим return. Также в условие остановки интервала можем поставить подписку пользователя
const intervalId = setInterval(() => {
    if (quantityOfPropose === 3 || hasSubscribed) {
        clearInterval(intervalId)
        return;
    }
    console.log(`Please subscribe!`)
    hasSubscribed = true
    quantityOfPropose +=1
}, 1000)

// Синхронный код ВСЕГДА выполняется первый, поэтому если мы поставим например console.log до и после асинхронного кода - интервала, то они всё равно выполнятся первыми, а потом сработает ИНТЕРВАЛ!
console.log('after');