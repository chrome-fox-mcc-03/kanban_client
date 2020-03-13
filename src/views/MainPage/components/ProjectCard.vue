<template>
  <b-col id="project-card" cols="6">
      <b-card
        header="Project"
        header-tag="header"
        title="Project Name"
        border-variant="warning"
      >
        <b-card-text>Project Description</b-card-text>
        <b-button @click.prevent="chooseProject" variant="warning">Choose Project</b-button>
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
  
  methods: {
    chooseProject () {
      console.log('masook')
    }
  }

}
</script>

<style scoped>
  #project-card {
    padding: 1vh 1vw;
  }
</style>