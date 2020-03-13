<template>
  <section id="kanban-board">
      <MemberInvite
        @addMember="addMember"
        :members="members"
        @backProfileTeam="backProfileTeam"
        @logoutFromBoard="logoutFromBoard"
        ></MemberInvite>

      <div class="kanban-board">
        <img src="../../assets/img/daylight-environment-forest-idyllic-459225.jpg">

        <div class="board-categories">
          
          <Category
            v-for="category in categories"
            :key="category.id"
            :category="category"
            :tasks="tasks"
            @refetchTask="refetchTask"
            ></Category>

        </div>
      </div>
  </section>
</template>

<script>
import axios from 'axios'
import MemberInvite from './MemberInvite.vue'
import Category from './Category.vue'

export default {
  name: 'KanbanBoard',
  props: ['tasks', 'members'],
  data () {
    return {
      categories : []
    }
  },
  components: {
    MemberInvite,
    Category
  },
  methods: {
    changeDashboardPage (status) {
      this.$emit('changeDashboardPage', status)
    },
    addMember (payload) {
      this.$emit('addMember', payload)
    },
    fetchCategory () {
      axios({
        url: 'http://localhost:3000/categories',
        method: 'GET'
      })
        .then(({ data }) => {
          console.log(data)
          this.categories = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    backProfileTeam(statusProfileTeam) {
      this.$emit('backProfileTeam', statusProfileTeam)
    },
    logoutFromBoard() {
      this.$emit('logoutFromBoard')
    },
    refetchTask () {
      this.$emit('refetchTask')
    }
  },
  created () {
    this.fetchCategory()
  }

}
</script>

<style>

</style>