<template>
          <div>
            <h5>{{category.name}}</h5>
            <ul>
                <li v-if="category.id == 1">
                    <form @submit.prevent="addTask()">
                        <label for="kanban">Todo</label>
                        <input type="text" v-model="title" autofocus>
                        <button type="button" class="btn btn-outline-primary">Add</button>
                    </form>
                </li>
                <li v-for="task in taskList" :key="task.id">
                    <div class="card">
                        <div class="card-body">
                            <h5>{{task.title}}</h5>
                            <a v-if="category.id !== 1" href="#" class="btn btn-primary" @click.prevent="rewind(task.id,task.CategoryId)">back</a>
                            <a href="#" class="btn btn-primary" @click.prevent="patch(task.id,task.CategoryId)">next</a>
                        </div>
                     </div>
                </li>
            </ul>
          </div>
</template>

<script>
import Axios from 'axios'
export default {
    name : "category",
    props : [
        'category'
    ],
    data () {
        return {
            pId : localStorage.getItem('projectId'),
            taskList : [],
            categoryId : this.category.id,
            title : ''
        }
    },
    methods : {
        fetchTask(){
            const projectId = this.pId
            Axios({
                url : `http://localhost:3000/${projectId}`,
                method : 'get',
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=> {
                data.forEach(el => {
                    if (el.CategoryId == this.categoryId){
                        this.taskList.push(el)
                    }
                })
            })
            .catch(({err})=> {
                console.log(err)
            })
        },
        patch(id,CategoryId){
            CategoryId++
            Axios({
                url : `http://localhost:3000/${id}`,
                method : 'patch',
                headers : {
                    token : localStorage.getItem('token')
                },
                data : {
                    CategoryId
                }
            })
            .then(({data})=> {
                // console.log(data)
                this.taskList = []
                this.fetchTask()
            })
            .catch(({err})=> {
                console.log(err)
            })
        },
        rewind(id,CategoryId){
            CategoryId--
            Axios({
                url : `http://localhost:3000/${id}`,
                method : 'patch',
                headers : {
                    token : localStorage.getItem('token')
                },
                data : {
                    CategoryId
                }
            })
            .then(({data})=> {
                // console.log(data)
                this.taskList = []
                this.fetchTask()
            })
            .catch(({err})=> {
                console.log(err)
            })
        },
        addTask(){
            console.log('hai')
          const projectId = this.pId
          Axios({
                url : `http://localhost:3000/${projectId}`,
                method : 'post',
                headers : {
              token : localStorage.getItem('token')
            },
            data : {
              title : this.title
            }
          })
            .then(({data})=> {
              console.log(data)
              this.title = ''
              this.fetchTask()
            })
            .catch(({err})=> {
              console.log(err)
            })
        }
    },
    created(){      
        this.fetchTask()
    }
}
</script>

<style>
.category {
    width: 10vw !important;
}
</style>