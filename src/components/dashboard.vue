<template>
  <div  class="container" >
        <form @submit.prevent="generateTask">
        <h2>Select Project :</h2> 
            <select v-model="projectselect">
                <option v-for="(project, id) in projects" :key="id" :value="project.Project.id">{{project.Project.Title}}</option>
                
            </select>
            <input type="submit" class="btn btn-primary" value="Select Project"/>
        </form>
        <p>Users:</p><br>
        <div class="boxed" >
         <ul >
             <li v-for="user in users" :key="user.User.id"><p>{{user.User.Email}} </p></li>
         </ul>
        </div>
        <br>
        <button type="button" v-if="isProject" class="btn btn-info" data-toggle="modal" data-target="#TaskModal">
        Create Task
        </button>
        <button type="button" v-if="isProject" class="btn btn-info" data-toggle="modal" data-target="#FriendsModal">
        Add Friends 
        </button>
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#ProjectModal">
        CreateProjects 
        </button>
        </div>
</template>

<script>
export default {
    props: ['projects', 'users', "isProject"] ,
    data() {
        return {
            projectselect: ''
        }
    },
    methods: {
        generateTask() {
            console.log('generate task emit')
            this.$emit("generateTask", this.projectselect)
        }
    }

}
</script>

<style>
.boxed {
  border: 5px solid green ;
  background-color: white;
  width: 10vw;
  height: 10vw;
  overflow: scroll;
  justify-content: center;
  align-items: center;
  margin-left: 40%;
  padding: 0%;
  text-align: left;
}
</style>