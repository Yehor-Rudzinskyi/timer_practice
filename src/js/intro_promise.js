
// const promise = new Promise((resolve, reject) => {
//     resolve('some');
//     reject('nothing');
// })


// Если выполнится resolve() то объект в переменной promise переходит в состояние fullfiled и результатом его будет 'some'.
// А если выполнится reject(), то объект в переменной promise переходит в состояние rejected и результатом его будет 'nothing';
// console.log(promise);
// %%%%%%
// Promise {<rejected>: "nothing"} Объект, который хранит состояние асинхронной операции.
// __proto__: Promise
// [[PromiseState]]: "rejected"
// [[PromiseResult]]: "nothing"

// Также имеет три метода, помогают обработать результат промиса, когда "resolve"(fullfiled)
// catch: ƒ catch()
// finally: ƒ finally()
// then: ƒ then()

// const promise = new Promise((resolve, reject) => {
//     const success = Math.random() > 0.5;
//     setTimeout(() => {
//         if (success) {
//             resolve('Good!')   
//         } 
//         reject('Error!')
//     }, 1000)
// })

// console.log(promise);
// В метод then можем передать callback, который получит результат успешной синхронной операции
// promise.then((resalt) => {
//      console.log(resalt);
// })
// Это просто регистрация callback, если Промис выполнится успешно, то выполни функцию, в которую прийдёт результат выполнения, Через 2 сек.
// Добавляем success, чтоб рандомно выводитть - успех или не.
// Если в then передаём позитивный исход, то в catch (c помощью цепочки выззовов chain) передаём негативный исход.
// Данные из вне/глобально - промис не может получать. Его данные это всегда результат. 
// promise.then((result) => console.log(result)).catch((result) => console.log(result));
    
// Также, чейном можем прилепить метод finally(), в него не поступают данные. Его функция выполняется для обоих случаев

// хххххххххххххх ЧЕЙНИНГ хххххххххххххххх
const promise = new Promise((resolve) => {
    resolve(5)
})
// Результат функции then обарачивается в промис и с помощью чейнинга мы можем передать следущему then параматр предидуего, результат его return
promise.then(x => {
    console.log('x:', x);
    return x * 2;
}).then(y => {
    console.log('y:', y);
    return y + 50;
}).then(z => console.log('z:', z)).catch(error => console.log(error))
// Всегда, если нужно обработать ошибку catch, ставим в самом конце цепочки ибо ощибка у нас всегда одна! Ловит ошибку на любом этапе цепочки.
// x: 5
// y: 10
// z: 60