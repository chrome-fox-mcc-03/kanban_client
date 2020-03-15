<template>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #364f6b;">
        <a class="navbar-brand" href="#"><img src="../assets/logoKanban.png" alt="logoKanban" width="40px" height="40px"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home</a>
                </li>
            </ul>
            <ul class="navbar-nav">
                <div>
                    <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Profile
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="#">{{ userName }}</a>
                        <a class="dropdown-item" href="#" @click="logout">Logout</a>
                    </div>
                </div>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'KanbanNavbar',
        methods: {
            logout() {
                this.$emit('logout')
            }
        },
        props: ['userName'],
        created() {
            
        }
    }
</script>

<style>

</style>