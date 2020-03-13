<template>
  <section>
    <Navbar></Navbar>
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
                v-for="(coba, i) in 4"
                :key="i"
              ></ProjectCard>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AddProjectForm from './components/AddProjectForm'
import ProjectCard from './components/ProjectCard'

export default {
  name: 'MainPage',
  components: {
    Navbar,
    Sidebar,
    AddProjectForm,
    ProjectCard
  }
}
</script>

<style>
  #content {
   background-color: #f8f5e4;
  }
</style>