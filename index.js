const app = new Vue ({
    el : '#app',
    data : {
        isLogin : false,
        currentPage : 'landingPage',
        userData : {
            name : '',
            email : '',
            password : '',
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
        login() {
            if (this.userData.password == 'secret') {
                this.isLogin = true
            } else {
                this.isLogin = false
            }
        },
        register () {
            console.log(this.userData.name);
            console.log(this.userData.email);
            console.log(this.userData.password);
        }

    }
})