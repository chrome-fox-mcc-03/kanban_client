<template>
  <div>
    <at-menu mode="horizontal" active-name="1"> 
      <div @click.prevent="home" >
      <at-menu-item name="1" ><i class="icon icon-home"></i>Logo</at-menu-item>
      </div>
      <div class="row at-row no-gutter flex-end" v-if="currentPage == 'frame'" >
        <div @click.prevent="add">
        <at-menu-item name="4" >Add</at-menu-item>
        </div>
        <div @click.prevent="logout">
        <at-menu-item name="4">Logout</at-menu-item>
        </div>
      </div>
      <div class="row at-row no-gutter flex-end" v-else-if="currentPage == 'login'"  @click.prevent="register" >
        <at-menu-item name="4" @click.prevent="register">Register</at-menu-item>
      </div>
      <div class="row at-row no-gutter flex-end" v-else-if="currentPage == 'register'" @click.prevent="login">
        <at-menu-item name="4" @click.prevent="login">login</at-menu-item>
      </div>
    </at-menu>
  </div>
</template>

<script>

export default {
  props :{
    currentPage: String
  },
  methods: {
    changePage (event) {
      this.$emit ("changePage",event)
    },
    login () {
      this.changePage ('login')
    },
    register () {
      this.changePage ('register')
    },
    add () {
      this.changePage ('add')
    },
    logout () {
      localStorage.clear()
      this.changePage ('login')
    },
    home () {
      this.changePage ('frame')
    }
  }
}
</script>
  
<style>

</style>