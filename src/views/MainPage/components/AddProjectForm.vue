<template>
  <b-col cols="4" class="mx-auto">
    <div class="text-center">
      <b-card title="Add Project" border-variant="warning" sub-title="Create new project">
            
        <b-form id="project-form" @submit.prevent="onSubmit" @reset.prevent="onReset">
          <b-form-group
            label="Project Name"
            label-for="project-name"
          >
            <b-form-input
              id="project-name"
              v-model="projectName"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="warning" pill>Add Project</b-button>
        </b-form>
      </b-card>
    </div>
  </b-col>
</template>

<script>
export default {
  name: 'AddProjectForm',
  data () {
    return {
      projectName: ''
    }
  },
  methods: {
    onSubmit() {
      console.log(this.projectName)
      this.$emit('addProject', this.projectName)
    },
    onReset() {
      this.form.email = ''
      this.form.password = ''

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style>

</style>