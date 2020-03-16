<template>
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <p>{{ task.title }}</p>
            </div>
            <div class="card-action">
                <div class="col s2">
                    <a v-if="task.category != 'backlog'" @click.prevent="moveCategory('backward', task)" class="waves-effect waves-light btn-small" href="#"> <i class="large material-icons">arrow_back</i></a>
                    <a @click="showEditForm(task.title)" class="waves-effect waves-teal btn-small" href="#"> <i class="large material-icons">edit</i></a>
                    <a @click="deleteTask(task.id)"  class="waves-effect waves-yellow btn-small" hlightref="#"> <i class="large material-icons">delete</i></a>
                    <a v-if="task.category != 'completed'" @click="moveCategory('forward', task)" class="waves-effect waves-light btn-small" href="#"> <i class="large material-icons">arrow_forward</i></a>
                </div>
                <div v-show="this.editForm" class="edit-form">
                    <form @submit.prevent="editTask(task.id, task.category)" >
                        <input id="title-edit" type="text" class="validate" v-model="editTitle">
                        <a @click.prevent="editTask(task.id, task.category)" class="waves-effect waves-light btn-small" href="#"> <i class="material-icons">check_circle</i></a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : 'TaskItem',
    props : ['task'],
    data () {
        return {
            editForm : false,
            editTitle : ''
        }
    },
    methods : {
        moveCategory(where, task){
            const id = task.id ;
            const title = task.title ;
            const category = task.category ;
            const categories = [ 'backlog' , 'todo', 'done', 'completed' ] ;
            const index = categories.indexOf(category) ;
            let newCategory = '';

            if (where == 'forward') {
                newCategory = categories[index+1] ;
            } else if (where == 'backward') {
                newCategory = categories[index-1] ;
            }
                axios({
                    method : 'put',
                    url : `https://murmuring-wave-98333.herokuapp.com/tasks/${id}`,
                    data : {
                        title : title,
                        category : newCategory
                    },
                    headers : {
                        access_token : localStorage.getItem('access_token')
                    }
                })
                    .then (({data})=> {
                        console.log('sukses');
                        this.$emit('fetchData') ;
                    })

                    .catch((error)=>{
                        this.errorMessage.isError = true ;
                        this.errorMessage.messages = ['Failed to move category'] ;
                    })
        },
        deleteTask(id){
            this.$emit('deleteTask', id)
        },
        showEditForm(data){
            this.editTitle = data
            this.editForm = !this.editForm
        },
        editTask(idToEdit, currentCategory){
            const id = idToEdit ;
            const title = this.editTitle ;
            const category = currentCategory ;
            console.log(id, title, category);

            axios({
                method : 'put' ,
                url : `https://murmuring-wave-98333.herokuapp.com/tasks/${id}`,
                data : {
                    title,
                    category
                },
                headers : {
                    access_token : localStorage.getItem('access_token')
                }
            })
                .then(({data})=> {
                    this.$emit('fetchData') ;
                    this.editTitle = '' ;
                    this.editForm  = false ;
                    this.errorMessage.isError = false ;
                })
                .catch((error)=>{
                    // console.log(error.response.data.message);
                    let messages = error.response.data.message
                    this.$emit('getMessages', messages)
                })
        }
    }
}
</script>

<style scoped> 


</style>