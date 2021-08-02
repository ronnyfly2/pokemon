<template lang="pug">
  #app
    transition(
      :name="$store.state.pageTransition.name"
      :mode="$store.state.pageTransition.mode"
      v-on:after-enter="afterEnter"
      v-on:after-leave="afterLeave")
      router-view.transition
</template>
<script>
import Store from "./store/index";
export default {
  methods: {
    afterEnter: () => {
      window.scrollTo(0, 0);
    },
    afterLeave: () => {
      Store.commit("setPageTransition", "fade");
    }
  }
}
</script>
<style lang="scss">
@import './styles/variables.scss';
#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.transition {
  overflow: hidden;
}
.router-view {
  &-enter-active,
  &-leave-active {
    position: fixed;
    width: 100%;
    background: $color_bg-gray;
    min-height: 100vh;
    top: 0;
  }
}

.router-view-enter-active {
  transition: transform 0.8s ease-in;
  z-index: 99;
  transform: translateX(100%);
}
.router-view-enter-to {
  z-index: 99;
  transform: translateX(0%);
}
.router-view-leave-active {
  z-index: -1;
}
.router-view-leave-to {
  z-index: -1;
}
</style>
