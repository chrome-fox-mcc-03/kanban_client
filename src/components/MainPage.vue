<template>
  <div id="main-page">
    <!-- header -->
    <div id="header"></div>
    <!-- main -->
    <div id="main">
      <!-- main-table -->
      <main-table v-for="(table, index) in tableNames" :key="index" 
      :tasks="tasks" 
      :table="table"
      @fetch="fetchData"
      ></main-table>
      <!-- ------- -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MainTable from './Table'

export default {
  name: 'MainPage',
  components: {
    MainTable
  },
  data() {
    return {
      tableNames: ['Backlog', 'Production', 'Development', 'Done'],
      tasks: []
    }
  },
  methods: {
    fetchData: function() {
      axios({
        method: "GET",
        url: "http://localhost:3000/task",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>