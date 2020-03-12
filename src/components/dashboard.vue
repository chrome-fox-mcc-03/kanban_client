<template>
  <div  class="container" >
        <form>
        <h2>Select Project :</h2> 
            <select v-model="projectselect">
                <option v-for="(project, id) in projects" :key="id">{{project}}</option>
                
            </select>
            <input type="submit">
        
        <p>Users:</p><br>
        <div class="boxed">
         <ul >
             <li><p> </p></li>
         </ul>
        </div>
        <br>
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#TaskModal">
        Create Task
        </button>
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#FriendsModal">
        Add Friends 
        </button>
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#ProjectModal">
        CreateProjects 
        </button>
        </div>
</template>

<script>
export default {
    props: ['projects', 'projectselect'],
    data() {
        return {
            
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