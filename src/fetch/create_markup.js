import articlesTpl from '../articles.hbs'

const refs = {
    articlesConteiner: document.querySelector('.js-articles'),
};


function updateArticlesMarkup(articles) {
    const markup = articlesTpl(articles);
    refs.articlesConteiner.innerHTML = `${markup}`;
};

export default updateArticlesMarkup;

// Тутоньки не забываем про ссылочку с нашего шаблона import articlesTpl from '../articles.hbs'
// Не забываем, что ей необходима ссылочка на ДОМ-элемент. Поэтому передаём её сюда и экспортируем нашу функцию разметочки в fetch_main