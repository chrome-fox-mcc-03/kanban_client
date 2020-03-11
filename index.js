const baseUrl = 'http://localhost:3000'

const app = new Vue ({
    el : '#app',
    data : {
        currentPage : 'landingPage',
        userData : {
            name : '',
            email : '',
            password : '',
            avatarUrl : '',
            isLogin : false
        },
        tasks : [
            {
                id : 1, title : 'This is new card (backlog)', category : 'backlog'
            },
            {
                id : 2, title : 'This is new card (to do)', category : 'todo'
            },
            {
                id : 3, title : 'This is new card (done)', category : 'done'
            },
            {
                id : 4, title : 'This is new card (completed)', category : 'completed'
            },
            {
                id : 5, title : 'This is new card', category : 'backlog'
            },
            {
                id : 6, title : 'This is new card', category : 'backlog'
            },
            {
                id : 7, title : 'This is new card', category : 'backlog'
            },
            {
                id : 8, title : 'This is new card', category : 'backlog'
            },
            {
                id : 9, title : 'This is new card', category : 'done'
            },
            {
                id : 10, title : 'This is new card', category : 'done'
            }
        ]

    },
    methods : {
        changePage (page) {
            this.currentPage = page 
        },
        register () {
            const name = this.userData.name;
            const email = this.userData.email;
            const password = this.userData.password;

            axios({
                method : 'post',
                url : baseUrl+'/users/register',
                data : {
                    name,
                    email,
                    password
                }
            })
                .then(({data})=>{
                    const access_token = data.access_token ;
                    localStorage.setItem('access_token', access_token) ;
                    localStorage.setItem('avatar', data.access_avatarUrl ) ;
                    this.userData.avatarUrl = localStorage.getItem('avatar') ;
                    this.userData.isLogin = true ;

                })
                .catch((error)=>{
                    console.log(error.response.data.errorMessage);
                })
        },
        login() {
            const email = this.userData.email;
            const password = this.userData.password;

            axios({
                method : 'post',
                url : baseUrl+'/users/login',
                data : {
                    email,
                    password
                }
            })
                .then(({data})=>{
                    const access_token = data.access_token ; 
                    localStorage.setItem('access_token', access_token) ;
                    localStorage.setItem('avatar', data.access_avatarUrl ) ;
                    this.userData.avatarUrl = localStorage.getItem('avatar') ;
                    this.userData.isLogin = true ;
                })
                .catch((error)=>{
                    console.log(error.response.data.errorMessage);
                })
        },
        logout(){
            localStorage.clear() ;
            this.userData.isLogin = false ;
        }
    },
    created(){
        const access_token = localStorage.getItem('access_token') ;
        if (access_token) {
            this.userData.isLogin = true
            this.userData.avatarUrl = localStorage.getItem('avatar') ;
        }
    }
})