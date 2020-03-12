<template>
    <nav v-if="isLogin" class="navbar navbar-expand-lg navbar-dark bg-dark" style="z-index: 10;">
        <a class="navbar-brand" href="#">Kanban</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="showCard">Add Card</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="$emit('logout')">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['isLogin'],
    methods: {
        showCard() {
            this.$emit('showAddCard')
        }
    }
}
</script>

<style>

</style>