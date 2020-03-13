<template>
  <div class="row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable class="list-group" :list="list1" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list1"
          :key="element.id"
        >
          {{ element.title }} {{ index }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable class="list-group" :list="list2" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list2"
          :key="element.title"
        >
          {{ element.title }} {{ index }}
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import axios from 'axios'
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable
  },
  data() {
    return {
      list1: this.backlog,
      list2: this.Todo,
      task : []
    };
  },
  methods: {
    fetch () {
      axios({
        url : "http://localhost:3000/",
        method : "get",
        headers : {
          token : localStorage.token
        }
      })
        .then(({data}) => {
          console.log(data)
          this.task = data
        })
        .catch(err => {
        })
    },
    add: function() {
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function(evt) {
      window.console.log(evt);
    }
  },
  computed : {
    backlog () {
      const data = this.task.filter(el => el.StatusId =='1')
      return data
    },
    Todo () {
      const data = this.task.filter(el => el.StatusId =='2')
      return data
    }
  },
  created () {
    this.fetch()
  }
};
</script>