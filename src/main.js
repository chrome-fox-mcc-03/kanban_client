import Vue from 'vue';
import App from './App.vue';

new Vue({
    render: h => h(App),
}).$mount('#app');


// let app = new Vue({
//     el: '#app',
//     data: {
//         testmsg: '>>>>VUE<<<<',
//         isAuthenticated: false,
//         wannaEdit: false,
//         signUp: false,
//         isActive: true,
        // backlogs: [
        //     {id: 1, title: 'Book flight to Vietnam', category: 'backlog'},
        //     {id: 2, title: 'Recruit new member', category: 'backlog'},
        //     {id: 3, title: 'Read Narnia', category: 'backlog'},
        //     {id: 4, title: 'Make dentist appointment', category: 'backlog'},
        //     {id: 5, title: "Reply followers' tweets", category: 'backlog'},
        // ],
        // newActivity: '',
//         // for signing up ---------
        // userData: {
        //     regName: '',
        //     regEmail: '',
        //     regPassword: ''
        // }
//         // ------------------------
//     },
//     methods: {
//         createNewUser: function() {
//             const name = this.userData.regName;
//             const email = this.userData.regEmail;
//             const password = this.userData.regPassword;

//             axios.post('http://localhost:3000/signup',
//                 {
//                     name,
//                     email,
//                     password
//                 })
//                     .then(access_token => {
//                         console.log(access_token.data.access_token);
//                         localStorage.setItem('access_token', access_token.data.access_token);
//                         this.isAuthenticated = true
//                     })
//                     .catch(err => {
//                         console.log(err);
//                     })
//         },
//         authenticate: function() {
//             this.isAuthenticated = true
//         },
//         signOut: function() {
//             this.isAuthenticated = !this.isAuthenticated
//         },
//         slide: function() {

//         },
//         addNewAct: function() {
//             console.log('new act!');
//             this.backlogs.push({
//                 id: 6,
//                 title: this.newActivity,
//                 category: 'Backlog'
//             })
//         },
//         showEditForm: function() {
//             console.log('edit!!!');
//             this.wannaEdit = true
//         },
//         backToMainPage: function() {
//             console.log('back to main please');
//         }
//     }
// })


// function displayMenu() {
//     document.querySelector(".option-menus").classList.toggle("show");
// }

// window.onclick = function(event) {
//     if (!event.target.matches('.option-space')) {
//         if (document.querySelector(".option-menus").classList.contains('show')) {
//             document.querySelector(".option-menus").classList.remove('show');
//         }
//     }
// }

