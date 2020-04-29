<template>
    <div id="main-page">
        <NavBar 
            @changePage="changePage">
        </NavBar>
        <MainSpace @load="load"></MainSpace>
        <div id="loading-space">
            <lottie-player
                v-if="isLoading"
                src="https://assets8.lottiefiles.com/datafiles/67bae0ddb57b26679d10e9ce7c1d445f/data.json"  background="transparent"  speed="1"  style="width: 100px; height: 100px;"  loop autoplay >
            </lottie-player>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar';
import MainSpace from '../components/MainSpace';
export default {
    name: 'MainPage',
    data: function() {
        return {
            isLoading: false
        }
    },
    methods: {
        changePage(page) {
            this.$emit('changePage', page)
        },
        load(state) {
            this.isLoading = state
        }
    },
    components: {
        NavBar,
        MainSpace
    }
}
</script>

<style scoped>
    #loading-space {
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0;
    }
</style>