<template>
<div class="card-container m-1 rounded">
    <div class="card-header">
        <div class="m-1 rounded status-red" style="height:2em;">
            <p class="font-weight-bold p-1">{{ card.priority }}</p>
        </div>
        <div class="card-header-user text-center">
            <img :src="card.User.avaurl" class="rounded" alt="avatar.jpg">
            <p class="font-weight-bold">{{ card.User.name }}</p>
        </div>
    </div>
    <div class="card-body">
        {{ card.description }}
    </div>
    <div class="card-footer">
    </div>
</div>
</template>

<script>
export default {
    props: {
        card: Object,
    },
    name: 'card-container'
}
</script>

<style>

</style>