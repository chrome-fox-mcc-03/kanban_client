<template>
  <div class="container main-board">
        <div class="d-flex justify-content-between align-content-center">

            <h1 class="display-4 d-flex justify-content-center m-3">       </h1>
            <h1 
             class="display-4 d-flex justify-content-center m-3 projectTitle"

            >YOUR PROJECT</h1>
            <div class="d-flex align-content-center">
              <i
                class="fas fa-plus-circle fa-3x m-2"
                @click="create"
              ></i>
            </div>
        </div>
        <div 
         class="row categories d-flex justify-content-center flex-wrap"
        >
        
          <div
           class=""
           v-for="project in projects"
           :key="project.id"
          >
            <div class="card project m-3 project" style="width: 18rem;">
              <h5 class="card-title h3 text-center title">{{project.Project.name}}</h5>
              <div class="card-body d-flex justify-content-between align-content-center ">
                <i 
                  class="fas fa-pen fa-lg"
                  @click="edit(project.Project.id)"
                ></i>
                <!-- <button
                  @click="kanban(project.Project.id)"
                ></button> -->
                <i
                  class="far fa-list-alt fa-lg"
                  @click="kanban(project.Project.id)"
                ></i>
                <i 
                  class="fas fa-users fa-lg"
                  @click="team(project.Project.id)"
                ></i>
                <i
                  class="fas fa-trash-alt fa-lg"
                  @click="remove(project.id)"
                ></i>
              </div>
            </div>
          
          </div>
        </div>
    </div>
</template>

<script>
import axiosKanban from '../../config/index'

export default {
    name: 'ListProject',
    component: {
      
    },
    props: {
      projects: Array
    },
    methods: {
      create(){
        this.$emit('changeActivity', 'createProject')
      },
      edit(id){
        this.$emit('edit', id)
      },
      remove(id){
        console.log(id)
        axiosKanban({
          method: 'delete',
          url: `/projectusers/${id}`,
          headers: {
            access_token : localStorage.access_token
          }
        })
          .then(({data}) => {
            console.log(data)
            this.$emit('changeActivity', 'projects')
          })
          .catch(err => {
              this.$vToastify.error(err.response.data.message)
          })
      },
      kanban(id){
        console.log(id)
        axiosKanban({
          method: 'GET',
          url: `/projects/${id}`,
          headers: {
            access_token : localStorage.access_token
          }
        })
          .then(({data}) => {
            localStorage.setItem('project_id', data.project_id)
          })
          .catch(err => {
              this.$vToastify.error(err.response.data.message)
          })
        this.$emit('changeActivity', 'kanban')
      },
      team(id){
        this.$emit('team', id)
        console.log('ini akses team ++++++++++++++=')
      }
    }
}
</script>

<style>
.projectTitle{
  font-family: 'Bellota', cursive;
  font-weight: 600;
}

.project{
  background-color: #fdefc1ad;
  font-family: 'Bellota', cursive;
}

.title{
  margin-top: 18px;
  font-family: 'Open Sans', sans-serif;
}

</style>