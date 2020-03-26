<template>
  <div class="row flex-row flex-sm-nowrap py-3">
      <div v-for="category in categoryList" :key="category.id" class="col-sm-6 col-md-3 col-xl-2 my-2">
          <div class="card bg-light">
              <div class="card-body">
                  <div class="mb-2 flex-row">
                      <h5 class="card-title text-uppercase text-truncate py-2 align-self d-inline">{{category.name}}
                      </h5>
                      <div class="items border border-light">
                          <div v-if="category.id == 1">
                              <form @submit.prevent="addTask">
                                  <label for="kanban">Todo</label>
                                  <input type="text" v-model="title" autofocus>
                                  <button class="btn btn-outline-primary">Add</button>
                              </form>
                          </div>
                          <div v-for="task in taskList" :key="task.id">
                              <div v-if="task.CategoryId == category.id">
                                  <div class="card shadow-sm">
                                      <div class="card-body p-2">
                                          <div class="card-title">
                                              <h6>{{task.title}}</h6>
                                          </div>
                                          <div>
                                              <small class="float-left">
                                                  <a v-if="category.id !== 1" href="#"
                                                      @click.prevent="rewind(task.id,task.CategoryId)"><i
                                                          class="fas fa-arrow-left mr-2"></i></a>
                                                  <a href="#"
                                                      @click.prevent="patch(task.id,task.CategoryId)"><i
                                                          class="fas fa-arrow-right mr-2"></i></a>
                                              </small>
                                              <small class="float-right">
                                                  <a v-if="category.id == 6" href="#"
                                                      @click.prevent="deleted(task.id)"><i
                                                          class="fas fa-trash-alt"></i></a>
                                              </small>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Axios from '../config/axios'
export default {
  name : 'Card',
  data() {
    return {
      pId : localStorage.getItem('projectId'),
      categoryList: [],
      taskList : [],
      title : '',
      userId : 0
    }
  },
  methods : {
    fetchTask() {
        const projectId = this.pId
        Axios({
            url: `/${projectId}`,
            method: 'get',
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({data}) => {
            this.taskList = data
          })
          .catch(({err}) => {
            console.log(err)
          })
      },
      fetchData() {
        Axios({
            url: "/board",
            method: 'GET',
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({data}) => {
            this.categoryList = data
          })
          .catch(({err}) => {
            console.log(err)
          })
      },
      patch(id, CategoryId) {
        CategoryId++
        Axios({
            url: `/${id}`,
            method: 'patch',
            headers: {
              token: localStorage.getItem('token')
            },
            data: {
              CategoryId
            }
          })
          .then(({data}) => {
            this.taskList = []
            this.fetchTask()
          })
          .catch(({err}) => {
            console.log(err)
          })
      },
      rewind(id, CategoryId) {
        CategoryId--
        Axios({
            url: `/${id}`,
            method: 'patch',
            headers: {
              token: localStorage.getItem('token')
            },
            data: {
              CategoryId
            }
          })
          .then(({data}) => {
            this.taskList = []
            this.fetchTask()
          })
          .catch(({err}) => {
            console.log(err)
          })
          .finally(_ => {
            this.taskList = []
            this.fetchTask()
          })
      },
      addTask() {
        const projectId = this.pId
        console.log(projectId)
        Axios({
            url: `/${projectId}`,
            method: 'post',
            headers: {
              token: localStorage.getItem('token')
            },
            data: {
              title: this.title
            }
          })
          .then(({
            data
          }) => {
            this.title = ''
            this.taskList = []
            this.fetchTask()
          })
          .catch(({
            err
          }) => {
            console.log(err)
          })
      },
      deleted(id) {
        Axios({
            url: `/${id}`,
            method: 'delete',
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({data}) => {
            this.taskList = []
            this.fetchTask()
          })
          .catch(({err}) => {
            console.log(err)
          })
      }
  },
  created() {
    this.fetchData()
    this.fetchTask()
  }
}
</script>

<style>

</style>