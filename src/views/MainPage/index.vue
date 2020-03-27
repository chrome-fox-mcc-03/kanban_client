<template>
  <section>
    <Navbar @changeCurrentPage="changeCurrentPage"></Navbar>
    <b-row id="content">
      <b-col>
        <Sidebar 
          :mainPage="mainPage"
          :members="members"
        ></Sidebar>
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
          <AddTask 
            :categories="categories"
            @addTask="addTask"
          ></AddTask>
          <b-col cols="12">
            <b-row>
              <Category 
                v-for="category in categories"
                :key="category.id"
                :category="category"
                :tasks="tasks"
                @changeCategory="changeCategory"
                @editTask="editTask"
                @deleteTask="deleteTask"  
              ></Category>
              <h3 v-if="!tasks.length">There are currently no task</h3>
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
import AddTask from './components/AddTask'

export default {
  name: 'MainPage',
  data () {
    return {
      mainPage: 'projects',
      isEdit: false,
      categories: [],
      projects: [],
      project: {},
      tasks: [],
      taskEdit: {},
      users: [],
      members: []
    }
  },
  components: {
    Navbar,
    Sidebar,
    AddProjectForm,
    ProjectCard,
    Category,
    AddTask
  },
  methods: {
    changeCurrentPage (page) {
      this.$emit('changeCurrentPage', page)
    },
    fetchCategory () {
      Axios({
        url: 'http://localhost:3000/categories',
        method: 'GET'
      })
        .then(({ data }) => {
          this.categories = data.categories
        })
        .catch(err => console.log(err.response.data))
    },
    fetchMembers () {
      const ProjectId = this.project.id
      const token = localStorage.getItem('token')
      Axios({
        url: `http://localhost:3000/members/${ProjectId}`,
        method: 'GET',
        headers: { token }
      })
        .then(({ data }) => {
          this.members = data.users
        })
        .catch(err => console.log(err.response.data))
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
          this.users = data.project.Users
          this.mainPage = 'tasks' 
          this.fetchCategory()
          this.fetchMembers()
        })
        .catch(err => console.log(err.response.data))
    },
    fetchTask () {
      const token = localStorage.getItem('token')
      const ProjectId = this.project.id
      Axios({
        url: 'http://localhost:3000/tasks',
        method: 'GET',
        headers: { token, ProjectId }
      })
        .then(({ data }) => {
          this.tasks = data.tasks
        })
        .catch(err => console.log(err.response.data))
    },
    addTask (payload) {
      const token = localStorage.getItem('token')
      const ProjectId = this.project.id
      const { name, description, category } = payload
      console.log(name, description, category, ProjectId, 'ini payloaddddddddddddddddddddd')
      Axios({
        url: 'http://localhost:3000/tasks',
        method: 'POST',
        headers: { token, ProjectId },
        data: { name, description, CategoryId: category, ProjectId }
      })
        .then(({ data }) => {
          this.fetchTask()
        })
        .catch(err => console.log(err.response.data))
    },
    changeCategory (taskId, newCategoryId) {
      const token = localStorage.getItem('token')
      const ProjectId = this.project.id
      Axios({
        url: `http://localhost:3000/tasks/${taskId}/category`,
        method: 'PATCH',
        headers: { token, ProjectId },
        data: { CategoryId: newCategoryId }
      })
        .then(({ data }) => {
          console.log(data)
          this.fetchTask()
        })
        .catch(err => console.log(err.response.data))
    },
    editTask (taskId) {
      const token = localStorage.getItem('token')
      const ProjectId = this.project.id
      Axios({
        url: `http://localhost:3000/tasks/${taskId}`,
        method: 'GET',
        headers: { token, ProjectId }
      })
      .then(({ data }) => {
        console.log(data.task)
        this.isEdit = true
        this.taskEdit = data.task
      })
      .catch(err => console.log(err.response.data))
    },
    deleteTask (taskId) {
      const token = localStorage.getItem('token')
      const ProjectId = this.project.id
      Axios({
        url: `http://localhost:3000/tasks/${taskId}/delete`,
        method: 'DELETE',
        headers: { token, ProjectId }
      })
      .then(({ data }) => {
        console.log(data)
        this.fetchTask()
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