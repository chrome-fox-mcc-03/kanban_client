<template>
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <p>{{ task.title }}</p>
            </div>
            <div class="card-action">
                <div class="col s2">
                    <a v-if="task.category != 'backlog'" @click="moveCategory('backward', task)" class="waves-effect waves-light btn-small" href="#"> <i class="large material-icons">arrow_back</i></a><a class="waves-effect waves-teal btn-small" href="#"> <i class="large material-icons">edit</i></a><a class="waves-effect waves-yellow btn-small" hlightref="#"> <i class="large material-icons">delete</i></a><a  v-if="task.category != 'completed'" @click="moveCategory('forward', task)" class="waves-effect waves-light btn-small" href="#"> <i class="large material-icons">arrow_forward</i></a>
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

        }
    },
    methods : {
        moveCategory(where, task){
            const id = task.id ;
            const title = task.title ;
            const category = task.category ;
            const categories = [ 'backlog' , 'todo', 'done', 'completed' ] ;

            if (where == 'forward') {
                const newIndex = categories.indexOf(category) ;
                const newCategory = categories[newIndex+1] ;
                axios({
                    method : 'put',
                    url : `http://localhost:3000/tasks/${id}`,
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
                    })

                    .catch((error)=>{
                        console.log(error.response.data.errorMessage);
                    })


            } else if (where == 'backward') {
                const newIndex = categories.indexOf(category) ;
                const newCategory = categories[newIndex-1] ;
                axios({
                    method : 'put',
                    url : `http://localhost:3000/tasks/${id}`,
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
                    })

                    .catch((error)=>{
                        console.log(error.response.data.errorMessage);
                    })

            }
        }
    }
}
</script>

<style>

</style>