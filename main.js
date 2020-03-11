let app = new Vue({
    el: '#app',
    data: {
        isLogin: false,
        userRegister: {
            username: '',
            password: ''
        },
        userLogin: {
            username: '',
            password: ''
        },
        currentPage : ''
    },
    methods: {
        changePage(page) {
            if (page === 'loginDisplay' || page === 'homepageDisplay') {
                this.currentPage = page
            } else {
                if (this.isLogin) {
                    this.currentPage = page
                }
            }
        },
        authenticate(){
            if (this.userRegister.username === this.userLogin.username && this.userRegister.password === this.userLogin.password) {
                this.isLogin = true
                this.changePage('homepageDisplay')
            } else {
                this.changePage('loginDisplay')
            }
        },
        logout(){
            if (this.currentPage == 'homepageDisplay') {
                console.log('jajajaja')
                this.isLogin = false
            } else {
                this.changePage('homepageDisplay')
                this.isLogin = false
            }
        }
    }
})