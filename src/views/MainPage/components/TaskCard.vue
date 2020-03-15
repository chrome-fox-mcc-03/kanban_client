<template>
  <b-row id="task-card">
    <b-col cols="12">
      <b-card
        title="Task Name"
        tag="article"
        class="mx-auto"
      >
        <b-card-text>
          Task description
        </b-card-text>

        <b-button href="#" variant="primary">Delete</b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {

}
</script>

<style>
  #task-card {
    padding: 1vh 0;
  }
</style>