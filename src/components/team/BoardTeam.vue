<template>
  <div>
    <ListMember
      v-if="activity === 'list'"
      :members="members"
      :projectId="projectId"
      @invite="invite"
    ></ListMember>

    <InvitePanel
      v-if="activity === 'invite'"
      :projectId="projectId"
      @back="back"
    ></InvitePanel>

  </div>
</template>

<script>
import ListMember from './ListMembers'
import InvitePanel from './InvitePanel'

export default {
    name: 'BoardTeam',
    data(){
      return {
        activity : 'list'
      }
    },
    props: {
      members : Array,
      projectId : Number
    },
    components: {
      ListMember,
      InvitePanel
    },
    methods: {
      invite(){
        this.activity = 'invite'
      },
      back(){
        this.$emit('back', 'projects')
      }
    }
}
</script>

<style>

</style>