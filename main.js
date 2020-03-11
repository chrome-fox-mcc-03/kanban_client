var app = new Vue({
    el: '#app',
    data: {
        currentPage : 'home'
    },
    methods : {
        changePage : function(page){
            this.currentPage = page
        }
    }
})