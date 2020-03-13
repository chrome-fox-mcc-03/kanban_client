<template>
    <div class="login flex-center">
      <at-card style="width: 300px;">
        <h4 slot="title">Edit</h4>
        <div class="form">
          <img src="/1487054017_1486301565_giphy.gif" style="width: 50%">
          <div class="email">
          <at-input v-model="title" placeholder="title" style="margin-top: 30px;"></at-input>
          </div>
          <at-input v-model="description" placeholder="description" style="margin-top: 30px;"></at-input>
          <at-button type="primary" style="width: 150px; margin-top: 30px;" @click="edited">Edit</at-button>
        </div>
      </at-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      title : this.edit.title,
      description : this.edit.description
    }
  },
  props : {
    edit : Object
  },
  methods : {
    edited () {
      this.start()
      const title = this.title
      const description = this.description
      axios({
        url : "http://localhost:3000/kanban/" + this.edit.id,
        method: "put",
        headers : {
          token : localStorage.token
        },
        data :{
          title,
          description
        }
      })
        .then(({data}) => {
          this.finish()
          this.open('Edit success', 'success')
          this.changePage('frame')
        })
        .catch(err => {
          this.error()
          this.open('Edit faild', 'warning')
          console.log(err)
        })
    },
    start () {
      this.$Loading.start()
    },
    finish () {
      this.$Loading.finish()
    },
    error () {
      this.$Loading.error()
    },
    open (title,type) {
      this.$Notify({
        title,
        type
      })
    },
    changePage (event) {
      this.$emit('changePage',event)
    }
  }
}
</script>

<style>

</style>