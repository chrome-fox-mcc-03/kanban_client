<template>
  <div class="bg-app-page vw-100 vh-100 register-form-container">
    <div class="bg-app-nav m-2 p-2 rounded text-center">
      <form>
        <h6 class="text-light">Edit</h6>
        <div class="form-group">
          <input v-model="description" type="text" class="form-control">
          <small class="form-text text-white">Description</small>
        </div>
        <div class="form-group">
          <input v-model="date" type="date" class="form-control"
            :min="todayDate"
          >
          <small class="form-text text-white">Date</small>
        </div>
        <div class="form-group">
          <select v-model="priority" class="form-control" >
              <option v-for="(opt, i) in prioritylist" :key="i" :value="opt">{{ opt }}</option>
          </select>
          <small class="form-text text-white">Priority</small>
        </div>
        <div class="form-group">
          <select v-model="category" class="form-control" >
              <option v-for="(opt, i) in categories" :key="i" :value="opt">{{ opt }}</option>
          </select>
          <small class="form-text text-white">Category</small>
        </div>
        <div id="register-message"></div>
        <input 
          @click.prevent="edit" 
          type="submit" 
          class="btn status-green" 
          value="Edit"
        >
        <input 
          @click.prevent="showDashboard" 
          type="submit" 
          class="btn status-green" 
          value="Back"
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      priority: '',
      date: '',
      description: '',
      category: ''
    }
  },
  props: {
    prioritylist: Array,
    editObj: Object,
    categories: Array
  },
  methods: {
    showDashboard () {
      this.$emit('showDashboard')
    },
    edit () {
      const newObj = {
        id: this.id,
        due_date: this.date,
        description: this.description,
        status: this.category,
        priority: this.priority
      }
      // console.log(newObj)
      this.$emit('submitEdit', newObj)
    }
  },
  computed: {
    todayDate: function() {
      return new Date().toISOString().split("T")[0]
    }
  },
  created () {
    console.log(this.editObj)
    this.id = this.editObj.id
    this.date = this.editObj.due_date.split("T")[0]
    this.description = this.editObj.description
    this.priority = this.editObj.priority
    this.category = this.editObj.status
  },
  name: 'edit-item-form'
}
</script>

<style>

</style>