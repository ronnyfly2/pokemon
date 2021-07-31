<template lang="pug">
.load_content()
  .loader
    img(alt="Vue logo" src="../assets/imgs/Loader.svg")
    .led
</template>
<script>
export default {
}
</script>
<style lang="scss">
@import './../styles/variables.scss';
.load_content{
  background: rgba(229, 229, 229, 1);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top:0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  animation: fadeInLoad .7s ease-in-out;

  .loader{
    width: 106px;
    height: 106px;
    animation: jump 3.5s ease-in-out infinite;
    position: relative;
  }
  .led{
    width: 20px;
    height: 20px;
    opacity: .7;
    background: red;
    position: absolute;
    left: 50%;
    right: 50%;
    top:50%;
    bottom:50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    animation: led 2.3s ease-in-out infinite;
  }
}
@keyframes jump {
  0% {transform: translateY(-160px) rotate(0deg)}
  50% {transform: translateY(160px) rotate(-360deg)}
  100% {transform: translateY(-160px) rotate(360deg)}
}
@keyframes led {
  0% {opacity: 0; box-shadow: 0px 0px 0px red;}
  50% {opacity: .8; box-shadow: 0px 0px 6px red;}
  100% {opacity: 0; box-shadow: 0 0px 0px red;}
}
@keyframes fadeInLoad {
  0% {background: rgba(229, 229, 229, .0);}
  100% {background: rgba(229, 229, 229, 1);}
}
</style>