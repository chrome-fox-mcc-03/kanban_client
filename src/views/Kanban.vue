<template>
    <div>
        <kanban-navbar @logout="logout"></kanban-navbar>
        <div class="dashboardPage">
            <div align="center" style="background-color: #3fc1c9;">
                <form>
                    <input type="text" placeholder="Your Task">
                    <input type="submit" value="Add Task">
                </form>
            </div>
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <div class="box">
                        <div class="col-md-3 kanban-board">
                            <div class="kanban-title">
                                <h3>
                                    TITLE
                                </h3>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title" style="color: #fc5185;">
                                        TEST
                                    </h5>
                                    <p class="card-text">
                                        INI BUDI
                                        INI BUDI
                                        INI BUDI
                                        INI BUDI
                                        INI BUDI
                                        INI BUDIINI BUDIINI BUDIINI BUDIINI BUDIINI BUDIINI BUDIINI BUDIINI BUDIINI
                                        BUDIINI BUDIINI BUDIINI BUDIINI BUDIINI BUDIINI BUDIINI BUDIINI BUDIINI BUDIINI
                                        BUDIINI BUDIINI BUDI
                                    </p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title" style="color: #fc5185;">
                                        TEST
                                    </h5>
                                    <p class="card-text">
                                        INI BUDI
                                    </p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title" style="color: #fc5185;">
                                        TEST
                                    </h5>
                                    <p class="card-text">
                                        INI BUDI
                                    </p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title" style="color: #fc5185;">
                                        TEST
                                    </h5>
                                    <p class="card-text">
                                        INI BUDI
                                    </p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title" style="color: #fc5185;">
                                        TEST
                                    </h5>
                                    <p class="card-text">
                                        INI BUDI
                                    </p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title" style="color: #fc5185;">
                                        TEST
                                    </h5>
                                    <p class="card-text">
                                        INI BUDI
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import KanbanNavbar from '../components/KanbanNavbar'
    export default {
        name: 'Kanban',
        data() {
            return {

            }
        },
        methods: {
            logout() {
                this.$emit('logout')
            }
        },
        components: {
            KanbanNavbar
        }
    }
</script>

<style>
    .row {
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        background-color: #3fc1c9;
        overflow-y: auto;
    }

    .box {
        box-sizing: border-box;
        border-radius: 5px;
        background-color: #f5f5f5;
        margin: 10px 10px;
        min-width: 20em;
        max-height: 82vh;
        overflow-x: auto;
    }

    .card {
        width: 17em;
        border-radius: 5px;
        box-sizing: border-box;
        margin: 10px 0;
        min-height: 6em;
    }

    .kanban-title {
        margin-top: 10px;
    }

    .card-body {
        padding: 10px;
    }

    .card-text {
        font-size: 10px;
        font-family: 'Roboto', sans-serif;
    }

    .card-title {
        font-size: 15px;
        margin-bottom: 10px;
        font-family: 'Proza Libre', sans-serif;
    }
</style>