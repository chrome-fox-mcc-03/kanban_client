<template>
    <div class="card project m-3" style="width: 18rem;">
        <h5 class="card-title h3 text-center">{{member.email}}</h5>
        <div class="card-body d-flex justify-content-between align-content-center ">
            
        </div>
    </div>
</template>

<script>

export default {
    name: 'Member',
    props: {
        member : Object
    }
}
</script>

<style>

</style>