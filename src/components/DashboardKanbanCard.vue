<template>
  <div class="card">
    <ul>
      <li>
        <div class="task">
          <h3>{{task.task}}</h3>
          <p>{{task.description}}</p>
          <a href="#" @click.prevent="reversing(task.id, task.CategoryId)">reverse</a>
          <a href="#" @click.prevent="deleting(task.id)">delete</a>
          <a href="#" @click.prevent="forwarding(task.id, task.CategoryId)">forward</a>
        </div>
      </li>
    </ul> 
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'DashboardKanbanCard',
  props:['task'],
  methods : {
    deleting(id) {
      Axios({
        method :'DELETE',
        url: `http://localhost:3000/task/${id}`,
        headers: {token: localStorage.getItem('token')}
      })
        .then(data => {
          console.log(data)
          this.$emit('commands', 'fetchData')
        })
        .catch(err => {
          console.log(err)
        })
    },
    forwarding(id, CategoryId) {
      CategoryId++
      Axios({
        method: 'PATCH',
        url: `http://localhost:3000/task/${id}`,
        headers: {token: localStorage.getItem('token')},
        data: {CategoryId: CategoryId}
      })
        .then(data => {
          this.$emit('commands', 'fetchData')
        })
        .catch(err => console.log(err))
    },
    reversing(id, CategoryId) {
      CategoryId--
      Axios({
        method: 'PATCH',
        url: `http://localhost:3000/task/${id}`,
        headers: {token: localStorage.getItem('token')},
        data: {CategoryId: CategoryId}
      })
        .then(data => {
          this.$emit('commands', 'fetchData')
        })
        .catch(err => console.log(err))
    }
    
  },
  created() {
    // this.fetchData()
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


ul {
    list-style: none;
    margin: 0;

    max-height: calc(100% - #{$list-header-height} - #{$list-footer-height});
    overflow-y: auto;

    padding: 0;

    li {
      background-color: #fff;
      padding: $gap;
      margin-bottom: 10px;
      

      border-radius: $card-border-radius;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

      .task {
        overflow:auto;

      }

      img {
        display: block;
        width: calc(100% + 2 * #{$gap});
        margin: -$gap 0 $gap (-$gap);
        border-top-left-radius: $card-border-radius;
        border-top-right-radius: $card-border-radius;
      }
    }
  }
</style>