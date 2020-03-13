<template>
  <div class="navbar-header" v-show="isLogin">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">看板</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- <li class="nav-item">
              <button type="button" class="btn btn-primary" onclick="renderHome()">Home</button>
          </li>-->
          <li class="nav-item">
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#createTaskModal"
            >
              Create
              Task
            </button>
          </li>

          <li class="nav-item">
            <button type="button" class="btn btn-info" v-on:click="logout()">LOGOUT</button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- CREATE TASK Modal -->
    <div
      class="modal fade"
      id="createTaskModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">CREATE NEW TASK</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="createTask-form">
              Title
              <br />
              <input
                v-model="taskCreds.title"
                type="text"
                class="form-control"
                id="create-task-type"
                placeholder="Enter Task Title"
              />
              <!-- <p>{{ taskCreds.title }}</p><br> -->
              <br />Category
              <br />
              <select class="task-category" v-model="taskCreds.category">
                <option value="backlog">BACKLOG</option>
                <option value="requested">REQUESTED</option>
                <option value="wip">IN PROGRESS</option>
                <option value="done">DONE</option>
              </select>
              <br />
              <!-- <p>{{ taskCreds.category }}</p><br> -->
              Due Date
              <br />
              <input
                v-model="taskCreds.due_date"
                type="date"
                class="form-control"
                id="create-task-due-date"
              />
              <!-- <p>{{ parseDate }}</p><br> -->
              <br />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              form="createTask-form"
              v-on:click.prevent="createTask()"
            >
              CREATE
              TASK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["token", "isLogin"],
  data() {
    return {
      taskCreds: {
        title: "",
        category: "",
        due_date: new Date(),
        UserId: 0
      },
      editCreds: {
        id: 0,
        title: "",
        category: "",
        due_date: new Date(),
        UserId: 0
      },
      dropId: 0 //FOR DELETE
    };
  },
  methods: {
    /* 
    
    
    
    */
    createTask() {
      console.log(">>>CREATE TASK: BEFORE SENDING TO PARENT<<<");
      console.log(this.taskCreds);
      this.$emit("addNewTask", this.taskCreds);
    },

    editTask() {
      console.log(">>>EDIT TASK: BEFORE SENDING TO PARENT<<<");
      console.log(this.editCreds);
      this.$emit("editTaskInList", this.editCreds);
    },

    deleteTask() {
      console.log(">>>DELETE TASK: BEFORE SENDING TO PARENT<<<");
      console.log(this.dropId);
      this.$emit("dropTaskFromList", this.dropId);
    },

    logout() {
      console.log(">>>LOGGING OUT<<<");
      this.$emit("logout", null);
    }
  }
};
</script>

<style>
</style>