<template>
  <div>
      <NavbarPanelProject
       v-if="activity === 'projects' || activity === 'createProject' || activity === 'editProject' || activity === 'team' "
        @changePage="changePage"
        @changeActivity="changeActivity"
      ></NavbarPanelProject>

      <ListProject
        v-if="activity === 'projects'"
       :projects="projects"
        @changeActivity="changeActivity"
        @edit="edit"
        @team="team"
      >
      </ListProject>

      <CreateProject
        v-if="activity === 'createProject'"
        @changeActivity="changeActivity"
      ></CreateProject>

      <EditProject
       v-if="activity === 'editProject'"
       :editId ="editId"
       :editName="editName"
       @changeActivity="changeActivity"
      ></EditProject>

      <Kanban 
       v-if="activity === 'kanban'"
       @changeActivity="changeActivity"
       @changePage="changePage"
      ></Kanban>

      <BoardTeam
        v-if="activity === 'team'"
        @back="back"
        :projectId="projectId"
        :members="members"
      >

      </BoardTeam>
  </div>
</template>

<script>
import axiosKanban from '../config/index'
import NavbarPanelProject from './project/NavbarPanelProject'
import ListProject from './project/ListProject'
import CreateProject from './project/CreateProject'
import EditProject from './project/EditProject'
import Kanban from './kanban/Kanban'
import BoardTeam from './team/BoardTeam'

export default {
    name: 'Dashboard',
    data() {
        return {
            activity: 'projects',
            editId: '',
            editTitle: '',
            editDescription: '',
            editName: '',
            projects: [],
            members: [],
            projectId: 0
        }
    },
    components: {
        NavbarPanelProject,
        ListProject,
        CreateProject,
        EditProject,
        Kanban,
        BoardTeam
    },
    methods: {
        changePage(status){
            localStorage.clear()
            this.$emit('changePage', status)
        },
        changeActivity(status){
          this.fetchProject()
            this.activity = status
        },
        editData(id, title, description){
          console.log(id)
          this.editId = id
          this.editTitle = title
          this.editDescription = description
          this.changeActivity('edit')
          console.log('masuk ke edit seharusnyaaa')
        },
        fetchProject(){
          axiosKanban({
            method: 'GET',
            url: '/projectusers',
            headers: {
              access_token : localStorage.access_token
            }
          })
            .then(({data}) => {
              // console.log(projectusers)
              this.projects = data
            })
            .catch(err => {
              this.$vToastify.error(err.response.data.message)
            })
        },
        edit(id){
          console.log('ini edit idnya  >>>>>>>>>>>>>>>', id )
          axiosKanban({
            method: 'GET',
            url: `/projects/${id}`,
            headers : {
              access_token : localStorage.access_token
            }
          })
            .then(({data}) => {
              this.editId = data.id
              this.editName = data.name
              this.changeActivity('editProject')
              // console.log(masuk sini)
            })
            .catch(err => {
              this.$vToastify.error(err.response.data.message)
            })
        },
        team(id){
          axiosKanban({
            method: 'GET',
            url: `/projects/${id}`,
            headers: {
              access_token : localStorage.access_token
            }
          })
            .then(({data}) => {
              this.members = data.users
              console.log(this.members)
              this.projectId = id
              console.log(this.projectId)
              this.changeActivity('team')
            })
            .catch(err => {
              this.$vToastify.error(err.response.data.message)
            })
        },
        back(status){
          this.changeActivity(status)
        }
    },
    created() {
      this.fetchProject()
    }
}
</script>

<style>

</style>