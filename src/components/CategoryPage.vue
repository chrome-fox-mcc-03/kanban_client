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
              <Card
                v-if="renderComponent"
                @forceRerender="forceRerender"
                @editTask="editTask"
                :firstPosition="index === 0 ? true: false"
                :lastPosition="index === categories.length -1 ? true: false"
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
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Card from "./Card";
export default {
  name: "CategoryPage",
  props: ["projectId"],
  components: {
    Card,
    Loading
  },
  data: function() {
    return {
      categories: [],
      isLoading: false,
      fullPage: true,
      renderComponent: true
    };
  },
  created: function() {
    this.loadCategories();
  },
  methods: {
    loadCategories() {
      this.isLoading = true;
      axios
        .get(`http://localhost:3000/categories`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          this.isLoading = false;
          this.categories = data;
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    },
    changeCategoryId(categoryId) {
      this.$emit("changeCategoryId", categoryId);
    },
    editTask(task) {
      this.$emit("editTask", task);
    },
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick().then(() => {
        this.renderComponent = true;
      });
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