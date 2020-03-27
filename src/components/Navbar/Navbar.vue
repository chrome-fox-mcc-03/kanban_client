<template>
  <div class="ui inverted menu" id="navbar">
    <div class="left menu">
      <sui-button animated="vertical" style="background:none;" @click="changePage('create')" v-if="currentPage === 'home'" >
        <sui-button-content style="color: green;" hidden>Create</sui-button-content>
        <sui-button-content visible>
          <sui-icon name="pencil alternate" color="green" style="background:none;" />
        </sui-button-content>
      </sui-button>
      <sui-button animated="vertical" style="background:none; width: 10vw;" @click="changePage('create-group')" v-if="currentPage === 'group'" >
        <sui-button-content style="color: green;" hidden>Add Group</sui-button-content>
        <sui-button-content visible>
          <sui-icon name="pencil alternate" color="green" style="background:none;" />
        </sui-button-content>
      </sui-button>
    </div>
    <a class="header item" style="padding-left: 40vw" id="logo" @click="logo"><p>QanbaN</p></a>
    <div class="right menu">
      <sui-button animated="vertical" style="background:none;" @click="changePage('login')" v-if="currentPage === 'register'" >
        <sui-button-content style="color: blue;" hidden>Login</sui-button-content>
        <sui-button-content visible>
          <sui-icon name="sign-in" color="blue" style="background:none;" />
        </sui-button-content>
      </sui-button>
      <sui-button animated="vertical" style="background:none;" @click="changePage('register')" v-else-if="currentPage === 'login'" >
        <sui-button-content style="color: orange;" hidden>Register</sui-button-content>
        <sui-button-content visible>
          <sui-icon name="external alternate" color="orange" style="background:none;" />
        </sui-button-content>
      </sui-button>
      <sui-button animated="vertical" style="background:none;" @click="logout" v-else-if="currentPage === 'group'" >
        <sui-button-content style="color: red;" hidden>Logout</sui-button-content>
        <sui-button-content visible>
          <sui-icon name="sign-out" color="red" style="background:none;" />
        </sui-button-content>
      </sui-button>
      <sui-button animated="vertical" style="background:none;" @click="changePage('home')" v-else-if="currentPage === 'create' || currentPage === 'edit'" >
        <sui-button-content style="color: orange;" hidden>Back</sui-button-content>
        <sui-button-content visible>
          <sui-icon name="reply" color="orange" style="background:none;" />
        </sui-button-content>
      </sui-button>
      <sui-button animated="vertical" style="background:none;" @click="changePage('group')" v-else >
        <sui-button-content style="color: orange;" hidden>Back</sui-button-content>
        <sui-button-content visible>
          <sui-icon name="reply" color="orange" style="background:none;" />
        </sui-button-content>
      </sui-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    currentPage: String
  },
  methods: {
    changePage (page) {
      this.$emit('changePage', page)
    },
    logout () {
      localStorage.clear()
      this.changePage('login')
      this.$emit('clearMsg')
    },
    logo () {
      this.changePage('group')
    }
  }
}
</script>