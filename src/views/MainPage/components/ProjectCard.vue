<template>
  <b-col id="project-card" cols="6">
      <b-card
        :header="`${project.id}`"
        header-tag="header"
        :title="project.name"
        border-variant="warning"
      >
        <b-button @click.prevent="chooseProject(project.id)" variant="warning">Choose Project</b-button>
      </b-card>
  </b-col>
</template>

<script>
export default {
  name: 'ProjectCard',
  data () {
    return {

    }
  },
props: {
  project: Object
},
  methods: {
    chooseProject (projectId) {
      this.$emit('chooseProject', projectId)
    }
  }

}
</script>

<style scoped>
  #project-card {
    padding: 1vh 1vw;
  }
</style>