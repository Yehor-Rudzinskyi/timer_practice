// const date = new Date();
// Это объект со свойствами и методами, который интерпретируется в clog, через метод toString как строка
// Снимок времени на момент выполнения куска кода(не самообновляется!)
// console.log(date);
// Если передать строку, она будет обработана методом Date.parse(), чтобы вернуть объект Date.
// const date2 = new Date('May 4, 1987');
// console.log(date2);
// Также можно передать 7мь чисел, которые описывают 
// new Date(year, month, date, hours, minutes, seconds, ms) Последние 4 аргумента необязательны.
// const date3 = new Date(1987, 4, 4)
// Индексы месяцев начинаются с 0, поэтому 4-й месяц это May.
// console.log(date3);
// const date4 = new Date(100000)
// console.log(date4);

// Библиотеки для работы со временем Momentjs.com || data-fns.org

// Используя new Date() нам возвращается объект с методами
// const getNumber = new Date();
// console.log(getNumber.getSeconds());
// console.log(getNumber.getMinutes());
// console.log(getNumber.getMonth());

// Позырить, сколько миллисек прошло по Unix с 1января 1970г можно с помощью статического метода Date.now() вернёт уникальное число
// const watch = Date.now()
// console.log(watch);

// С учетом этой системы отсчета, если вы передаете число объекту Date, это число представляет собой количество миллисекунд, прошедших с тех пор.
// const dating = new Date(1000);
// console.log(dating);
// Thu Jan 01 1970 03: 00: 01 GMT + 0200(FLE Standard Time)


// ======================= TIMER ===================================
const refs = {
    startBtn : document.querySelector('button[data-action-start]'),
    stopBtn : document.querySelector('button[data-action-stop]'),
    clockFace : document.querySelector('.js-clockface'),
};
// // Мы будем каждую секунду логировать время
// setInterval(() => console.log(new Date()), 1000);

// Создаём объект таймера, в котором нам необходимы два метода - start & stop

const timer = {
    intervalId: null,
    isActive : false,
    start() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        const startTime = Date.now();
        updateClockface(0);
        this.intervalId = setInterval(() => {
            const currentTime = Date.now()
            const deltaTime = currentTime - startTime
            updateClockface(deltaTime)
        
        }, 1000)
    },
    stop() {
        clearInterval(this.intervalId);
        updateClockface(0);
        this.isActive = false;
    }
}


// Нам необходимо на кажду секунду отображать в интерфейсе разницу между текущим временем и стартовым. Для этого нуно созранить стартовое время. Создаём переменную в методе start(чтоб как ток запускается) со знвачением текущего времени (Date.now) и передаём в интервал. В переменной его значение уже меняться не будет, потомучто оно берётся один раз при вызове метода start! 
// Теперь внутри интервала устанавливаем текущее время, которое будет меняться с указанным интервалом = 1 секунда
// Нам необходима разница, тк текущее время(currentTime) всегда больше стартовового(startTime) мы от текущего отнимаем стартовое и получаем разницу на каждом интервале._1._2._3 и тд 
// Поэтому в методе интервала создаём переменную deltaTime, где и получаем разницу милисекунд, с помощью которой юзая формулы, вычисляем кол-во минут, часов и тд со старта нашего таймера

function updateClockface(time) {

  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  refs.clockFace.textContent = `${hours}:${mins}:${secs}`;
}

// В эту функцию мы передаём кол-во милисекунд от старта (deltaTime), где и будет происходить конвертация. Эту функцию вызываем на интервале
// Для красивого отображения 00:00:00 юзаем функцию function pad(value) в которую попадает число и конвертируется в строку методом  String(value) после чего если менее 2ух символов, пустые места забиваем нулями .padStart(2, '0'). Поэтому каждая строка в функции function updateClockface(time) оборачивается в pad(value).
function pad(value) {
  return String(value).padStart(2, '0');
}

// Теперь вяжем всё в няшный интерфейс. Результатом функции updateClockface(time) является отображение конвертаций в refs.clockFace.textContent.

// Вяжем кнопочки к нашему таймеру, вешая слушателей на click и передавая туда методы объекта таймера с привязкой контекста ибо будет юзаться this. Для того чтобы отменить/очистить интервал нам нужен его ID который пропишем как свойство в объекте timer и внутри метода объукта timer через this присваиваем intervalId = setInterval и в stop методе очищаем интервал обращаясь к переменной this.intervalId

refs.startBtn.addEventListener('click', timer.start.bind(timer))
refs.stopBtn.addEventListener('click', timer.stop.bind(timer))

// При передаче метода(объекта), как коллбэка в обработчик события - необходимо привязать контекст!!!
// Чтобы при клике на стоп обнулялось табло, достаточно в метод счётчика "стоп", передать фуекцию updateClockface(time), и передать в неё параметром "0"
// Теперь есть трабл. Ведь каждый раз запуская метод старт- сетится новый интервал, поэтому нам необходимо ограничить вызов одним интервалом. Проверять если наш интервал активный, то нифигаськи не делать! Создаём в объекте "счётчик" свойство/флаг isActiv, которое будет по умолчанию false. Запуская метод меняем на true, а при стопе - возвращаем false. Ставим условие, что если старт уже был запущен - выходим!
// Чтобы отсчёт начинался от 0-ля, сетим функцию updateClockface(0) в метод старта 