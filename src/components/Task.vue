<template>
  <div class="tasks-card">
    <p class="card-content">
      LEARNING JAVASCRIPT FUNDAMENTAL
    </p>
    <h3>Title: <span> LEARNING</span></h3>
    <div class="card-icons">
      <a href="#">
        <MdAlarmIcon w="24px" h="24px" title="Due Date"></MdAlarmIcon>
      </a>
      <a href="#">
        <MdTrashIcon w="24px" h="24px" title="Delete"></MdTrashIcon>
      </a>
      <a href="#">
        <MdArrowRoundForwardIcon
          w="24px"
          h="24px"
          animate="beat"
          title="Move next to Category"
        ></MdArrowRoundForwardIcon>
      </a>
    </div>
  </div>
</template>

<script>
import AlertIcon from 'vue-ionicons/dist/ios-alert.vue';
import MdArrowRoundForwardIcon from 'vue-ionicons/dist/md-arrow-round-forward.vue';
import MdTrashIcon from 'vue-ionicons/dist/md-trash.vue';
import MdAlarmIcon from 'vue-ionicons/dist/md-alarm.vue';
export default {
  components: {
    AlertIcon,
    MdArrowRoundForwardIcon,
    MdTrashIcon,
    MdAlarmIcon
  }
};
</script>

<style scope>
.tasks-card {
  font-family: 'Raleway', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  min-width: 250px;
  max-width: 220px;
  max-height: 150px;
  width: 100%;
  background: cornflowerblue;
  color: cornsilk;
  text-align: left;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
.tasks-card * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.card-content {
  width: 100%;
  padding: 3rem 1.5rem;
  height: 150px;
  position: relative;
  -webkit-transform: scale(0.9);
  transform: scale(0.9);
  font-size: 0.8rem;
}

.tasks-card h3 {
  position: absolute;
  left: 0;
  color: #ffffff;
  top: 0;
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
  padding: 12px 15px;
  width: 100%;
  margin: 0;
  z-index: 1;
  text-transform: uppercase;
  font-weight: 400;
  background: crimson;
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
  font-size: 1rem;
}
.tasks-card h3 span {
  font-weight: 800;
}
.card-icons {
  width: 100%;
  bottom: 0;
  position: absolute;
  padding: 8px 12px;
  background: crimson;
  text-align: right;
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
.card-icons > AlertIcon {
  padding: 0px 8px;
  position: relative;
  bottom: -60px;
}

AlertIcon {
  font-size: 24px;
}

.tasks-card a {
  color: white;
  opacity: 0.8;
  -webkit-transition-property: none;
  transition-property: none;
  text-decoration: none;
}
.tasks-card a:hover {
  opacity: 1;
}
.tasks-card.blue h3 {
  background: #20638f;
}
.tasks-card.blue > div {
  background-color: #20638f;
}
.tasks-card.red h3 {
  background: #962d22;
}
.tasks-card.red > div {
  background-color: #962d22;
}
.tasks-card.yellow h3 {
  background: #c87f0a;
}
.tasks-card.yellow > div {
  background-color: #c87f0a;
}
.tasks-card:hover .card-content,
.tasks-card.hover .card-content {
  -webkit-transform: scale(1);
  transform: scale(1);
}
.tasks-card:hover h3,
.tasks-card.hover h3 {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  opacity: 1;
  -webkit-transition-delay: 0;
  transition-delay: 0;
}
.tasks-card:hover > div,
.tasks-card.hover > div {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-transition-delay: 0s;
  transition-delay: 0s;
}
.tasks-card:hover > div a i,
.tasks-card.hover > div a i {
  bottom: 0;
}
.tasks-card:hover a:first-child i,
.tasks-card.hover a:first-child i {
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
}
.tasks-card:hover a:nth-child(2) i,
.tasks-card.hover a:nth-child(2) i {
  -webkit-transition-delay: 0.35s;
  transition-delay: 0.35s;
}
.tasks-card:hover a:nth-child(3) i,
.tasks-card.hover a:nth-child(3) i {
  -webkit-transition-delay: 0.4s;
  transition-delay: 0.4s;
}
</style>
