const apiKey = '7937007a8532475090180c9396df4d40';

function fechArticle(searchQuery, page = 1) {
    const url = `http://newsapi.org/v2/everything?q=${searchQuery}&pageSize=10&$page=${page}`;

    const options = {
    headers: {
        Authorization: apiKey,
    },
};
    
 return fetch(url, options).then(res => res.json()).then(data => data.articles)
        // .then(({ articles }) => updateArticlesMarkup(articles));
};



// Экспортируем по дефолту из этого модуля функцию fechArticle(searchQuery) и будем возвращать из неё Промис!

export default fechArticle;

// Ключ выносим из функции вверх/ опции по запросу остаются, делясь динамически/ const url остаётся динамически, потому что searchQuery нужен. Теперь оно не знает, что такое  updateArticlesMarkup(articles) в then. Поэтому мы заменяем  .then(({ articles }) => updateArticlesMarkup(articles)) и делаем return  fetch(url, options) - возвращаем сам промис(распарсенный, вместе с данными) с массивом

// Получается, что мы тут делаем http запрос и возвращаем промис с массивом готовым к работе