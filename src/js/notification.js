// У нас есть нотификашечка, которая изначально скрыта с помощью css 
//  transform: translateX(calc(100% + 20px));
//   visibility: hidden;
//   opacity: 0;
// Трансформом мы её максимально вправо за экран прячем и если мы на класс "notifiaction" добавим класс .is-visible, то поменяем значения, которые позволят нам нотификашечку лицезреть
// .notifiaction.is-visible {
//   transform: translateX(0);
//   visibility: visible;
//   opacity: 1;
// }
// Ну и  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1); висит чтобы передать плавный переход на transform  и opacity

// Cоответственно, выбираем через селектор нашу нотификашечку и вешаем на неё слушатель клика.

const notificationRef = document.querySelector('.js-notification');

let timerId = null;

notificationRef.addEventListener('click', onNotificationClick)

// Сразу вызываем ф-ию, которая делает нашу тнотификашечку видимоой и создаём ф-ию скрытия её
showNotification()


function onNotificationClick () {
    console.log('Piggi');
   clearTimeout(timerId)
    hideNotification()
}

// В фенкции появления нотификашечки можем установить времфя, чтобы она скрывалась
function showNotification() {
    notificationRef.classList.add('is-visible')

    timerId = setTimeout(() => {
        console.log('Set timer');
        hideNotification();
    }, 3000)
}

function hideNotification() {
    notificationRef.classList.remove('is-visible')
}
// Чтобы не ждать от ТАйм Аута времени закрыть нотку, вставляем hideNotification() в ф-ию которая висит на слушателе клика. Но также необходимо снять регистрацию с таймера. Для того чтобы clearTimeout() повешать необходимый АйдиШник, выносим переменную с именем таймера в глобалную область видимости НАД/ПЕРЕД слушателем события!