<template>
    <div class="card category" style="background: #30475efa;">
        <h1 class="h3 title">{{title}}</h1>
        <TaskPanel
          :title="title"
          :allTasks="allTasks"
          @fetchTask="$emit('fetchCategory')"
          @editData="editData"
          @changeActivity="changeActivity"
          @fetchCategory="fetchCategory"
        ></TaskPanel>
    </div>
</template>

<script>
import axiosKanban from '../../config/index'
import TaskPanel from './TaskPanel'

export default {
    name: 'CategoryPanel',
    props: {
        category : Object
    },
    data(){
        return {
            title : this.category.title,
            allTasks : []
        }
    },
    watch: {
        category(val) {
            this.fetchTask()
        }
    },
    methods: {
        fetchTask(){

            console.log('KE TRIGGER NIHHH')
            axiosKanban({
                method: 'GET',
                url : '/tasks',
                headers: {
                    project_id : localStorage.getItem('project_id')
                }
            })
                .then(({data}) => {
                    console.log(data)
                    console.log(data[0])
                    let tasks = data.filter(task => task.Category.title === this.title)
                    this.allTasks = tasks
                    
                })
                .catch(err => {
                    this.$vToastify.error(err.response.data.message)
                })
        },
        changeActivity(status){
            this.$emit('changeActivity', status)
        },
        editData(id, title, description){
            this.$emit('editData', id, title, description)
        },
        fetchCategory(){
            this.$emit('fetchCategory')
        }
    },
    components: {
        TaskPanel
    },
    created() {
        this.fetchTask()
    }
}
</script>

<style>

</style>