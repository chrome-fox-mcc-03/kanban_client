<template>
<div class="main-card-container" >
    <br>
    <div popover-top="Click on title to edit" class="card mt-1 border border-5 border-primary">
        <div class="left-content" >
            <h6  v-on:click="editChanger" v-if="editForm === false">{{task.title}}</h6>
            <form v-else-if="editForm === true">
                <input class="editField" type="text" v-model="title" placeholder="edit your data.." value="[edited]">
            </form>
        </div>
        <div class="right-content">
            <form @submit.prevent="deleteTask(task.id)">
                <button type="submit" class="btn-small">delete</button>
            </form>
            <form @submit.prevent="editTask(task, 'none')">
                <button type="submit" class="btn-small">edit</button>
            </form>
        </div>
    <div>
        <a v-if="task.category !== 'backlog'" href="#" v-on:click.prevent="editTask(task, 'prev')" ><h6> prev </h6></a>
        <a v-if="task.category !== 'done'" href="#" v-on:click.prevent="editTask(task, 'next')"><h6> next </h6></a>
    </div>
    </div>
</div>
</template>

<script>

import axios from 'axios'

export default {
    name : 'Card',
    props : ['task'],
    data () {
        return {
            showBacklogs : [],
            title : '',
            category : '',
            editForm : false
         }
    },
    methods : {
        editChanger : function() {
            this.editForm = true
        },
        deleteTask : function(id){
            
            const access_token = localStorage.getItem('access_token')
            
            axios({
                method : 'DELETE',
                url : `http://localhost:3000/task/${id}`,
                headers : {
                    access_token
                }
            })
            .then((result) => {
                this.$emit('fetchTodo')
                
            }).catch((err) => {
                console.log(err);
            });
        },
        editTask : function(task, whereTo){
            let editTitle = ''
            const access_token = localStorage.getItem('access_token')
            const categories = [
                'backlog', 'product', 'development', 'done'
            ]
            const index = categories.indexOf(task.category)
            let newCategory = ''
            if(whereTo == 'next'){
                editTitle = task.title
                newCategory = categories[index + 1]
            } else if(whereTo == 'prev') {
                editTitle = task.title
                newCategory = categories[index - 1]
            }else{
                editTitle = this.title
                newCategory = categories[index]
            }
            axios({
                method: 'PUT',
                url : `http://localhost:3000/task/${task.id}`,
                headers : {
                    access_token
                },
                data : {
                    title : editTitle,
                    category : newCategory
                }
            })
            .then(({data}) => {
                this.$emit('fetchTodo')
                this.editForm = false
                
            }).catch((err) => {
                console.log(err);
            });

        }
    }
}
</script>

<style scoped>

.editField {
    border: none;
    width: 5vw;
}

.card {
    width: 15vw;
    height: 10vh;
    max-width: 50rem;
    max-height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}

.left-content {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: flex-start;
}

.right-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-top: 10px;
}

.user-photo{
    align-self: flex-end;
    justify-self: flex-end;
}

.phase-body {
    margin-top: 0px;
    height: 85vh;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: baseline;
}

</style>