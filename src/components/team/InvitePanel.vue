<template>
    <div class="modal-dialog text-center">
        <div class="col-sm-20 main-section">
            <div class="modal-content">
                <!-- <div class="col-12 user-img">
                    <img src="https://i.pinimg.com/originals/6d/b9/88/6db988869c105086253a0c388796e1ea.gif" alt="" srcset="">
                </div> -->
                <div class="col-12 form-input">
                    <form @submit.prevent="invite">
                        <h1>Invite Member</h1>
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder="Email" v-model="email" >
                        </div>
                        <div class="d-flex justify-content-between">
                            <button @click="back" type="button" class="btn btn-success m-1">Back</button>
                            <button type="submit" class="btn btn-success m-1">Send Invitation</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosKanban from '../../config/index'

export default {
    name:'InvitePanel',
    data(){
        return {
            email : ''
        }
    },
    props: {
        projectId : Number
    },
    methods: {
        invite(){
            let emailInvite = {
                email : this.email
            }
            console.log(emailInvite)
            axiosKanban({
                method: 'POST',
                url: '/find',
                data : emailInvite
            })
                .then(({data})=> {
                    if(data){
                        return axiosKanban({
                            method: 'post',
                            url: '/projectusers/invite',
                            data: {
                                ProjectId : this.projectId,
                                UserId : data.id
                            },
                            headers: {
                                access_token : localStorage.access_token
                            }
                        })
                    } else {
                        console.log('User Not Found!')
                    }
                })
                .then(({data}) => {
                    this.back()
                })
                .catch(err => {
                    console.log(err.response)
                })
        },
        back(){
            this.$emit('back')
        }
    }
}
</script>

<style>

</style>