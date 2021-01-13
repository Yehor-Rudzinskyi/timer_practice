// const fetchUser = userName => {
//     const success = Math.random() > 0.3;
//     const user = { name: userName, age: 25, posts: 76 };
//     const error = "Trabl:(";
//     return success ? user : error;
// }
// console.log(fetchUser('Mango'));

// Итеем фенуцию, котраяпри успешной операции возвращает юзера, а при ошибке "Trabl:("
// Однако если нам необходима асинхроность при запросе и получении данных то будет трабл, ведь если обернуть код в функции fetchUser в setTimeout, то мы не сможем получить из него данные юзера во внешнем коде*( 
    // Поэтому раньше юзали колБеки.

// const fetchUser = (userName, onSaccess, onError) => {
//     setTimeout(() => {
//         const success = Math.random() > 0.3;
//         if (success) {
//             const user = { name: userName, age: 25, posts: 76 };
//             onSaccess(user);
//             return;
//         }
 
//         const error = "Trabl:(";
//         onError(error);
//     }, 1000);

// };

// После чего в вызванную фенкцию fetchUser приходилось передавать колБек ф-ии, кторыуе залетали в параметры fetchUser - где происходил их return с приобретёнными данными ( если всё ок - вызывалась функция onFechUserSuccess(user) если херово onFechUserError(error))

// fetchUser('Mango', onFechUserSuccess, onFechUserError)

// function onFechUserSuccess(user) {
//     console.log(user);
// };
// function onFechUserError(error) {
//     console.log(error);
// };

// Однако проще не играться с вызовом функций а обернуть в Промис который будет возвращать в then положительный результат и в catch - отрицательный!

// хххххххх Промисификация ф-ций хххххххххх

const fetchUser = (userName) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.3;
            if (success) {
                const user = { name: userName, age: 25, posts: 76 };
                resolve(user)
            }
            const error = "Trabl:(";
            reject(error)

        }, 1000);
    });
  
};

// Сама функция fetchUser должна вернуть нам  return promise либо сразу return new Promise и тогда мы вызываем fetchUser в таком формате

fetchUser('Bernard').then((user) => console.log(user)).catch((error) => console.log(error))

// Либо лакониснненько перевести это в функции

// fetchUser('Bernard').then(onFechUserSuccess).catch(onFechUserError)
// function onFechUserSuccess(user) {
//     console.log(user);
// };
// function onFechUserError(error) {
//     console.log(error);
// };


// Сходим за данными на бэкенд. Вызываем метод fetch, котрый ожидаем промис и забираем response с помощью then.

fetch('https://jsonplaceholder.typicode.com/todos/5')
  .then(response => response.json())
  .then(json => console.log(json))
    .catch(console.log)
  
// Сходить за данными с помощью функции, нам поможет функция 

const pullById = (id) => {
return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  .then(response => response.json())
}

pullById(17).then(json => console.log(json)).catch(console.log);

