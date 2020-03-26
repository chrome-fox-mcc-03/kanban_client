<template>
  <section>
    <Navbar @changeCurrentPage="changeCurrentPage"></Navbar>
    <b-row id="content">
      <b-col>
        <Sidebar :mainPage="mainPage"></Sidebar>
      </b-col>
      <b-col cols="10">

        <b-row v-if="mainPage === 'projects'">
          <b-col cols="12">
            <AddProjectForm
              @addProject="addProject"
            ></AddProjectForm>
          </b-col>
          <b-col cols="10">
            <b-row v-if="!projects.length">
              <b-col cols="12" class="mx-auto">
                <h3 class="center">No project available yet. Please make one</h3>
              </b-col>
            </b-row>
            <b-row v-else>
              <ProjectCard 
                v-for="project in projects"
                :key="project.id"
                :project="project"
                @chooseProject="chooseProject"
              ></ProjectCard>
            </b-row>
          </b-col>
        </b-row>

        <b-row v-if="mainPage === 'tasks'">
          <b-col cols="12">
            <b-row>
              <Category 
                v-for="(category, i) in categories"
                :key="i"
                :category="category"  
              ></Category>
            </b-row>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
  </section>
</template>

<script>
import Axios from 'axios'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AddProjectForm from './components/AddProjectForm'
import ProjectCard from './components/ProjectCard'
import Category from './components/Category'

export default {
  name: 'MainPage',
  data () {
    return {
      mainPage: 'projects',
      categories: ['backlog', 'todo', 'on-going', 'done'],
      projects: [],
      project: {},
      tasks: [],
      members: []
    }
  },
  components: {
    Navbar,
    Sidebar,
    AddProjectForm,
    ProjectCard,
    Category
  },
  methods: {
    changeCurrentPage (page) {
      this.$emit('changeCurrentPage', page)
    },
    fetchProject () {
      Axios({
        url: 'http://localhost:3000/projects',
        method: 'GET',
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          this.projects = data.projects
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProject (projectName) {
      const token = localStorage.getItem('token')
      Axios({
        url: 'http://localhost:3000/projects/create',
        method: 'POST',
        headers: { token },
        data: { name: projectName }
      })
        .then(({ data }) => {
          console.log(data.message)
          this.fetchProject()
        })
        .catch(err => console.log(err))
    },
    chooseProject (projectId) {
      const token = localStorage.getItem('token')
      Axios({
        url: `http://localhost:3000/projects/${projectId}`,
        method: 'GET',
        headers: { token }
      })
        .then(({ data }) => {
          this.project = data.project
          this.tasks = data.project.Tasks
          this.members = data.project.Users
          this.mainPage = 'tasks' 
        })
        .catch(err => console.log(err.response.data))
    }
  },
  computed: {
  },
  created () {
    this.fetchProject()
  }
}
</script>

<style>
  #content {
   background-color: #f8f5e4;
  }
</style>