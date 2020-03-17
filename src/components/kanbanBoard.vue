<template>
  <div class="container-fluid">
    <h1> Kanban Board </h1>
    <form @submit.prevent="join">
      <label for="member">Invite Member</label>
      <select v-model="userId">
        <option v-for="member in memberList" :key="member.id" :value="member.id">{{member.name}}</option>
      </select>
      <button class="btn btn-outline-primary">Invite</button>
    </form>
    <form @submit.prevent="remove">
      <label for="member">Remove Member</label>
      <select v-model="userId">
        <option v-for="member in joinedList" :key="member.User.id" :value="member.User.id">{{member.User.name}}</option>
      </select>
      <button class="btn btn-outline-danger">Remove</button>
    </form>
    <div class="row">
      <div v-for="category in categoryList" :key="category.id" class="col-md-2 category overflow-auto">
        <div>
          <h5>{{category.name}}</h5>
          <ul>
            <li v-if="category.id == 1">
              <form @submit.prevent="addTask">
                <label for="kanban">Todo</label>
                <input type="text" v-model="title" autofocus>
                <button class="btn btn-outline-primary">Add</button>
              </form>
            </li>
            <li v-for="task in taskList" :key="task.id">
              <div v-if="task.CategoryId == category.id" class="card">
                <div class="card-body">
                  <h5>{{task.title}}</h5>
                  <a v-if="category.id !== 1" href="#" class="btn btn-primary"
                    @click.prevent="rewind(task.id,task.CategoryId)">back</a>
                  <a href="#" class="btn btn-primary"
                    @click.prevent="patch(task.id,task.CategoryId)">next</a>
                  <a v-if="category.id == 6" href="#" class="btn btn-danger"
                    @click.prevent="deleted(task.id)">delete</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  name: 'KanbanBoard',
    data: () => {
      return {
        categoryList: [],
        pId : localStorage.getItem('projectId'),
        taskList : [],
        title : '',
        userId : 0,
        memberList : [],
        joinedList : []
      }
    },
    methods: {
      fetchMember(){
        Axios({
          url : `http://localhost:3000/member`,
          method: 'get',
          headers: {
            token: localStorage.getItem('token')
          }
          })
          .then(({data}) => {
            this.memberList = data
          })
          .catch(({err}) => {
            console.log(err)
          })
      },
      fetchJoinedMember(){
        let ProjectId = this.pId
        Axios({
          url : `http://localhost:3000/joinedmember/${ProjectId}`,
          method: 'get',
          headers: {
            token: localStorage.getItem('token')
          }
          })
          .then(({data}) => {
            this.joinedList = data
          })
          .catch(({err}) => {
            console.log(err)
          })
      },
      join(){
        const projectId = this.pId
        Axios({
          url : `http://localhost:3000/member`,
          method: 'post',
          headers: {
            token: localStorage.getItem('token')
          },
          data : {
            userId : this.userId,
            ProjectId : projectId
          }
        })
          .then(({data})=> {
            this.memberList = []
            this.fetchMember()
          })
          .catch(({err}) => console.log(Err))
      },
      fetchTask() {
        const projectId = this.pId
        Axios({
            url: `http://localhost:3000/${projectId}`,
            method: 'get',
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({data}) => {
            this.taskList = data
          })
          .catch(({err}) => {
            console.log(err)
          })
      },
      fetchData() {
        Axios({
            url: "http://localhost:3000/board",
            method: 'GET',
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({data}) => {
            this.categoryList = data
          })
          .catch(({err}) => {
            console.log(err)
          })
      },
      patch(id, CategoryId) {
        CategoryId++
        Axios({
            url: `http://localhost:3000/${id}`,
            method: 'patch',
            headers: {
              token: localStorage.getItem('token')
            },
            data: {
              CategoryId
            }
          })
          .then(({data}) => {
            this.taskList = []
            this.fetchTask()
          })
          .catch(({err}) => {
            console.log(err)
          })
      },
      rewind(id, CategoryId) {
        CategoryId--
        Axios({
            url: `http://localhost:3000/${id}`,
            method: 'patch',
            headers: {
              token: localStorage.getItem('token')
            },
            data: {
              CategoryId
            }
          })
          .then(({data}) => {
            this.taskList = []
            this.fetchTask()
          })
          .catch(({err}) => {
            console.log(err)
          })
          .finally(_ => {
            this.taskList = []
            this.fetchTask()
          })
      },
      addTask() {
        const projectId = this.pId
        console.log(projectId)
        Axios({
            url: `http://localhost:3000/${projectId}`,
            method: 'post',
            headers: {
              token: localStorage.getItem('token')
            },
            data: {
              title: this.title
            }
          })
          .then(({
            data
          }) => {
            console.log(data)
            this.title = ''
            this.taskList = []
            this.fetchTask()
          })
          .catch(({
            err
          }) => {
            console.log(err)
          })
      },
      deleted(id) {
        Axios({
            url: `http://localhost:3000/member`,
            method: 'delete',
            headers: {
              token: localStorage.getItem('token')
            },
            data : {
              UserId : this.userId,
              ProjectId : this.pId
            }
          })
          .then(({data}) => {
            this.memberList = []
            this.fetchMember()
          })
          .catch(({err}) => {
            console.log(err)
          })
      }
    },
    created() {
      this.fetchData()
      this.fetchTask()
      this.fetchMember()
      this.fetchJoinedMember()
      // console.log('di kanban', this.categoryList)
    }
  } 
  </script>
<style>
.category {
  color: black;
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
</style>