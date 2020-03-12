<template>
  <div>
      <NavbarPanel
        @changePage="changePage"
        @changeActivity="changeActivity"
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
            editDescription: ''
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
            this.activity = status
        },
        editData(id, title, description){
          console.log(id)
          this.editId = id
          this.editTitle = title
          this.editDescription = description
          this.changeActivity('edit')
          console.log('masuk ke edit seharusnyaaa')
        }
    }
}
</script>

<style>

</style>