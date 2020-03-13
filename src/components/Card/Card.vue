<template>
  <div class="card">
    <sui-card-group v-for="({ id, title, description }, i) in tasks" :key="i">
      <sui-card>
        <sui-card-content style="font-family:arial;">
          <sui-card-header style="margin-bottom: 2rem;">{{title}}</sui-card-header>
          <sui-card-description style="margin: 1rem 0;">
            {{description}}
          </sui-card-description>
        </sui-card-content>
        <sui-card-content extra>
          <sui-container text-align="center">
            <sui-button-group>
              <sui-button animated style="background: none;">
                <sui-button-content visible>
                  <sui-icon color="blue" name="edit" />
                </sui-button-content>
                <sui-button-content style="color: #2185d0!important;" hidden>Edit</sui-button-content>
              </sui-button>
              <sui-button animated style="background: none;">
                <sui-button-content visible>
                  <sui-icon color="red" name="trash alternate" />
                </sui-button-content>
                <sui-button-content style="color: red;" hidden>Delete</sui-button-content>
              </sui-button>
            </sui-button-group>
          </sui-container>
        </sui-card-content>
      </sui-card>
    </sui-card-group>
  </div>
</template>

<script>
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
        url: 'http://localhost:3000/task',
        headers: {
          token: localStorage.getItem('token'),
          groupid: this.idGroup,
          categoryid: this.idCategory
        }
      })
        .then(({data}) => {
          this.tasks = data.data
          console.log(this.tasks, 'fetch task')
        })
        .catch(err => {
          console.log(err, 'uwaw')
        })
        .finally(_ => {
          this.active = false
        })
    }
  },
  created () {
    this.idGroup = this.groupId
    this.idCategory = this.categoryId
    this.fetchTask()
    console.log(this.groupId, this.categoryId, 'task dikirim')
  }
}
</script>

<style>

</style>