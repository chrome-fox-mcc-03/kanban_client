// const axios = require("axios")

let app = new Vue({
    el: "#app",
    data: {
        msgError: '',
        msgSuccess: '',
        message: '',
        categories: ["backlog", "requested", "wip", "done"],
        userCreds: {
            id: 0,
            email: '',
            password: ''
        },
        taskCreds: {
            title: '',
            category: '',
            ownerId: 0,
            members: [],
            dueDate: new Date()
        },
        arrTasks: null,
        tasks: {
            "backlog": [],
            "requested": [],
            "wip": [],
            "done": []
        },
        // token: '',
        payload: {
            id: 0,
            email: ''
        },
        token: '',
        isLogin: false
    },
    methods: {

        getAll: function() {

            // get token
            //.then(response => {
                // this.tasks
            // })
            // this.token = localStorage.getItem("token")

            // if(this.token) {

            /* 
                axios({
                    method: 'get',
                    url: 'http://localhost:3000/tasks/',
                    data: {

                    },
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });            
            */
           axios({
                method: 'get',
                url: 'http://localhost:3000/tasks/',
                data: {

                },
                headers: {
                    token: localStorage.getItem("token")
                }
            })   
                .then(response => {
                    console.log("READ ALL RESPONSE ARRAY IS");
                    console.log(response.data.data);
                    this.arrTasks = response.data.data
                        /* 

                        // ASSIGN TASKS BASED ON CATEGORY
                        response.forEach(el => {
                            if(tasks)
                        })
                        
                        */
                })
                .catch(err => {
                    console.error(err)
                    this.msgError = err
                })

            // } else {
            //     isLogin = false
            // }
        },

        register: function() {
            axios.post("http://localhost:3000/users/signup", {
                email: this.userCreds.email,
                password: this.userCreds.password
            })
            .then(response => {
                console.log(response);
                this.msgSuccess = "REGISTER SUCCESS. PLEASE CLOSE THIS PAGE, THEN LOGIN."
            })
            .catch(err => {
                console.error(err)
                this.msgError = err
            })
        },

        login: function() {

            // grab email, password
            //axios
            //isLogin == true
            // if login =? get all data,
            // event.preventDefault()
            // alert("MASUK")
            axios.post("http://localhost:3000/users/login", {
                email: this.userCreds.email,
                password: this.userCreds.password
            })
            .then(response => {
                // this.isLogin = true
                console.log("MASUK LOGIN CLIENT");
                console.log("RESPONSE IS");
                console.log(response);
                console.log("RESPONSE TOKEN IS");
                console.log(response.data.token);
                localStorage.setItem('token', response.data.token) // GENERATE TOKEN
                this.token = response.data.token
                this.isLogin = true
                // created()
                this.getAll()

            })
            .catch(err => {
                // arr = JSON.parse(err.responseText).message
                console.log(err);
            })

        }

    },
    watch: {

    },
    computed: {
        
        parseDate: function() {
            return new Date(this.taskCreds.dueDate).toISOString().slice(0,10)
        }

    },
    created() {
        if(this.isLogin) {
            this.getAll()
        }
    }

})