<template>
  <div class="card">
    <draggable v-model="tasks" @start="drag=true" @end="drag=false" group="job" :emptyInsertThreshold="200">
      <sui-card-group v-for="({ id, title, description }, i) in fetch" :key="i">
        <sui-card>
          <sui-card-content style="font-family:arial;">
            <sui-card-header style="margin-bottom: 2rem;">{{title}}</sui-card-header>
            <sui-card-description style="margin: 1rem 0;">
              {{description}}
            </sui-card-description>
          </sui-card-content>
          <sui-card-content extra>
            <Option
              @notification="notification"
              @payloadEdit="edit"
              @changePage="changePage"
              :payload="{id, idGroup, idCategory}"
            >
            </Option>
          </sui-card-content>
        </sui-card>
      </sui-card-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Option from './Option'

export default {
  name: 'Card',
  data () {
    return {
      idGroup: 0,
      idCategory: 0,
      tasks: []
    }
  },
  components: {
    Option,
    draggable
  },
  props: {
    groupId: Number,
    categoryId: Number
  },
  methods: {
    fetchTask() {
      this.active = true
      axios({
        method: 'get',
        url: 'https://ancient-dawn-78678.herokuapp.com/task',
        headers: {
          token: localStorage.getItem('token'),
          groupid: this.idGroup,
          categoryid: this.idCategory
        }
      })
        .then(({data}) => {
          this.tasks = data.data
        })
        .finally(_ => {
          this.active = false
        })
    },
    changePage (page) {
      this.$emit('changePage', page)
    },
    edit (payload) {
      this.$emit('payloadEdit', payload)
    },
    notification(payload) {
      this.$emit('notification', payload)
      // this.fetchTask()
    }
  },
  created () {
    this.idGroup = this.groupId
    this.idCategory = this.categoryId
    this.fetchTask()
  },
  computed: {
    fetch() {
      return this.tasks
    }
  },
  watch: {
    tasks () {
      const taskUpdate = this.tasks.filter((el) => { return el.CategoryId !== this.categoryId })
      taskUpdate.forEach(el => {
        axios({
          method: 'put',
          url: `https://ancient-dawn-78678.herokuapp.com/task/${el.id}`,
          headers: {
            token: localStorage.getItem('token'),
            categoryid: this.categoryId,
            groupid: el.GroupId
          },
          data: {
            CategoryId: this.categoryId
          }
        })
          .then(_ => console.log('masuk'))
          .catch(console.log)
      })
    }
  }
}
</script>

<style>

</style>