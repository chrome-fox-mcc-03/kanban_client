<template>
  <section>
       <div class="profile-option shadow" v-show="this.status.loggedIn.show === 'profile-option'">
                <img  @click.prevent="showSetting('')" src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/12355707351582004488-256.png" alt="">
                <h2 class="display-6">Help</h2>
                <h2  @click.prevent="logMeOut" class="display-6">Sign Out</h2>
            </div>
            <div class="nav-container shadow">
                <ul class="nav justify-content-between align-items-center" id="nav-landing">
                    <li class="nav-item">
                        <h2 class="display-6">K a n b a n K u y</h2>
                    </li>
                    <li class="nav-item">
                        <img  @click.prevent="showSetting('profile-option')" src="https://www.wretched.org/wp-content/uploads/2017/09/Anon-profile.png" alt="">
                    </li>
                </ul>
            </div>
            <div class="dashboard-container"  @click.prevent="showSetting('')">
                <div class="dashboard-navigator">
                    <form class="form-inline">
                        <input class="form-control" type="search" placeholder="Search Board">
                        <button class="btn" type="submit"><img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/2072119491582004497-256.png" alt=""></button>
                    </form>
                    <p>New Board</p>
                </div>
                <div class="dashboard-content">
                    <div class="your-kanban-board">
                        <h2 class="display-6">Your Kanban Board</h2>
                        <div class="your-kanban-board-container row" >
                            <div class="board col-3 col" 
                            v-for="board in yourBoards" :key="board.id"
                            v-bind:style="{'background-image':'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3) ), url(' + board.bgUrl + ')'}"
                            @click.prevent="showBoard(board.bgUrl, board.title)">
                                <h3 class="display-6">{{board.title}}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="your-kanban-board shared-kanban">
                        <h2 class="display-6">Shared Kanban Board</h2>
                        <div class="your-kanban-board-container row">
                            <div class="board col-3 col" 
                            v-for="board in sharedBoards" :key="board.id"
                            v-bind:style="{'background-image':'linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3) ), url(' + board.bgUrl + ')'}"
                            @click.prevent="showBoard(board.bgUrl, board.title)">
                                <h3 class="display-6">{{board.title}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p>Adam Primarizki. Hacktiv8 2020.</p>
        </div>
  </section>
</template>

<script>
export default {
    name: 'DashboardHomePage'

}
</script>

<style>

</style>