const app = new Vue({
    el: '#app',
    data: {
      Email: '',
      Password: '', //Login
      isLogin: true,
      Project: '',
      Backlog: [],
      Product: [],
      Development: [],
      CategoryName: '',
      Categories: ["Backlog", "Product", "Development", "Done"],
      Done: [],
      Users: [],//Kanban Board
      Data: {
          Title: '',
          Content: 'TEST123',
          Category: '',
          Due_Date: '',
          UserId: '',
          ProjectId: '',
        //Task Satuan Modal
      },
      Loading: false,
      IsProject: true
    },
    methods : {
        login() {
            let Email = this.Email
            let Password = this.Password
            this.FindProject()
            axios({
                method: 'post',
                url: 'http://localhost:3000/user/login',
                data: {
                  Email: this.Email,
                  Password: this.Password
                }
              })
                .then(function(result) {
                    console.log('berhasil login')
                    localStorage.setItem("Email", result.data.Email)
                    localStorage.setItem("access_token", result.data.access_token)
                    Email = ''
                    Password = ''
                })
                .catch(function(err) {

                })
        },
        Clear() {
            this.Email = '',
            this.Password = '',
            this.Data.Title = '',
            this.Data.Content = '',
            this.Data.Category = '',
            this.Data.Due_Date = '',
            this.Data.UserId = '',
            this.Data.ProjectId = ''
        },
        // GoogleLogin() {
        //     axios({
        //         method: 'post',
        //         url: 'http://localhost:3000/user/googlelogin',
        //         data: {
        //           Email: this.Email,
        //           Password: this.Password
        //         }
        //       })
        //         .then(function(result) {
        //             localStorage.setItem("Email", result.Email)
        //             localStorage.setItem("access_token", result.access_token)
        //         })
        //         .catch(function(err) {

        //         })
        // }
        // onSignIn(googleUser) {
        //     let id_token = googleUser.getAuthResponse().id_token;
        //     axios({
        //         method: "post",
        //         url: "http://localhost:3000/user/googlelogin",
        //         headers: {
        //             access_token:id_token
        //         }
        //     })
        //         .then(function(result) {
        //             localStorage.setItem('access_token', result.data.access_token)
        //             console.log('google login kelar')
        //             console.log(result)
        //         })
        //         .catch(function(err) {

        //         })
        // },
        Register() {
            let Email = this.Email
            let Password = this.Password
            axios({
                method: 'post',
                url: 'http://localhost:3000/user/register',
                data: {
                  Email: this.Email,
                  Password: this.Password
                }
              })
                .then(function(result) {
                    localStorage.setItem("Email", result.Email)
                    localStorage.setItem("access_token", result.access_token)
                    Email = ''
                    Password = ''
                })
                .catch(function(err) {

                })
        },
        FindProject() {
            console.log('ahahah')
            // axios({
            //     method: 'get',
            //     url: 'http://localhost:3000/user/register',
            //     headers: {
            //         access_token: localStorage.getItem('access_token')
            //     }
            //         .then(function(result) {
            //             console.log(result)
            //         })
            //         .catch(function(err) {

            //         })
            // })
        }


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