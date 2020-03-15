<template>
    <div class="homePage">
        <Navbar 
        @logout="isLogout"
        @goToTask="changePage"
        ></Navbar>
        <div class="link">
            <a href="#" id='createTodo' v-if="!createTask" @click="showForm">
                <h2 style="color: black;">Create Your First Task Here</h2>
                <img src="../assets/iconTodos.png" alt="" style="height: 150px; width: 150px">
            </a>
            <div id="form-task" v-else>
                <FormTask
                @successCreate="changePage"
                >
                </FormTask>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar'
import FormTask from './FormTask'

export default {
    name: 'HomePage',
    data () {
        return {
            createTask: false,
            form: {
                title: ''
            }
        }
    },
    components: {
        Navbar,
        FormTask 
    },
    methods: {
        isLogout(data) {
            this.$emit('logout', data)
        },
        changePage(data) {
            this.$emit(data.name, data.val)
        },
        showForm() {
            this.createTask = !this.createTask
        }
    }
}
</script>

<style>
    :root {
        --bg-primary: #D5A57E;
        --bg-secondary: #CC8652;
        --transition-speed: 600ms;
    }
    .homePage {
        background-image: url('../assets/Artboard 1.svg');
        height: 100vh;
        width: 100vw;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .link {
        display: flex; 
        height: 100vh; 
        justify-content: center; 
        align-items:center; 
        flex-direction: column;
    }
    #createTodo {
        text-decoration: none; 
        background-color: #D5A57E; 
        padding: 5px;
        border-radius: 15px 15px 30px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: var(--transition-speed);
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

    #createTodo:hover {
        filter: grayscale(0%) opacity(1);
        background: var(--bg-secondary);
        color: var(--text-secondary);
    }
</style>