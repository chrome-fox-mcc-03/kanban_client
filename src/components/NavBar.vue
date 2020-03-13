<template>
  <div id="navbar">
    <div id="navbar-top">
      <!-- Modal Button -->
      <i
        id="add-btn"
        class="fas fa-plus-circle fa-lg"
        data-toggle="modal"
        data-target="#staticBackdrop"
      >
        <span class="font">Add your list</span>
      </i>
      <!-- Modal -->
      <div
        class="modal fade"
        id="staticBackdrop"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Add List</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <input
                    v-model="NewTitle"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Title"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    v-model="NewDescription"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Description"
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="create" type="button" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="logout" id="navbar-bottom">
      <i id="signOut" class="fas fa-power-off fa-lg">
        <span class="font">Sign Out</span>
      </i>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NavBar",
  props: ['currentPage'],
  data() {
    return {
      NewTitle: "",
      NewDescription: ""
    };
  },
  methods: {
    create: function() {
      console.log("masuk");

      axios({
        method: "POST",
        url: "http://localhost:3000/task",
        data: {
          title: this.NewTitle,
          description: this.NewDescription
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(task => {
          
        })
        .catch(err => {
          console.log(err);
        });
    },

    logout: function() {
      this.$emit('logout')
    }
  }
};
</script>

<style>
</style>