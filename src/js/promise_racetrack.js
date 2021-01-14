
const horses = [
    'Poly',
    'Anna',
    'Gorg',
    'Kligan',
    'Tirian',
];

const getRundomTime = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const run = hourse => {
    return new Promise((resolve) => {
        const time = getRundomTime(2000, 3500)
        setTimeout(() => {
resolve({hourse, time})
        }, time)
    })
}

// run(horses[0]).then(resalt => console.log(resalt))  

// вешаем промис на каждое свойство массива

const promises = horses.map(run)
// console.log(promises);

// Они в ожидании и их необходимо запустить
Promise.all(promises).then(result => console.log(result))

// Принимает массив промисов и на своё место возвращает тоже Промис, соответственно можем юзать на нём then, у котрого колБэк ф-ия выполнится тогда, когда ывполнятся все промисы
// Если хотя бы один из промисов не выполнится, тогда и сработает вся операция

Promise.race(promises).then(result => console.log(result))

// Также получает массив промисов и вотличии от метода all, ловит самый быстро выполняющийся промис и возвращает его

const some = function (ase) {
    console.log(ase);
}
some.else = function (some) {
    console.log(some);
}
console.dir(some);