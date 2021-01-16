import refs from './refs'
import fechArticle from './http_request'
import updateArticlesMarkup from './create_markup'

let searchQuery = '';
let page = 1;

refs.searchForm.addEventListener('submit', event => {
    event.preventDefault()
    const form = event.currentTarget;
    searchQuery = form.elements.query.value

    form.reset();
    page = 1;

    fechArticle(searchQuery, page).then((articles) => {
        updateArticlesMarkup(articles);
        page += 1;
    })
})

refs.loadMoreBtn.addEventListener('click', () => {
    fechArticle(searchQuery, page).then((articles) => {
        updateArticlesMarkup(articles);
        page += 1;
    })
})

// Импортируем сюда функцию fechArticle из модуля http_request и теперь, так как от туда нам приходит промис c готовым массивом мы к этой функции можем "зачейнить" then c в которую передаём функцию ожидающую эти данные. То есть function updateArticlesMarkup(articles) {
//             const markup = articlesTpl(articles)
//         refs.articlesConteiner.innerHTML = `${markup}`;
// };
// Она находится в другом модуле, поэтому мы её естествеено также сюда импортируем.

// хххххххх Плагинация хххххххх  дозагрузка

// Закидываем  разметку кнопочки.
// В refs добавляем слушателя на саму кнопку
// Вешаем на неё слушатель на клик.
// По хорошему нам также необходимо делать динамическую разметку по клику на кнопку 
// fechArticle(inputValue).then(updateArticlesMarkup) - но есть трабл, (inputValue) в данном случае "набираетпользователь", и нам не от куда брать запрос на fetch данных.
// По плохому премеру - создаём внешнюю переменную let searchQuery = ''; Эту переменную мы заменяем в поступающих параметрах функции fechArticle(inputValue) и также она присваивает себе значение, которое набрали в поисковой строке    
// const form = event.currentTarget;
// const inputValue = form.elements.query.value
// Получается юзер набрал текст в поисковике. В новосозданную переменную падает этот текст и далее идёт в параметры наших функций поиска fechArticle(searchQuery).then(updateArticlesMarkup) 
// И теперь, когда мы кливаем по кнопке "догрузить" - то в слушателе клика у функции запроса данных уже будет необходимый текст - запрос
// Теперь набирая текст и нажимая кнопку "Показать ещё" мы получаем два одинаковых Респонса!
// Далее, чтобы при клике нам возвращались новые пакетики, то в функцию
// function fechArticle(searchQuery, page=1) {
//     const url = `http://newsapi.org/v2/everything?q=${searchQuery}&pageSize=10&page=${page}`;
//     нам теперь необходимо добавить ещё один изменяемый параматр со значением по умолчанию page=1, который будет меняться динамически в ссылке fecth
// Page - при сабмите не ставим ведь при сабмите формы по умолчанию встанет page = 1, а вот при нажатии кнопки его уже необходимо контролировать.
// Создаём глобальную переменную page = 1, которая должна увеличиваться только в том случае если HTTP запрос прошёл успешно! Поэтому увеличивать будем в конечном then, нашего промиса. ТОлько если данные пришли успешно - добавляем +1 page. 
    // fechArticle(searchQuery, page).then((articles) => {
    //     updateArticlesMarkup(articles);
    //     page += 1;
    // })
    // Каждый раз, когда сабмитим форму - необходимо сбрасывать page в ноль, иначе при вводе иного значения "счётчик" продолжит работать. Page необходимо сбрасывать при изменении термина поиска!

// хххххххххх РЕФАКТОРИМ хххххххх

// Делаем "сервис " отдельным модулем - объект, который будет отвечать на наши запросы на API  и он будет внутри себя хранить глобальные переменные 
// let searchQuery = '';
// let page = 1; и сам будет всё увеличивать
//  1. Создаём новый js файл fetch_service и переносим формулу Фетча