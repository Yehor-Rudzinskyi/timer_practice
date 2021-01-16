import refs from './refs2'
import newServise from './fetch_service'
import updateArticlesMarkup from './create_markup2'

// let searchQuery = '';
// let page = 1;

refs.searchForm.addEventListener('submit', event => {
    event.preventDefault()
    const form = event.currentTarget;
    newServise.query = form.elements.query.value

    form.reset();
    // page += 1;
    newServise.resetPage()

    newServise.fechArticle().then((articles) => {
        updateArticlesMarkup(articles);
    })
})

refs.loadMoreBtn.addEventListener('click', () => {
    newServise.fechArticle().then((articles) => {
        updateArticlesMarkup(articles);
    })
})


// xxxxxxx ReFacToriNg 2 xxxxxxxx

// Теперь будем передавать функцию function fechArticle(searchQuery, page = 1) как объект оборачивая его в литерал {} при export default.
// Меняем имя сервиса в импорте на newService и так как теперь fechArticle() - это метод передаваемого объекта newService - то делаем ренейм функций в обработчивах слушателей.
// Теперь выносим логику и болтающиеся переменные в новоспечённый объект.
// searchQuery = '';
// page = 1;
// Нужно page каждый раз при сабмите сбрасывать в ноль.
// По сути page = 1 теперь это свойство newService и можем изменить обращение на newService.page = 1, но не комиьфо и лучше сделаем в newService объекте метод resetPage() который будет также делать сброс на 1, но при этом в main будет скрыта реализация
// Теперь нет необходимости передавать в function fechArticle(searchQuery, page = 1) -  page = 1, потомучто page уже является свойством объекта, в котором она (ф-ия) находится и егомы можем передавать через ${this.page}
    // fechArticle(searchQuery) {
    //     const url = `http://newsapi.org/v2/everything?q=${searchQuery}&pageSize=10&$page=${this.page}`;

    // Но теперь page надо увеличивать по другому, ведь его уже нет в параметрах функций. Делаем увеличение перед тем как вернуть articles в 
        //   return fetch(url, options).then(res => res.json()).then(({ articles }) => {
        //     this.page += 1;
        //     return articles
        // })

// Теперь добрались к searchQuery = form.elements.query.value, которая позволяет нам передавать напечатанные данные юзером в кнопку для подтягивания данных. searchQuery - уже есть в нашем объекте. И в линк фетча мы достучимся через this, а чтобы в него записывать = сделаем в объекте геттер и сеттер. 
// const url = `http://newsapi.org/v2/everything?q=${this.searchQuery}&pageSize=10&$page=${this.page}
// get query() {
//         return this.searchQuery;
//     },

//     set query(value) {
//         this.searchQuery = value;
//     },

// И теперь можем передать  значения введённое пользователем через сеттер 

// Передавать параметром searchQuery в промисы слушателей уже не нужно 