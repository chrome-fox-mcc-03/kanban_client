<template>
    <div>
        <Navbar 
        @logout="isLogout"
        @goToHome="changePage"
        ></Navbar>
        <div
        v-if="!showModal"
        class="taskPage">
            <div id="task" class="row flex-row flex-sm-nowrap py-3">
                <ContainerTask
                v-for="(category, i) in categories" :key="i"
                :title="category"
                :tasks="tasks"
                @fetchData="fetchData"
                @show="show"
                @fetchTask="fetchTask"
                >
                </ContainerTask>
            </div>
        </div>
        <div>
            <b-modal id="task-create" hide-footer>
                <FormTask
                @fetchData="fetchData"
                id="formCreate"
                >
                </FormTask>
            </b-modal>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar'
import ContainerTask from './ContainerTask'
import Axios from 'axios'
import FormTask from './FormTask'
import FormUpdate from './FormUpdate'

export default {
    name: 'Task',
    data () {
        return {
            categories: ['backlog', 'product', 'development', 'complete'],
            tasks: [],
            showModal: false,
            title: '',
            description: ''
        }
    },
    components: {
        Navbar,
        ContainerTask,
        FormTask,
        FormUpdate
    },
    methods :{
        fetchTask(data) {
            console.log(data)
            this.title = data.title,
            this.description = data.description
        },
        isLogout(data) {
            this.$emit('logout', data)
        },
        changePage(data) {
            this.$emit(data.name, data.val)
        },
        fetchData() {
            Axios({
                method: 'get',
                url: 'https://serene-waters-25786.herokuapp.com/task',
                headers: {
                    token: localStorage.token
                }
            })
                .then(data => {
                    this.tasks = data.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        show(data) {
            this.showModal = data
        }
    },
    created() {
        this.fetchData()
    }
}
</script>

<style>
#form {
    z-index: 99;
}

.modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.title {
    display: flex;
    align-items: center;
}
.card-body {
    border-radius: 15px;
}
.p-2 {
    margin-top: 10px;
    background: rgb(223, 223, 223);
}
#container {
    background: rgb(219, 219, 219);
    border-radius: 15px;
}

#form-task {
    font-weight: bolder;
    background-color: #D5A57E; 
    padding: 10px 50px 50px 50px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#task {
    margin-left: 80px;
    margin-right: 30px;
}

.mt-3 {
    display: flex;
    justify-content:center;
}




</style>