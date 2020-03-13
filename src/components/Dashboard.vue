<template>
  <div id="pg-dashboard">
    <h3 class="header">MY TASKS</h3>
    <div class="container">
      <div class="row">
        <TaskBox
          class="bg-box col-sm"
          v-for="(category, index) in categories"
          :key="index"
          :type="category"
          :sortedTasks="tasks[category]"
          @getTaskDetails3="getTaskDetails4"
        ></TaskBox>
        <!-- EDIT TASK Modal -->
        <div
          class="modal fade"
          id="editTaskModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">EDIT TASK</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form id="editTask-form">
                  <!-- ID
              <br />
              <input
                
                type="text"
                class="form-control"
                id="create-task-type"
                placeholder="Enter Task Title"
                  /><br>-->
                  <label style="color:black">Title</label>
                  <!-- <br /> -->
                  <input
                    v-model="title"
                    type="text"
                    class="form-control"
                    id="create-task-type"
                    placeholder="Enter Task Title"
                  />
                  <!-- <p>{{ taskCreds.title }}</p><br> -->
                  <label style="color:black">Category</label>
                  <br />
                  <select class="task-category" v-model="category">
                    <option value="backlog">BACKLOG</option>
                    <option value="requested">REQUESTED</option>
                    <option value="wip">IN PROGRESS</option>
                    <option value="done">DONE</option>
                  </select>
                  <br />
                  <!-- <p>{{ taskCreds.category }}</p><br> -->
                  <label style="color:black">Due Date</label>
                  <br />
                  <input
                    v-model="due_date"
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
                <button type="button" class="btn btn-primary" form="createTask-form" @click.prevent="editTask">
                  EDIT
                  TASK
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- ------------------------------------------ -->
      </div>
    </div>

    <!-- <div class="crate-projects" v-for="(category, index) in categories" :key="index"> -->
  </div>
</template>

<script>
//IMPORT BOX
import TaskBox from "./TaskBox.vue";
export default {
  name: "Dashboard",
  data() {
    return {
      taskCreds: {
        id: 0,
        title: "",
        category: "",
        due_date: new Date(),
        UserId: 0
      },
      taskId: 0,
      title: "",
      due_date: "",
      category: "",
      taskEditParams : {
        id: 0,
        title: "",
        category: "",
        due_date: new Date()
      }
    }
   
  },
  methods: {
    editTask() {
      this.taskEditParams = {
        "id": this.taskId,
        "title": this.title,
        "category": this.category,
        "due_date": this.due_date
      }
      this.$emit("editTaskById", this.taskEditParams)
    },
    getTaskDetails4(data) {
      this.taskId = data.id
      this.title = data.title;
      this.category = data.category;
      const date = new Date(data.due_date);
      this.due_date = this.parseDate(date)
      // this.due_date = `${date.getFullYear()}-0${date.getMonth()}-0${date.getDate()}`;
      console.log(this.due_date);
      console.log(data, "-------------dataa");

      $("#editTaskModal").modal("show"); //from bootstrap?!
      // this.$emit("getTaskDetails5", taskEditParams)


    },

    parseDate(inputted) {
      let yyyy = String(inputted.getFullYear())
      let mm = inputted.getMonth() + 1
      let dd = inputted.getDate()

      if(String(mm).length === 1) {
        mm = "0"+mm
      }

      if(String(dd).length === 1) {
        dd = "0"+dd
      }

      let dateString = yyyy+"-"+mm+"-"+dd
      return dateString
    }
  },
  props: ["categories", "tasks"],
  components: {
    TaskBox
  }
};
</script>

<style scoped>
.bg-box {
  color: white;
}

.bg-box:nth-child(1) {
  background-color: red;
}

.bg-box:nth-child(2) {
  background-color: green;
}

.bg-box:nth-child(3) {
  background-color: orange;
}

.bg-box:nth-child(4) {
  background-color: blue;
}
</style>