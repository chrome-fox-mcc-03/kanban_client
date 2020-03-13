import Vue from 'vue';
import App from './App.vue'


new Vue({
    render: h => h(App),
}).$mount('#app')

// let app = new Vue({
//     el: '#app',
//     data: {
//         userData: {
//             email: '',
//             password: '',
//             isLogin: false,
//             first_name: '',
//             last_name: '',
//             role: ''
//         },
//         currentPage : '',
//         cards: [],
//         categories: [],
//         taskDetail: '',
//         taskData: {
//             title: '',
//             category: '',
//             description: ''
//         }
//     },
    // methods: {
    //     changePage(page) {
    //         if (page === 'loginDisplay' || page === 'homepageDisplay') {
    //             this.currentPage = page
    //         } else {
    //             // if (this.userData.isLogin) {
    //                 this.currentPage = page
    //             // }
    //         }
    //     },
    //     logout(){
    //         this.changePage('homepageDisplay')
    //         this.userData.isLogin = false
    //         localStorage.clear()
    //     },
    //     login(){
    //         const email = this.userData.email
    //         const password = this.userData.password
    //         axios({
    //             method: "POST",
    //             url: "http://localhost:3000/login",
    //             data: {
    //                 email,
    //                 password
    //             }
    //         })
    //             .then(response => {
    //                 const token = response.data.token
    //                 localStorage.setItem('token', token)
    //                 this.currentPage = 'homePageDisplay'
    //                 this.userData.isLogin = true
    //                 this.userData.email = ''
    //                 this.userData.password = ''
    //                 console.log(response)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     },
    //     register(){
    //         const email = this.userData.email
    //         const password = this.userData.password
    //         const first_name = this.userData.first_name
    //         const last_name = this.userData.last_name
    //         const role = this.userData.role

    //         axios({
    //             method: "POST",
    //             url: "http://localhost:3000/users",
    //             data: {
    //                 email,
    //                 password,
    //                 first_name,
    //                 last_name,
    //                 role
    //             }
    //         })
    //             .then(response => {
    //                 this.currentPage = 'loginDisplay'
    //                 this.userData.email = ''
    //                 this.userData.password = ''
    //                 this.userData.first_name = ''
    //                 this.userData.last_name = ''
    //                 this.userData.role = ''
    //                 console.log(response)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     },
    //     addTask(){
    //         const title = this.taskData.title
    //         const category = this.taskData.category
    //         const description = this.taskData.description
    //         const token = localStorage.getItem('token')
    //         axios({
    //             method: "POST",
    //             url: "http://localhost:3000/tasks",
    //             data: {
    //                 title,
    //                 category,
    //                 description
    //             },
    //             headers: {
    //                 token
    //             }
    //         })
    //             .then(response => {
    //                 this.fetchCards()
    //                 this.currentPage = 'cardsDisplay'
    //                 console.log(response.data)
    //             })
    //             .catch(err => {
    //                 console.log(err.response)
    //             })
    //     },
    //     fetchCards(){
    //         const token = localStorage.getItem('token')
    //         axios({
    //             method: "GET",
    //             url: "http://localhost:3000/tasks",
    //             headers: {
    //                 token
    //             }
    //         })
    //             .then(response => {
    //                 let allCategories = response.data.map( el => {
    //                     return el.category
    //                 })
    //                 let uniqueCategories = allCategories.filter( (value, index, array) => {
    //                     return array.indexOf(value) === index
    //                 })
    //                 this.categories = uniqueCategories

    //                 response.data.forEach(el => {
    //                     currentIndex = this.categories.indexOf(el.category)
    //                     if (currentIndex === 0) {
    //                         el.firstIndex = true
    //                         el.lastIndex = false
    //                     } else if(currentIndex === this.categories.length - 1){
    //                         el.lastIndex = true
    //                         el.firstIndex = false
    //                     } else {
    //                         el.lastIndex = true
    //                         el.firstIndex = true
    //                     }
    //                 })
    //                 this.cards = response.data
    //                 console.log(allCategories);
    //                 console.log(this.categories)
    //                 this.currentPage = 'cardsDisplay'
    //                 // console.log(response.data)
    //             })
    //     },
    //     onCategory(category, array){
    //         return array.filter(el => {
    //             return el.category === category
    //         })
    //     },
    //     deleteTask(el){
    //         const id = el.id
    //         const token = localStorage.getItem('token')
    //         axios({
    //             method: "DELETE",
    //             url: `http://localhost:3000/tasks/${id}`,
    //             headers: {
    //                 token
    //             }
    //         }) 
    //             .then(response => {
    //                 this.fetchCards()
    //                 console.log(response.data)
    //             })
    //             .catch(err => {
    //                 console.log(err.response)
    //             })
    //     },
    //     showDetail(el){
    //         const id = el.id
    //         const token = localStorage.getItem('token')
    //         axios({
    //             method: "GET",
    //             url: `http://localhost:3000/tasks/${id}`,
    //             headers: {
    //                 token
    //             }
    //         })
    //             .then(response => {
    //                 [response.data].forEach(el => {
    //                     currentIndex = this.categories.indexOf(el.category)
    //                     if (currentIndex === 0) {
    //                         el.firstIndex = true
    //                         el.lastIndex = false
    //                     } else if(currentIndex === this.categories.length - 1){
    //                         el.lastIndex = true
    //                         el.firstIndex = false
    //                     } else {
    //                         el.lastIndex = true
    //                         el.firstIndex = true
    //                     }
    //                 })
    //                 this.taskDetail = response.data
    //             })
    //             .catch(err => {
    //                 console.log(err.response)
    //             })
    //     },
    //     updateArrow(el, increment){
    //         const numberIncrement = Number(increment)
    //         const categories = this.categories
    //         const token = localStorage.getItem('token')
    //         const currentIndex = categories.indexOf(el.category)
    //         console.log(numberIncrement)
    //         const newCategory = categories[currentIndex + numberIncrement]
    //         console.log(numberIncrement + currentIndex)
    //         console.log(newCategory)
    //         const description = el.description
    //         const title = el.title
    //         const id = el.id
    //         console.log(title)
    //         axios({
    //             method: "PUT",
    //             url: `http://localhost:3000/tasks/${id}`,
    //             headers: {
    //                 token
    //             },
    //             data: {
    //                 title,
    //                 category: newCategory,
    //                 description
    //             }
    //         })
    //             .then(response => {
    //                 console.log(response.data)
    //                 this.fetchCards()
    //             })
    //             .catch(err => {
    //                 console.log(err.response)
    //             })

    //     }
    // }
// })
