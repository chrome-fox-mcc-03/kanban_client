<template>
  <div>
      <h1>{{task.category}}</h1>
      <p>descriotion</p>
      <button @click="panggilBapak">click</button>
  </div>
</template>

<script>
export default {
    name : 'Kartu',
    props: ['task'],
    methods: {
        panggilBapak() {
            this.$emit('panggil','haiiii dari anak')
        }
    }
}
</script>

<style>

</style>