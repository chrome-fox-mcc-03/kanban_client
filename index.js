let app = new Vue({
    el:'#app',
    data: {
        isLogin:false,
        currentPage : 'registerPage',
        userId:localStorage.getItem('userId'),
        email:'',
        password:'',
        inputAdd: ['','','',''],
        todos: [],
        token: localStorage.getItem('token')
    },
    methods: {

        changePage (page) {
            this.currentPage = page
        },

        register () {
            axios({
                url:'http://localhost:3000/register',
                method:'POST',
                data:{
                    email:this.email,
                    password:this.password
                }
            })
            .then((result) => {
                this.isLogin = true
                this.email = result.data.email
                this.userId = result.data.id
                this.currentPage = 'dashboardPage'
                localStorage.setItem('token',result.data.token)
                localStorage.setItem('email',result.data.email)
                localStorage.setItem('userId',result.data.id) 
            }).catch((err) => {
                console.log(err)
            });
        },

        login () {
            axios({
                url:'http://localhost:3000/login',
                method:'POST',
                data:{
                    email:this.email,
                    password:this.password
                }
            })
            .then((result) => {
                this.isLogin = true
                this.email = result.data.email
                this.userId = result.data.id
                this.currentPage = 'dashboardPage'
                localStorage.setItem('token',result.data.token)
                localStorage.setItem('email',result.data.email)
                localStorage.setItem('userId',result.data.id) 
            }).catch((err) => {
                console.log(err)
            });
        },

        logout() {
            localStorage.clear()
            this.isLogin = false
            this.email = ''
            this.userId = ''
            this.currentPage = 'loginPage'
            this.token = ''
        },

        getTodos() {
            let userId = this.userId
            let token = this.token
            axios({
                method:'GET',
                url:`http://localhost:3000/todos/${userId}`,
                headers: {
                    token
                }
            })
            .then((result) => {
                let filteredDevelopment = result.data.filter((el) => {return el.name_box == 'Development'})
                let filteredBackLog = result.data.filter((el) => {return el.name_box == 'Backlog'})
                let filteredProduct = result.data.filter((el) => {return el.name_box == 'Product'})
                let filteredDone = result.data.filter((el) => {return el.name_box == 'Done'})
                this.todos = [filteredBackLog,filteredDevelopment,filteredProduct,filteredDone]
                // console.log(filteredBackLog)
                // console.log(filteredDevelopment)
                // console.log(filteredProduct)
                // console.log(filteredDone)
            }).catch((err) => {
                console.log(err)
            });
        },

        // BELUM KELAR ===========================================================
        btnAdd(index) {
            let name_box = null
            let description = this.inputAdd[index]

            if(index == 0) {
                name_box = 'Backlog'
            }else if(index == 1) {
                name_box = 'Development'
            }else if(index == 2) {
                name_box = 'Product'
            }else if(index == 3) {
                name_box = 'Done'
            }

            axios({
                method:'POST',
                url:'http://localhost:3000/todos',
                data: {
                    name_box,
                    description,
                    UserId:this.userId,
                    token:this.token
                }
            })
            .then((result) => {
                this.todos[index] = [...this.todos[index],name_box,description]
                console.log(this.todos)
            }).catch((err) => {
                console.log(err)
            });

        }
    }
})