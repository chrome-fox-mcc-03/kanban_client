<template>
  <b-col id="add-task" cols="6" class="mx-auto">
    <b-card title="Add New Task" border-variant="warning">
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="task-name" label="Taks Name:" label-for="name">
          <b-form-input
            id="name"
            v-model="form.name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="task-description" label="Description:" label-for="description">
          <b-form-input
            id="description"
            v-model="form.description"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="task-category" label="Category:" label-for="CategoryId">
          <b-form-select
            id="CategoryId"
            v-model="form.category"
            :options="options"
            required
          ></b-form-select>
        </b-form-group>

        <b-button type="submit" variant="warning" pill>{{ button }}</b-button>
      </b-form>
    </b-card>
  </b-col>
</template>

<script>
export default {
  name: 'AddTask',
  props: {
    categories: Array,
    isEdit: Boolean,
    taskEdit: Object
  },
  data () {
    return {
      form: {
        name: '',
        description: '',
        CategoryId: null
      }
    }
  },
  computed: {
    options () {
      let options = [{ value: null, text: 'Choose a category' }]
      this.categories.forEach(category => {
        options.push({ value: category.id, text: category.name })
      })
      return options
    },
    button () {
      if (!this.isEdit) return 'Add Task'
      else return 'Update Task'
    },
    updateFill () {
      if (this.isEdit) {
        console.log('masukk editfill')
        this.form.name = this.taskEdit.name
        this.form.description = this.taskEdit.description
        this.form.CategoryId = this.taskEdit.CategoryId
      }
    }
  },
  methods: {
    onSubmit () {
      if (!this.isEdit) this.$emit('addTask', this.form)
      else this.$emit('editSubmit', this.form)
      this.reset()
    },
    reset () {
      this.form.name = ''
      this.form.description = ''
      this.form.CategoryId = null
    }
  }
}
</script>

<style scoped>
  #add-task {
    padding: 3vh 0;
  }
</style>
