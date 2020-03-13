<template>
    <nav class="navbar1">
        <ul class="navbar-list">
            <li class="navbar-item">
                <a href="#" id="btn-navbar-home" @click="goToHome()" class="navbar-link" style="text-decoration: none;">
                    <i class="fas fa-home"></i>
                    <span class="link-text">Home</span>
                </a>
            </li>
            <li class="navbar-item">
                <a href="#" id="btn-navbar-task" @click="goToTask()" class="navbar-link" style="text-decoration: none;">
                    <i class="fas fa-tasks"></i>
                    <span class="link-text">Task</span>
                </a>
            </li>
            <li class="navbar-item">
                <a href="#" id="btn-navbar-project" class="navbar-link" style="text-decoration: none;">
                    <i class="fab fa-trello"></i>
                    <span class="link-text">Project</span>
                </a>
            </li>
            <li class="navbar-item">
                <a href="#" id="btn-navbar-logout" @click="logout()" class="navbar-link" style="text-decoration: none;">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="link-text">Logout</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data () {
        return {

        }
    },
    methods :{
        logout() {
            localStorage.clear()
            this.$emit('logout', 'landingPage')
        },
        goToTask() {
            this.$emit('goToTask', { name: 'goToTask', val: 'taskPage' })
        },
        goToHome() {
            this.$emit('goToHome', { name: 'goToHome', val: 'homePage'})
        }
    }
}
</script>

<style>
:root {
    font-size: 16px;
    font-family: 'Open Sans';
    --text-primary: black;
    --text-secondary: black;
    --bg-primary: #D5A57E;
    --bg-secondary: #CC8652;
    --transition-speed: 600ms;
}

.navbar1 {
    z-index: 2;
    position: fixed;
    background-color: var(--bg-primary);
    height: 100vh;
    width: 3rem;
    border-radius: 0 15px 15px 0;
    transition: width 500ms ease;
    z-index: 1;
}

.navbar-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.navbar-item {
    margin-top: 0px;
    width: 100%;
}

.navbar-item:last-child {
    margin-top: auto;
}

.navbar-link {
    display: flex;
    align-items: center;
    height: 5rem;
    color: var(--text-primary);
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: var(--transition-speed);
}

.navbar-link:hover {
    border-radius: 15px;
    filter: grayscale(0%) opacity(1);
    background: var(--bg-secondary);
    color: var(--text-secondary);
}

.link-text {
    font-weight: bolder;
    display: none;
}

ul {
    list-style-type: none;
}

i {
    min-width: 2rem;
    margin: 0 1rem 0 1rem;
}

.navbar1:hover {
    width: 10rem;
}

.navbar1:hover .link-text {
    display: block;
}
</style>