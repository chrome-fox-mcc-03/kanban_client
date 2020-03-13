<template>
    <div>
        <Navbar
            :token="token" 
            :isLogin="isLogin"
            @addNewTask="createTask"
            @editTaskInList="editTask"
            @dropTaskFromList="deleteTask"
            
        ></Navbar>

        <!-- <Dashboard
            :categories="categories"
            :tasks="tasks"
        ></Dashboard> -->
    </div>
    
</template>

<script>
import Navbar from "./components/Navbar.vue"
import LandingPage from "./components/LandingPage.vue"
// import Dashboard from "./components/Dashboard.vue"
export default {
    name: "",
    data: function() {
        return {
            // token: "",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNTg0MDY5Njg5fQ.6ExCJr0R8YrywMop4nnHdKC079NhjshgJQK71QZy_Sw",
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
            isLogin: true,
            categories: ["backlog", "requested", "wip", "done"]
        }
    },
    components: {
        Navbar,
        // Dashboard
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
                this.fetchTasks()

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
                .then(({data})=>{
                    console.log("FETCHING SUCCESS");
                    console.log(data);
                    this.tasks = data
                })
                .catch ((error)=>{
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
                .then(({data})=>{
                    console.log("CREATE SUCCESS");
                    this.tasks = data.data
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
                .then(({data})=>{
                    console.log("EDIT SUCCESS");
                    this.tasks = data.data
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
        }

    }

}
</script>

<style>

</style>