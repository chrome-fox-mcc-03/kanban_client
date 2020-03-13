<template>
  <div>
      <NavbarPanel
        @changePage="changePage"
        @changeActivity="changeActivity"
        @project="project"
      ></NavbarPanel>

      <CreateTask
        v-if="activity === 'create'"
        @changeActivity="changeActivity"
      ></CreateTask>

      <EditTask
        v-if="activity === 'edit'"
        :editId="editId"
        :editTitle="editTitle"
        :editDescription="editDescription"
        @changeActivity="changeActivity"
      ></EditTask>

      <CategoriesPanel
        v-if="activity === 'list'"
        @editData="editData"
        @changeActivity="changeActivity"
      ></CategoriesPanel>
  </div>
</template>

<script>
import axiosKanban from '../../config/index'
import NavbarPanel from './NavbarPanel'
import CategoriesPanel from './CategoriesPanel'
import CreateTask from './CreateTask'
import EditTask from './EditTask'

export default {
    name: 'Dashboard',
    data() {
        return {
            activity: 'list',
            editId: '',
            editTitle: '',
            editDescription: '',
            editName: '',
            projects: []
        }
    },
    components: {
        NavbarPanel,
        CategoriesPanel,
        CreateTask,
        EditTask
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
              this.changeActivity('edit')
              // console.log(masuk sini)
            })
            .catch(err => {
                this.$vToastify.error(err.response.data.message)
            })
        },
        project(status){
          this.$emit('changeActivity', 'projects')
        } 
    },
    created() {
      this.fetchProject()
    }
}
</script>

<style>

</style>