<template>
    <div>
        <h2 class="title">Draggable example</h2>
        <draggable
        v-model="exampleList"
        >
            <transition-group name="list-complete">
                <div
                v-for="text in exampleList" :key="text"
                class="drag-item flex flex-justify-betweeen"
                @dragend="log('a')"
                >{{ text }}</div>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: "Drag",
    data() {
        return {
        exampleList: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]
        };
    },
    components: {
        draggable
    },
    methods: {
        log: function(...e) {
        console.log(...e);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
    margin-bottom: 2em;
}
.bigger-area > span {
    min-height: 90vh;
    display: block;
}
.drag-item {
    padding: 15px 10px;
    background-color: whitesmoke;
    min-width: 30vw;
    max-width: 90vw;
    margin: 0 auto 10px;
    cursor: -moz-grab;
    cursor: -webkit-grab;
    cursor: grab;
    transition: transform 0.25s cubic-bezier(0.02, 1.01, 0.94, 1.01);
    will-change: transform;
}
.list-complete-enter,
.list-complete-leave-active {
    opacity: 0;
}
</style>
