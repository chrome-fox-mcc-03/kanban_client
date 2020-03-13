
<template>
  <!-- DASHBOARD FORM -->
  <div class="ui">
    <navbar></navbar>
    <nav class="navbar board">Test Board</nav>
    <div class="lists" >
      <kanban
        v-for="category in categories"
        :key="category.id"
        :tasks='tasks.filter(el => el.CategoryId == category.id)'
        :category="category"
        @changingPage="changingPage"
        @commands="commands"

      ></kanban>
      
    </div>
  </div>
  <!-- END DASHBOARD FORM -->

</template>

<script>
import DashboardKanbanVue from './DashboardKanban.vue'
import LoginFormVue from './LoginForm.vue'
import RegisterFormVue from './RegisterForm.vue'
import NavbarVue from './Navbar.vue'
import Axios from 'axios'
import CreateVue from './Create.vue'




export default {
  name: 'Kanban',
  props: [
    'categories',
    'tasks'
  ],
  data: () => {
    return {
      logout:  false,
      
    }
  },
  

  components: {
    kanban: DashboardKanbanVue,
    login: LoginFormVue,
    register: RegisterFormVue,
    navbar: NavbarVue,
    create: CreateVue

  },
  methods: {
    contoh(event) {
      this.$emit('test', event)
    },
    logout() {
      this.contoh(this.logout)
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



// FORM KANBAN //
body {
  margin: 0;

  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.3em;
}

.ui {
  height: 100vh;

  display: grid;
  grid-template-rows: $appbar-height $navbar-height 1fr;
  //grid-template-columns: 100%;

  background-color: $board-bg-color;
  color: #eee;
}

.navbar {
  padding-left: $gap;
  display: flex;
  align-items: center;
  &.app {
    background-color: $appbar-bg-color;
    font-size: 1.5rem;
  }
  &.board {
    font-size: 1.1rem;
  }
}

.lists {
  display: flex;
  overflow-x: auto;
  //width: 100%; // This is needed for FF < 54
  > * {
    flex: 0 0 auto; // 'rigid' lists
    margin-left: $gap;
  }
  &::after {
    content: '';
    flex: 0 0 $gap;
  }
}



</style>