const app = new Vue({
    el: '#app',
    data: {
      Email: '',
      Password: '', //Login
      isLogin: false,
      Project: '',
      Backlog: [],
      Product: [],
      Development: [],
      Done: [],
      Users: [],//Kanban Board
      DataShow: {
          Title: '',
          Content: '',
          Category: '',
          Due_Date: '',
          UserId: '',
          ProjectId: ''
        //Task Satuan Modal
      }
    },
    methods : {

    },
    created() {
        if(localStorage.getItem('access_token')) {
            this.isLogin = true
        }
        else {
            this.isLogin = false

        }
    }


  })