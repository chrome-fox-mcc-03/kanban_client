const axios = require("axios")

let app = new Vue({
    el: "#app",
    data: {
        msgError: '',
        msgSuccess: '',
        message: '',
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
        tasks: {
            "backlog": [],
            "requested": [],
            "wip": [],
            "done": []
        },
        token: '',
        payload: {
            id: 0,
            email: ''
        },
        token: localStorage.getItem("token"),
        isLogin: false
    },
    methods: {

        getAll: (event) => {

            // get token
            //.then(response => {
                // this.tasks
            // })

            if(this.token && this.isLogin) {
                axios.get("http://localhost:4000/tasks/")
                    .then(response => {
                        console.log(response);

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

            } else {
                isLogin = false
            }
        },

        register: (event) => {
            event.preventDefault()
            axios.post("http://localhost:4000/signup", {
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

        login: function(event) {

            // grab email, password
            //axios
            //isLogin == true
            // if login =? get all data,
            event.preventDefault()
            axios.post("http://localhost:4000/login", {
                email: this.userCreds.email,
                password: this.userCreds.password
            })
            .then(response => {
                this.isLogin = true
                console.log(response);
                localStorage.setItem('token', response.token) // GENERATE TOKEN
            })
            .catch(err => {
                arr = JSON.parse(err.responseText).message
                console.log(arr);
            })

        }

    },
    watch: {

    },
    computed: {
        
        parseDate: function() {
            return new Date(this.taskCreds.dueDate).toISOString().slice(0,10)
        }

    }

})