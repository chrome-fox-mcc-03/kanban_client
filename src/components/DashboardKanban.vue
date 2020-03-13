<template>
  <div class="list">
    <header>{{category.category}}</header>
    <card v-for="task in tasks" :key="task.id"
      :task="task"
      @commands="commands"
      > </card>
    <footer v-if="category.id == 1" @changingPage="changingPage"><a href="#" @click.prevent="formCreate" >Add card</a></footer>
    <footer v-else> {{category.category}} </footer>
  </div>
</template>

<script>
import DashboardKanbanCardVue from './DashboardKanbanCard.vue'
export default {
  name: 'DashboardKanban',
  
  props: [
    'category',
    'tasks',
    // 'todos'
  ],
  components: {
    card: DashboardKanbanCardVue
  },
  methods: {
    formCreate() {
      console.log('masookk')
      this.$emit('changingPage', 'create')
    },
    changingPage(data) {
      this.$emit('changingPage', data)
    },
    commands(data) {
      this.$emit('commands', data)
    }
  }
}
</script>

<style lang="scss" scoped>

// Layout
$appbar-height: 40px;
$navbar-height: 50px;
$list-width: 300px;
$gap: 10px;
$scrollbar-thickness: 17px;
$list-header-height: 36px;
$list-footer-height: 36px;
// Misc
$list-border-radius: 5px;
$card-border-radius: 3px;
// Colors
$board-bg-color: #0079bf;
$appbar-bg-color: #0067a3;
$list-bg-color: #e2e4e6;

  .list {
  width: $list-width;
  height: calc(100% - #{$gap} - #{$scrollbar-thickness});

  > * {
    background-color: $list-bg-color;
    color: #333;

    padding: 0 $gap;
  }

  header {
    line-height: $list-header-height;
    font-size: 16px;
    font-weight: bold;
    border-top-left-radius: $list-border-radius;
    border-top-right-radius: $list-border-radius;
  }

  footer {
    line-height: $list-footer-height;
    border-bottom-left-radius: $list-border-radius;
    border-bottom-right-radius: $list-border-radius;
    color: #888;
  }

  
}

</style>