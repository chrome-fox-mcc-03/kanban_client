<template>
  <section id="landing-page">
            <div id="nav-landing-bg">
                <div id="nav-landing-container">
                    <ul class="nav justify-content-between  align-items-center" id="nav-landing">
                        <li class="nav-item">
                        <h2 class="display-6">K a n b a n K u y</h2>
                        </li>
                        <li class="nav-item">
                        <p @click.prevent="changePage('login-page')" class="signin-btn">Sign In</p>
                        </li>
                    </ul>
                    <div class="jumbotron">
                        <h1 class="display-4">Kanban iz da way.</h1>
                        <hr class="my-4">
                        <p>The best out there. You don't have to bother other tools. Like, seriously.</p>
                        <a @click.prevent="changePage('sign-up-page')" class="btn btn-primary btn-lg signup-btn" href="" role="button">Sounds Interesting!</a>
                    </div>
                </div>
            </div>
            <div class="landing-content">
                <div class="landing-intro">
                    <div class="landing-intro-text">
                        <p class="h1">What in the world is Kanban?</p>
                        <p>Kanban is a workflow management method designed to help you visualize your work, maximize efficiency and be agile. 
                            From Japanese, kanban is literally translated as billboard or signboard. 
                            Originating from manufacturing, it later became a territory claimed by agile software development teams. 
                            Recently, it started getting recognized by business units across various areas.</p>
                    </div>
                    <img src="../landing-img.png" alt="" class="landing-img">
                </div>
            </div>
            <div class="landing-content">
                <div class="landing-intro">
                    <img src="../landing-img2.png" alt="" class="landing-img">
                    <div class="landing-intro-text">
                        <p class="h1">The 4 Core Principles of Kanban</p>
                        <p>David J. Anderson (a pioneer in the field of Lean/ Kanban for knowledge work) has formulated the Kanban method as an approach to incremental, 
                            evolutionary process and systems change for knowledge work organizations. 
                            It is focused on getting things done and the most important principles can be broken down into four basic principles and six practices.</p>
                    </div>
                </div>
            </div>
            <div class="landing-content-2">
                <div class="landing-intro">
                    <div class="landing-ico-card">
                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/2198796101582004488-256.png" alt="" class="landing-ico">
                        <p>Start With What You Do Now</p>

                    </div>
                    <div class="landing-ico-card">
                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/4400210571582004493-256.png" alt="" class="landing-ico">
                        <p>Agree to Pursue Incremental, Evolutionary Change</p>
                    </div>
                    <div class="landing-ico-card">
                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/1388560951582004484-256.png" alt="" class="landing-ico">
                        <p>Respect the Current Process, Roles & Responsibilities</p>
                    </div>
                    <div class="landing-ico-card">
                        <img src="https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/15307804281582004498-256.png" alt="" class="landing-ico">
                        <p>Encourage Acts of Leadership at All Levels</p>
                    </div> 
                </div>
            </div>
            <div class="landing-content">
                <a href="https://kanbanize.com/kanban-resources/getting-started/what-is-kanban/">Wanna know more about Kanban?</a>
                
            </div>
            <div class="footer">
                <p>Adam Primarizki. Hacktiv8 2020.</p>
            </div>
        </section>
</template>

<script>
export default {
    methods: {
        changePage(page){
            this.$emit('page', page)
        }
    }
}
</script>

<style>
.signin-btn:hover {
    background-color: rgb(255,255,255, 0.3);    
}
.signin-btn {
    transition: background-color 0.5s ease;
}
.signup-btn:hover {
    color: rgb(255,255,255, 0.3);    
}
.signup-btn {
    transition: color 0.5s ease;
}
</style>