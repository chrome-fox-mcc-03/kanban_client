<template>
  <div class="add-div">
    <form @submit.prevent="addNewAct()" class="add-act">
      <input v-model="newActivity" type="text" placeholder="New Activity" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddForm",
  data: function() {
    return {
        newActivity: ""
    }
  }
}
</script>

<style>
</style>