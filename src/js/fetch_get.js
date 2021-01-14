import articlesTpl from '../articles.hbs'

const refs = {
    articlesConteiner: document.querySelector('.js-articles'),
    searchForm : document.querySelector('.js-serch-form'),
}
// fetch('http://hn.algolia.com/api/v1/search?query=...')


// http://hn.algolia.com/ - корень, адресс нашего БэкенДа
// /v1/search - end point(точка входа)
// ?query=... параметры запроса

// fetch('https://jsonplaceholder.typicode.com/todos');
// 'https://jsonplaceholder.typicode.com - корень, адресс нашего БэкенДа
//     / todos - end point(точка входа)
// "Пойти на адресс https://jsonplaceholder.typicode.com и взять  todos(тудушки)"
// В Инспекторе браузера, во вкладке Network должно быть активно Disable cache!
// Все ответы от Бэка видим во вклaдке XHR 

// fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json()).then(data => console.log(data));
// Т.к.fetch - это как Промис, который нам стремится отдать данные, то мы их получаем с помощью метода then, который возвращает нам Response - но это ещё не данные.Это экземпляр класса Response(ответа), который хранит уже мета инфо для нашего кода.В этом экземпляре есть свойство body - содержащее специальный формат даных, которые надо распарсить.Эти данные могут быть json | text | Blob(картинка), которые мы соответственно расапрсим методами имеющиеся в этом экземпляре Response. 
// К нам пришёл Json и мы его парсим в изначальном then, а в следующем унас будет доступен результат. Свойства в пришедшем массиве объектов - гарантированно будут одинаковыми. 
// Точки входа у БэкенДа(что можно взять) - смотрим в его документации
// fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(data => console.log(data));
// Документация у БэкенДов, у каждого уникальная. Необходимо изучать.
// Когда необходимо начать строку запроса - ставим знак вопроса(?), после чего - пары(параметр: значение), следущие разделяются амперсантом (&)
// fetch('http://hn.algolia.com/api/v1/search?query=foo&tags=story').then(resurses => resurses.json()).then(data => console.log(data))
// Поставить в браузере расширение (Json formater)

// ххххххххх АВТОРИЗАЦИЯ ххххххххх
// https://newsapi.org/

// GET http://newsapi.org/v2/everything?q=bitcoin&language=ru 401 (Unauthorized) при попытке выше - получаем ответ о ошибке - отсутствие авторизации! 
// Получаем ключь и во вкладке Authentication смотрим варианты его подключения
// fetch('http://newsapi.org/v2/everything?q=bitcoin&language=ru&apiKey=7937007a8532475090180c9396df4d40')

// Для удобства работы - выносим ключь в переменную и адресс бэка тоже
// const apiKey = '7937007a8532475090180c9396df4d40';
// const url = `http://newsapi.org/v2/everything?q=bitcoin&language=ru&apiKey=${apiKey}`;
// fetch(url, options)
//     .then(res => res.json()).then(({articles}) => console.log(articles));
    // .then(data => console.log(data.articles));
    // Т.к данные - это объект то распарсим, чтоб не было обращения data.articles

// В прилетевшем объекте наблюдаем свойство articles - оно то нам и необходимо) Обращаемся ук нему через data.articles
// В приватных API бум юзать заголовок авторизации в виде Authorization, который передаётся в заголовок. 
// Мы делаем опции для феча: и передаём их ему параметром
const options = {
    headers: {
        Authorization: apiKey,
    },
};

// Теперь "нарисуем наш массив" в articles.hbs
// Подтягиваем шаблон в этот файл

const apiKey = '7937007a8532475090180c9396df4d40';
const url = `http://newsapi.org/v2/everything?q=bitcoin&language=ru&apiKey=${apiKey}`;
fetch(url, options)
    .then(res => res.json()).then(({ articles }) => {
        console.log(articles)
        const markup = articlesTpl(articles)
        refs.articlesConteiner.insertAdjacentHTML('beforeend', markup)
    });
    
    // Тут вызываем наш импорт с шаблона передавая ему в параметры наш полученный массив articles, и вешаем теперь в HTML на тег ul class='js-articles';

    // Теперь забабахаем, чтоб по поиску в инпут оно подтягивало нам новые ссылки. Вешаем сабмит на форму

refs.searchForm.addEventListener('submit', event => {
    event.preventDefault()
    console.log(event.currentTarget);
    })
