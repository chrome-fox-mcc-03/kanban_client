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
    <Card></Card>
  </div>
</template>
<script>
import Axios from '../config/axios'
import Card from './card'
export default {
  name: 'KanbanBoard',
  components : {
    Card
},
    data: () => {
      return {
        pId : localStorage.getItem('projectId'),
        userId : 0,
        memberList : [],
        joinedList : []
      }
    },
    methods: {
      fetchMember(){
        Axios({
          url : `/member`,
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
          url : `/joinedmember/${ProjectId}`,
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
          url : `/member`,
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
      }
    },
    created() {
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