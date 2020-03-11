let app = new Vue({
    el: "#app",
    data: {
        msg: 'this is vue',
        email: '',
        password: '',
        isLogin: true,
        registerView: false
    },
    methods: {
        loginCheck() {
            if (this.email === 'hilmi@mail.com') {
                if (this.password == '123456') {
                    this.isLogin = true
                }

            } else {

            }
        },
        logout() {
            this.isLogin = false
        },
        registerBtn() {
            this.registerView = true
        },
        loginBtn() {
            this.registerView = false
        }

    }
})