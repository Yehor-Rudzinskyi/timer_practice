import articlesTpl from '../articles.hbs'
import refs from './refs2'



function updateArticlesMarkup(articles) {
    const markup = articlesTpl(articles);
    refs.articlesConteiner.insertAdjacentHTML('beforeend', markup)
};

export default updateArticlesMarkup;