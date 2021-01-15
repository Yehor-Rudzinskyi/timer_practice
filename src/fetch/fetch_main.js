
import fechArticle from './http_request'
import updateArticlesMarkup from './create_markup'


const refs = {
    searchForm : document.querySelector('.js-serch-form'),
}

refs.searchForm.addEventListener('submit', event => {
    event.preventDefault()
    const form = event.currentTarget;
    const inputValue = form.elements.query.value
fechArticle(inputValue).then(updateArticlesMarkup)
})

// Импортируем сюда функцию fechArticle из модуля http_request и теперь, так как от туда нам приходит промис c готовым массивом мы к этой функции можем "зачейнить" then c в которую передаём функцию ожидающую эти данные. То есть function updateArticlesMarkup(articles) {
//             const markup = articlesTpl(articles)
//         refs.articlesConteiner.innerHTML = `${markup}`;
// };
// Она находится в другом модуле, поэтому мы её естествеено также сюда импортируем.