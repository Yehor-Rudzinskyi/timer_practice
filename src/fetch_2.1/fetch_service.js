const apiKey = '7937007a8532475090180c9396df4d40';


export default {
    searchQuery: '',
    page: 1,

    fechArticle() {
        const url = `http://newsapi.org/v2/everything?q=${this.searchQuery}&pageSize=5&$page=${this.page}`;
 
        const options = {
            headers: {
                Authorization: apiKey,
            },
        };
    
        return fetch(url, options).then(res => res.json()).then(({ articles }) => {
            this.page += 1;
            return articles
        })
    },

    resetPage() {
        this.page = 1;
    },

    get query() {
        return this.searchQuery;
    },

    set query(value) {
        this.searchQuery = value;
    },
    
};


