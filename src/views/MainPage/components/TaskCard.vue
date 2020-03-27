<template>
  <b-row id="task-card">
    <b-col cols="12">
      <b-card
        :title="task.name"
        class="mx-auto"
      >
        <b-card-text>
          {{ task.description }}
        </b-card-text>
        <b-row>
          <b-col
            v-for="(button, i) in 4"
            :key="i"
            cols=3
          >
            <b-button href="#" :variant="variant(i)" :disabled="disabled(i)" @click.prevent="onClick(i)">{{ icon(i) }}</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: Object,
    CategoryId: Number
  },
  methods: {
    variant (position) {
      if (position === 0 || position === 3) return 'warning'
      else if (position === 1) return 'primary'
      else return 'danger' 
    },
    disabled (position) {
      if ((position === 0 && this.CategoryId === 1) ||
          (position === 3 && this.CategoryId === 4)
      ) return true
      else return false
    },
    icon (position) {
      if (position === 0) return '<<'
      else if (position === 1) return 'Edit'
      else if (position === 2) return 'Del'
      else if (position === 3) return '>>'
    },
    onClick (position) {
      if (position === 0) {
        if (this.CategoryId === 2 || 3 || 4) {
            this.$emit('changeCategory', this.task.id, (this.CategoryId-1))
        } else console.log('unavailable')
      } else if (position === 1) {
          this.$emit('editTask', this.task.id)
      } else if (position === 2) {
        this.$emit('deleteTask', this.task.id)
      } else if (position === 3) {
        if (this.CategoryId === 1 || 2 || 3)
        this.$emit('changeCategory', this.task.id, (this.CategoryId+1))
      }
    }
  },
  computed: {
  }
}
</script>

<style>
  #task-card {
    padding: 1vh 0;
  }
</style>
