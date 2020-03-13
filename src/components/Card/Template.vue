<template>
  <div class="template">
    <div class="title">
      <h1>{{category}}</h1>
    </div>
    <div class="category">
      <card :categoryId="categoryId" :groupId="groupId"></card>
    </div>
    <sui-dimmer :active="active">
      <sui-loader indeterminate>Please wait...</sui-loader>
    </sui-dimmer>
  </div>
</template>

<script>
import Card from './Card'

export default {
  Name: 'Card',
  components: {
    Card
  },
  data () {
    return {
      active: false,
      tasks: []
    }
  },
  props: {
    category: String,
    groupId: Number,
    categoryId: Number
  }
}
</script>

<style>

</style>