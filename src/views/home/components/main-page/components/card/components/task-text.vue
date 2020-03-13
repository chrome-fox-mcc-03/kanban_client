<template>
  <div>
    <!-- <div v-if="isLoading" class="loading-screen">
      <lottie-player
        src="https://assets10.lottiefiles.com/datafiles/kRbrlEbvgAezJ8q/data.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px;"
        loop
        autoplay
      ></lottie-player>
    </div> -->
    <div id="task_text_container" v-for="task in filteredTask" :key="task.id">
      <div id="task_text_heading"></div>
      <div id="task_text">{{task.title}}</div>
      <div class="button_container">
        <p id="next_button" @click="nextButton(task.id)"> → </p>
        <p id="back_button" @click="backButton(task.id)"> ← </p>
        <p id="delete_button" @click="deleteButton(task.id)">x</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TaskText",
  props: ["taskData", "taskHead"],
  data: {
    // isLoading: false
  },
  computed: {
    //filter
    filteredTask: function() {
      return this.taskData.filter(task => task.category == this.taskHead);
    }
  },
  methods: {
    nextButton(id) {
      let taskId = id;
      this.isLoading = true;
      axios({
        method: "PATCH",
        url: `https://polar-dusk-39759.herokuapp.com/tasks/next_category/${taskId}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.$toasted.success(result.data);
          this.$emit("showTask");
          console.log(result);
        })
        .catch(error => {
          this.$toasted.error(error.response.data);
        })
        .finally(_ => {
          // this.isLoading = false;
        })
    },
    backButton(id) {
      let taskId = id;
      this.isLoading = true;

      axios({
        method: "PATCH",
        url: `https://polar-dusk-39759.herokuapp.com/tasks/back/${taskId}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.$toasted.success(result.data);
          this.$emit("showTask");
          console.log(result);
        })
        .catch(error => {
          this.$toasted.error(error.response.data);
        })
        .finally(_ => {
          // this.isLoading = false;
        })
    },
    deleteButton(id) {
      let taskId = id;
      // this.isLoading = true;

      axios({
        method: "DELETE",
        url: `https://polar-dusk-39759.herokuapp.com/tasks/${taskId}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.$toasted.success(result.data);
          this.$emit("showTask");
          console.log(result);
        })
        .catch(error => {
          this.$toasted.error(error.response.data);
        })
        .finally(_ => {
          // this.isLoading = false;
        })
    }
  }
};
</script>

<style>
#task_text_heading {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vh;
}

.button_container {
  display: flex;
}

#task_text_container {
  border: 1px solid #222222;
  margin-bottom: 1vh;
  height: 5vh;
  padding: 1vh;
  display: flex;
  justify-content: space-between;
}

#task_text {
  font-size: 2vh;
  /* border-bottom: 1px solid #222222; */
}

#task_description {
  font-size: 2vh;
  color: #cfd0d1;
}

#next_button,
#back_button,
#delete_button,
#edit_button {
  height: 2vh;
  width: 2vh;
  background-color: white;
  color: #222222;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 0px;
  border: solid 1px;
  padding: 1vh;
  font-size: 1.5vh;
  margin-left: 0.5vh;
}

#next_button:hover,
#back_button:hover,
#delete_button:hover,
#edit_button:hover {
  color: rgb(85, 114, 85);
}


.loading-screen {
    height: 100vh;
    width: 100%;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    margin-left: -50vw;
}
</style>