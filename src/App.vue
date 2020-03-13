<template>
  <div id="container">
      <top-navbar @changePage="changePage" ></top-navbar>
      <home-section v-if="currentPage == 'home'" @changePage="changePage" @fetchTodo="fetchTodo"></home-section>
      <!-- <outer-card></outer-card> -->
      
      <content-section v-else-if="currentPage == 'content-section'" @fetchTodo="fetchTodo" :showTasks='showTasks'></content-section>
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
      <footer-section></footer-section>
  </div>
</template>

<script>
import HomeSection from "./components/Home"
import RegisterSection from "./components/RegisterForm"
import TopNavbar from './components/TopNavbar'
import FooterSection from './components/Footer'
import ContentSection from "./components/Content"

import axios from 'axios'

export default {
    name: 'App',
    data () {
        return {
            currentPage : 'home',
            newBacklog : {
                title : '',
                category : 'backlog'
            },
            showTasks : [],
            loginInput : {
                email : '',
                password : ''
            },
            registerInput : {
                name : '',
                email : '',
                password : ''
            }
        }
    },
    components : {
        HomeSection,
        RegisterSection,
        ContentSection,
        TopNavbar,
        FooterSection,
    },
    created () {
        const access_token = localStorage.getItem('access_token')
        if(access_token){
            this.fetchTodo()
        }
    },
    methods : {
        changePage : function(page){
            
            this.currentPage = page
        },
        fetchTodo : function(){

            const access_token = localStorage.getItem('access_token')
            axios({
                method : 'GET',
                url : 'http://localhost:3000/task',
                headers : {
                    access_token
                },
            })
            .then(({data}) => {
                
                console.log(data);
                this.showTasks = data
                
            }).catch((err) => {
                console.log(err);
                
            });

        },
        addProject : function(){
            const addTitle = this.newBacklog.title
            const addCategory = this.newBacklog.category
            console.log(addTitle);
            
            const access_token = localStorage.getItem('access_token')
            axios({
                method : 'POST',
                url : `http://localhost:3000/task`,
                headers : {
                    access_token
                },
                data : {
                    title : addTitle,
                    category : addCategory
                }
            })
            .then((todoCreated) => {
                // console.log(todoCreated);
                // fetchBacklogs()
            }).catch((err) => {
                console.log(err);
                
            });

        },
    },
    beforeMount() {
        if(localStorage.access_token){
            this.currentPage = 'content-section'
        }
    }

}
</script>

<style>


* {
    margin: 0;
    padding: 0;
}

body {
    background-image: url('https://images.unsplash.com/photo-1583142262682-8bd4063c2a3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjczMTc0fQ&auto=format&fit=crop&w=1350&q=80');
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-direction: column;
}



#container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}


.collapsible-body {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-end;
}

.add-task-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}


.form-reglog {
    background-color: ivory;
}

.label-form {
    font-family: 'Coming Soon', cursive;
}

.input-form {
    width: 15vw;
    height: 5vh;
}


.btn{
    padding: 5px 5px;
}

.form-section {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.page-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

#addProjectField {
    outline: none;
    border: none;
    border-bottom: solid black;
}

#addProjectField:focus {
    outline: none;
}

/*
Card content design
*/



/*
FORM CUSTOMIZATION
*/

/* 
.form-group {
    width: 20vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;;
} */

</style>