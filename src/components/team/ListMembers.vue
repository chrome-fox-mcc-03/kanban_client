<template>
    <div class="container main-board">
        <div class="d-flex justify-content-between align-content-center">

            <h1 class="display-4 d-flex justify-content-center m-3">       </h1>
            <h1 
             class="display-4 d-flex justify-content-center m-3"

            >Team</h1>
            <div class="d-flex align-content-center">
              <i 
                class="fas fa-user-plus fa-2x m-4"
                @click="invite"
              ></i>
            </div>
        </div>
        <div 
         class="row categories d-flex justify-content-center flex-wrap"
        >
          <div
           class=""
           v-for="member in members"
           :key="member.id"
          >
              <Member
                :member="member"
              ></Member>
          </div>
        </div>
  </div>
</template>

<script>
import Member from './Member'

export default {
    name: 'ListMember',
    props: {
        members : Array
    },
    components: {
        Member
    },
    methods: {
        invite(){
            this.$emit('invite')
        }
    }
}
</script>

<style>

</style>