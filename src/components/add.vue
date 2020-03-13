<template>
  <div class="login flex-center">
    <at-card style="width: 300px;">
      <h4 slot="title">Add</h4>
      <div class="form">
        <img src="/1487054017_1486301565_giphy.gif" style="width: 50%">
        <div class="email">
        <at-input v-model="title" placeholder="title" style="margin-top: 30px;"></at-input>
        </div>
        <at-input v-model="description" placeholder="description" style="margin-top: 30px;"></at-input>
        <at-button type="primary" style="width: 150px; margin-top: 30px;" @click="add">Add</at-button>
      </div>
    </at-card>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        title : '',
        description: ''
      }
    },
    methods : {
      add () {
        this.start()
        const title = this.title
        const description = this.description
        axios ({
          url: "http://localhost:3000/kanban",
          method : "post",
          headers : {
            token : localStorage.getItem('token')
          },
          data : {
            title,
            description
          }
        })
          .then(({data}) => {
            this.finish()
            this.changePage('frame')
            this.open('add success' , 'success')
          })
          .catch(err => {
            this.error('add faild')
            this.open(err.response.data, 'warning')
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
  .login {
    margin-top: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>