<template>
  <div>
        <nav class="navbar navbar-light bg-costum">
            <span 
              class="navbar-brand mb-0 h1"
              @click="home"
            >
                <!-- <img src="https://i.pinimg.com/originals/22/6d/5c/226d5cd7f24a676a8c1925bd061cd33d.gif" style="width: 80px; height: 80px;"> -->
                Kanban</span>
            <ul class="nav">
                <li class="nav-item h3">
                  <a class="nav-link text-dark" href="#">Profile</a>
                </li>
                <li
                 @click="logout"
                 class="nav-item h3"
                >
                  <a class="nav-link text-dark" href="#" tabindex="-1">Logout</a>
                </li>
              </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavbarPanelProject',
    methods: {
      logout(){
        // var auth2 = gapi.auth2.getAuthInstance();
        // auth2.signOut().then(function () {
        //   console.log('User signed out.');
        // })
        localStorage.clear()
        this.$emit('changePage', 'login')
      },
      home(){
        this.$emit('changeActivity', 'projects')
      }
    }
}
</script>

<style>

</style>