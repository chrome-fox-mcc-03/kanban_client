<template>
<div class="main-card-container" >
    <br>
    <div class="card mt-1 border border-5 border-primary">
        <div class="left-content">
            <div v-if="editForm === false" class="title-container">
                <h6>{{task.title}}</h6>
            </div>
            <form v-else-if="editForm === true">
                <input class="editField" type="text" v-model="title" placeholder="type..." value="[edited]">
            </form>
            <div class="d-flex flex-row">
                    <button v-if="deleteForm === false && editForm === false" type="submit" class="btn-small" @click="deleteChanger">delete</button>
                    
                    <button v-if="editForm === false && deleteForm === false" type="submit" class="btn-small" @click="editChanger">edit</button>
                <form @submit.prevent="editTask(task, 'none')" v-else-if="editForm === true">
                    <button class="btn-small" @click="cancelEdit">cancel</button>
                    <button type="submit" class="btn-small">save</button>
                </form>

                <form v-if="deleteForm === true" class="d-flex flex-row" @submit.prevent="deleteTask(task.id)">
                    <button class="btn-small" @click="cancelDelete">cancel</button>
                    <button type="submit" class="btn-small">delete</button>
                </form>

            </div>
        </div>

        <div class="right-content d-flex flex-column ml-5 pl-3">
            <span v-if="task.category !== 'backlog'" v-on:click.prevent="editTask(task, 'prev')"><h6 class="paper-btn btn-small"> prev </h6></span>
            <span v-if="task.category !== 'done'" v-on:click.prevent="editTask(task, 'next')"><h6 class="paper-btn btn-small"> next </h6></span>
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
            editForm : false,
            deleteForm : false
         }
    },
    methods : {
        editChanger : function() {
            this.editForm = true
        },
        deleteChanger : function() {
            this.deleteForm = true
        },
        cancelDelete : function() {
            this.deleteForm = false
        },
        cancelEdit : function() {
            this.editForm = false
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
                this.deleteForm = false
                
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
    height: 15vh;
    max-width: 50vw;
    max-height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-evenly;
    margin-bottom: 5%;
}

.title-container {
    justify-self: start;
    padding-bottom: 1.5rem;
}

.left-content {
    max-width: 10vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: auto;
    text-overflow: ellipsis;
    margin-left: 5%;
    padding-bottom: 10px;
}

.right-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    margin-right: 5%;
    width: fit-content;
}

.user-photo{
    align-self: flex-end;
    justify-self: flex-end;
}

.phase-body {
    margin-top: 0px;
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: baseline;
}

</style>