"use strict"

const app = new Vue({
    el: '#app', 
    data: {
      status: {
        args: false,
        loggedIn: {
            onPage: 'dashboard-home',
            show: ''
        },
        loggedOut: {
            onPage: 'landing-page'
        }
      },
      userDataLogIn: {
          email: '',
          password: ''
      },
      yourBoards: [],
      sharedBoards: [],
      cards: {
          backlogs: [],
          todos: [],
          ongoings: [],
          dones:[]
      },
      boardParams: {
          bgUrl: '',
          title:''
      },
      cardParams: {
          id: null,
          title: '',
          due_date: '',
          description: '',
          editName: false,
          editDesc: false,
          editDue_date: false
      }
    },
    methods: {
        changePage: function(pageToShow){
            if (!this.status.args) this.status.loggedOut.onPage = pageToShow
            else if(this.status.args) {
                this.status.loggedIn.onPage = pageToShow
                if(pageToShow === 'dashboard-home') {
                    this.fetchSharedBoard()
                    this.fetchYourBoard()
                }else if(pageToShow === 'kanban-board'){
                    this.fetchCards()
                }
            }
        },     
        showSetting: function(show){
            this.status.loggedIn.show = show
        },      
        logMeIn: function(){
            if(this.userDataLogIn.password == 'asdasd') {
                this.fetchYourBoard()
                this.fetchSharedBoard()
                this.status.args = true
            }
        },
        logMeOut: function(){
            this.status.args = false
            this.status.loggedOut.onPage = 'landing-page'
            this.reset()
        },
        reset: function(){
            for(const key in this.userDataLogIn){
                this.userDataLogIn[key] = ''
            }
            this.status.loggedIn.show = ''
        },
        fetchYourBoard: function(){
            axios({
                method: 'GET',
                url: 'http://localhost:3000/boards'
            })
            .then(({data}) => this.yourBoards = data)
            .catch(err => console.error(err))
        },
        fetchSharedBoard: function(){
            axios({
                method: 'GET',
                url: 'http://localhost:3000/sharedBoards'
            })
            .then(({data}) => this.sharedBoards = data)
            .catch(err => console.error(err))
        },
        fetchCards: function(){
            axios({
                method: 'GET',
                url: ' http://localhost:3000/cards'
            })
            .then(({data}) => {
                this.cards = {
                    backlogs: [],
                    todos: [],
                    ongoings: [],
                    dones: []
                }
                data.forEach(el => {
                    this.cards[`${el.status}s`].push(el)
                })
            })
            .catch(err => console.error(err))
        },
        showBoard(bg, title){
            this.boardParams.bgUrl = bg
            this.boardParams.title = title
            this.changePage('kanban-board')
        },
        showCard(title, description, due_date){
            this.cardParams.description = description
            this.cardParams.title = title
            this.cardParams.due_date = due_date
            this.showSetting('kanban-detail')
        }
    },
    created(){
        if(this.status.args){
            this.fetchYourBoard()
            this.fetchSharedBoard()
        }
    }
  })
