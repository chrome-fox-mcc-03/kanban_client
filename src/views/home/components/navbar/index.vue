<template>
  <div id="main_head">
    <div id="header">KANBAN</div>
    <form id="card_bottom" @submit.prevent="create_task">
      <input id="create" placeholder="input new task" v-model="new_task" />
      <button id="add_button">add</button>
    </form>
    <div id="logout" @click="logout">LOGOUT</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      new_task: ""
    };
  },
  methods: {
    logout(logout) {
      this.$emit("logout", "login");
    },
    create_task() {
      axios({
        method: "POST",
        url: "https://polar-dusk-39759.herokuapp.com/tasks",
        data: {
          title: this.new_task
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.showTask();
          this.new_task = "";
          this.$toasted.success(`you successfully added new data`);
          console.log(result);
        })
        .catch(error => {
          console.log(error);
          this.$toasted.error(error.response.data);
          this.$toasted.error(`title cannot be empty`);
        });
    },
    showTask() {
      this.$emit("showTask");
    }
  }
};
</script>

<style>
#main_head {
  display: flex;
  align-items: flex-end;
  padding: 0 4vh 2vh 5vh;
  background-color: rgb(241, 211, 150);
  /* justify-content: space-between; */
}

#header {
  font-size: 10vh;
}

#create {
  /* width: 80%; */
  height: 5vh;
  /* margin: 0 0 1vh 1vh; */
  border: #222222 transparent 1px;
  color: #222222;
  padding: 2vh;
  font-size: 1vw;
  margin: 0 0 0 0;
}

#add_button {
  font-size: 2vh;
  margin-bottom: 2vh;
  border: 1px solid;
  padding: 1vh;
  cursor: pointer;
  background: transparent;
}

#add_button:hover {
  border: 1px solid rgb(85, 114, 85);
  background-color: rgb(85, 114, 85);
  color: rgb(241, 211, 150);
}

#logout {
  font-size: 2vh;
  margin-bottom: 2vh;
  border: 1px solid;
  padding: 1vh;
  cursor: pointer;
  height: 4.5vh;
  margin-left: 40vw;
}

#logout:hover {
  border: 1px solid rgb(85, 114, 85);
  background-color: rgb(85, 114, 85);
  color: rgb(241, 211, 150);
}
</style>