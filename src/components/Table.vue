<template>
  <div class="table">
    <h5>{{ category }}</h5>
    <div class="main-board">
      <div class="board">
        <!-- card -->
        <card
          v-for="task in filtered"
          :key="task.id"
          :category="category"
          :task="task"
          @fetch="fetch"
          @moveLeft="moveLeft"
          @moveRight="moveRight"
        ></card>
        <!-- ------- -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "./Cards";
export default {
  name: "MainTable",
  props: ["table", "tasks"],
  components: {
    Card
  },
  data() {
    return {
      category: ""
    };
  },
  created() {
    // ['Backlog', 'Production', 'Development', 'Done']
    if (this.table == "Backlog") {
      this.category = "Backlog";
    } else if (this.table == "Production") {
      this.category = "Production";
    } else if (this.table == "Development") {
      this.category = "Development";
    } else if (this.table == "Done") {
      this.category = "Done";
    }

    this.fetch();
  },
  watch: {
    category(val) {
      // console.log(category)
      // this.fetchData()
      this.category = val;
    }
  },
  methods: {
    moveLeft: function(data) {
      let newCategory;
      if (data.category == "Production") {
        newCategory = "Backlog";
      } else if (data.category == "Development") {
        newCategory = "Production";
      } else if (data.category == "Done") {
        newCategory = "Development";
      }
      axios({
        method: "PATCH",
        url: `http://localhost:3000/task/${data.id}`,
        data: {
          category: newCategory
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(updatedTask => {
          console.log("pindah nih");
          this.fetch();
        })
        .catch(err => {
          console.log(err);
        });
    },

    moveRight: function(data) {
      let newCategory;
      if (data.category == "Backlog") {
        newCategory = "Production";
      } else if (data.category == "Production") {
        newCategory = "Development";
      } else if (data.category == "Development") {
        newCategory = "Done";
      }
      axios({
        method: "PATCH",
        url: `http://localhost:3000/task/${data.id}`,
        data: {
          category: newCategory
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(updatedTask => {
          this.fetch();
        })
        .catch(err => {
          console.log(err);
        });
    },

    fetch: function() {
      this.$emit("fetch");
    }
  },
  computed: {
    filtered: function() {
      return this.tasks.filter(task => task.category == this.category);
    }
  }
};
</script>

<style>
</style>