<template>
  <div>
    <h3 class="font-weight-light">Kanban Board Desi</h3>
    <!-- CONTAINER -->
    <div class="row flex-row flex-sm-nowrap py-3">
      <div class="col-sm-3 col-md-3" v-for="(category, index) in categories" :key="category.id">
        <div class="card">
          <div class="card-body">
            <a href class="close">×</a>
            <h6 class="card-title text-uppercase text-truncate py-2">{{category.name}}</h6>
            <div class="items border border-light">
              <!-- <div class="card draggable" draggable="true">
                <div class="card-body p-2 border-left border-success">
                  <div class="card-title">
                    <img src="//placehold.it/30" class="rounded-circle float-right" />
                  </div>
                  <p></p>
                  <button class="btn btn-outline-success btn-sm">View</button>
                </div>
              </div>
              <div class="card draggable" draggable="true">
                <div class="card-body p-2 border-left border-success">
                  <div class="card-title">
                    <img src="//placehold.it/30" class="rounded-circle float-right" />
                    <a href class="lead font-weight-light">TSK-148</a>
                  </div>
                  <p>This item an item that is actively in progress.</p>
                  <button class="btn btn-outline-success btn-sm">View</button>
                  <button class="btn btn-outline-success btn-sm">Add</button>
                </div>
              </div>-->
              <Card
                :firstPosition="index === 0 ? true: false"
                :lastPosition="index === categories.length -1 ? true: false"
                @editTask="editTask"
                :projectId="projectId"
                :categoryId="category.id"
                :prevCategoryId="index == 0 ? categories[index].id : categories[index-1].id"
                :nextCategoryId="index == categories.length - 1 ? categories[index].id : categories[index+1].id"
              ></Card>
            </div>
            <br />
            <div class="container">
              <div class="row">
                <button class="btn btn-primary" v-on:click="changeCategoryId(category.id)">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Card from "./Card";
export default {
  name: "CategoryPage",
  props: ["projectId"],
  components: {
    Card
  },
  data: function() {
    return {
      categories: []
    };
  },
  created: function() {
    // pertama get dulu categorinya
    axios
      .get(`http://localhost:3000/categories`, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.categories = data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    changeCategoryId(categoryId) {
      this.$emit("changeCategoryId", categoryId);
    },
    editTask(task) {
      this.$emit("editTask", task);
    }
  }
};
</script>

<style scoped>
.card.draggable {
  margin-bottom: 1rem;
  cursor: grab;
}

.items {
  padding: 1rem;
  background: whitesmoke;
}

.droppable:hover {
  background-color: var(--secondary);
}

.custom-margin {
  padding: 0 100px;
}
</style>