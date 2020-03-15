<template>
  <section>
    <Navbar @changeCurrentPage="changeCurrentPage"></Navbar>
    <b-row id="content">
      <b-col>
        <Sidebar></Sidebar>
      </b-col>
      <b-col cols="10">
        <b-row>
          <b-col cols="10">
            <AddProjectForm></AddProjectForm>
          </b-col>
          <b-col cols="10">
            <b-row>
              <ProjectCard 
                v-for="project in getProjects"
                :key="project.id"
              ></ProjectCard>
            </b-row>
          </b-col>
          <b-col cols="10">
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
      categories: ['backlog', 'todo', 'on-going', 'done'],
      projects: []
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
          
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  computed: {
    getProjects () {
      if (!this.projects.length) return 'No nn going project. Please add a project'
      else return this.projects
    }
  }
}
</script>

<style>
  #content {
   background-color: #f8f5e4;
  }
</style>