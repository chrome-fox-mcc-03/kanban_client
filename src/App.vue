<template>
    <div>
        <Navbar
            :token="token" 
            :isLogin="isLogin"
            @addNewTask="createTask"
            @dropTaskFromList="deleteTask"
            @logout="logout"

            
        ></Navbar>

        <Dashboard
            :categories="categories"
            :tasks="sortedTasks"
            @editTaskById="editTask"
            v-if="isLogin === true"

        ></Dashboard>

    </div>
    
</template>

<script>
import Navbar from "./components/Navbar.vue"
import LandingPage from "./components/LandingPage.vue"
import Dashboard from "./components/Dashboard.vue"
export default {
    name: "App",
    data() {
        return {
            // token: "",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNTg0MDkyOTI0fQ.bc0sRTcQrgurWTe3g5JN-5tPKZfHRfaUs9B05vZGVcY",
            taskCreds: {
                "id": 0,
                "title": "",
                "category": "requested",
                "due_date": new Date(),
                "UserId": 0
            },
            userCreds: {
                "email": "",
                "password": ""
            },
            sortedTasks: {
                "backlog": [],
                "requested": [],
                "wip": [],
                "done":[]
            },
            tasks: [],
            task: [],
            isLogin: true,
            categories: ["backlog", "requested", "wip", "done"]
        }
    },
    components: {
        Navbar,
        Dashboard
    },
    methods: {
        login(userCreds) {
            const email = userCreds.email
            const password = userCreds.password

            axios.post("http://localhost:3000/users/login", {
                email: email,
                password: email
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

            })
            .catch(err => {
                // arr = JSON.parse(err.responseText).message
                console.log(err);
            })
        },

        signup() {

        },

        fetchTasks() {

            console.log(">>ENTERING APP.VUE FETCH TASKS<<");
            axios({
                method : 'get',
                url : `http://localhost:3000/tasks/`,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
                .then((response)=>{
                    console.log("FETCHING SUCCESS");
                    console.log(response);
                    this.sortedTasks = response.data.data
                    this.tasks = response.allData
                })
                .catch ((error)=>{
                    console.log(error)
                    console.log("FETCHING FAILS");
                    console.log(error.response.data.errorMessage);
                })
        },

        createTask(dataFromChild) {
            console.log(">>ENTERING APP.VUE CREATE TASK<<");
            console.log("CHILD EMITS");
            console.log(dataFromChild);
            axios({
                method : 'post',
                url : `http://localhost:3000/tasks/`,
                headers : {
                    // token : localStorage.getItem('token')
                    token: this.token
                },
                data:dataFromChild
            })
                .then((response)=>{
                    console.log("CREATE SUCCESS");
                    this.task = response.data
                    console.log(this.task);
                    this.fetchTasks()
                })
                .catch ((error)=>{
                    console.log("CREATE FAILS");
                    console.log(error.response.data.errorMessage);
                })
        },


        editTask(dataFromChild) {
            console.log(">>ENTERING APP.VUE EDIT TASK<<");
            console.log("CHILD EMITS");
            console.log(dataFromChild);
            axios({
                method : 'put',
                url : `http://localhost:3000/tasks/${dataFromChild.id}`,
                headers : {
                    // token : localStorage.getItem('token')
                    token: this.token
                },
                data:dataFromChild
            })
                .then((response) => {
                    console.log("EDIT SUCCESS");
                    this.task = response.data
                    console.log(this.task);
                    this.fetchTasks()
                })
                .catch ((error)=>{
                    console.log("EDIT FAILS");
                    console.log(error.response.data.errorMessage);
                })
        },


        deleteTask(dataFromChild) {
            console.log(">>ENTERING APP.VUE DELETE TASK<<");
            console.log("CHILD EMITS");
            console.log(dataFromChild);
            axios({
                method : 'delete',
                url : `http://localhost:3000/tasks/${dataFromChild}`,
                headers : {
                    // token : localStorage.getItem('token')
                    token: this.token
                },
                data:dataFromChild
            })
                .then(({data})=>{
                    console.log("DELETE SUCCESS");
                })
                .catch ((error)=>{
                    console.log("DELETE FAILS");
                    console.log(error.response.data.errorMessage);
                })
        },


        logout(dataFromChild) {
            this.isLogin = false
            localStorage.clear()
        }

    },
    created() {
        // if(localStorage.getItem("token")) {
        //     this.isLogin = true
        //     this.fetchTasks()
        // } else {
        //     this.isLogin = false
        // }
        this.fetchTasks()
    }

}
</script>

<style>

</style>