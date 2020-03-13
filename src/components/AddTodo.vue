<template>
    <form @submit.prevent="addProject">
        <div class="add-todo">
            <div>
                <input v-model="title" id="addProjectField" type="text" placeholder="add new project..." style="width: 10vw; height: 1vh;">
            </div>
            <div>
                <button type="submit" popover-top="Add new task" class="btn-small paper-btn"><i class="fas fa-plus"></i></button>
            </div>
        </div>
    </form>
</template>

<script>

import axios from 'axios'

export default {
    name : "AddTodo",
    data () {
        return {
            title : ''
        }
    },
    methods : {
        addProject : function(){
            const addTitle = this.title
            const addCategory = 'backlog'
            
            const access_token = localStorage.getItem('access_token')
            axios({
                method : 'POST',
                url : `http://localhost:3000/task`,
                headers : {
                    access_token
                },
                data : {
                    title : addTitle,
                    category : addCategory
                }
            })
            .then((todoCreated) => {
                // console.log(todoCreated);
                this.$emit('fetchTodo')
            }).catch((err) => {
                console.log(err);
                
            });

        },
    }
}
</script>

<style>
.add-todo {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: baseline;
}
</style>