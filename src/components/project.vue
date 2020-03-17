<template>
  <div class="container w-75">
      <h1> Project </h1>
      <form @submit.prevent="createProject">
        <label for="project">Add project</label>
        <input type="text" v-model="project">
        <button class="btn btn-outline-primary">Add</button>
      </form>
      <ul class="d-flex flex-column">
        <li v-for="project in projectList" :key="project.id">
         <div class="card" style="width: 18rem;">
          <img class="card">
          <div class="card-body">
            {{project.name}}
            <h5 class="card-title">{{project.name}}</h5>
              <a href="#" class="btn btn-primary" @click="projectId(project.id)">View</a>
          </div>
         </div>
        </li>
      </ul>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: "Project",
  data() {
    return {
      projectList: [],
      project: ''
    }
  },
  methods: {
    fetchProject() {
      Axios({
          url: "http://localhost:3000/project",
          method: "get",
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.projectList = data.data
        })
        .catch(({err}) => {
          console.log(err)
        })
    },
    projectId(id) {
      localStorage.setItem('projectId', id)
      this.$emit('projectId')
    },
    createProject(){
      Axios({
        url : "http://localhost:3000/addproject",
        method : "post",
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
          name : this.project
        }
      })
      .then(({data})=> {
        this.fetchProject()
        this.project = ''
      })
    }
  },
  created() {
    this.fetchProject()
  }
}
</script>

<style>
ul {
  list-style: none;
}
</style>