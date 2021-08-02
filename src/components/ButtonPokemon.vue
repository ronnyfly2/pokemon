<template lang="pug">
button(:class="iconName&&'with_icon'" :disabled="isDisabled" @click="onClickEvent")
  i(v-if="iconName" :class="iconName")
  span {{ text }}
</template>
<script>
export default {
  props:{
    iconName: {
      type: String,
      default: ()=> ''
    },
    text: {
      type: String,
      default: ()=> ''
    },
    isDisabled: {
      type: Boolean,
      default: ()=> false
    },
    onClickEvent: {
      type: Function,
      required: false,
      default: ()=> console.log('event')
    }
  }
}
</script>
<style lang="scss">
@import './../styles/variables.scss';
button{
  padding-left: 20px;
  padding-right: 20px;
  height: 44px;
  color: white;
  background: $color_normal-red;
  border: 0;
  outline: 0;
  border-radius: 60px;
  cursor: pointer;
  &.with_icon{
    padding-left: 22px;
    padding-right: 22px;
    width: 150px;
  }
  &:active{
    background: $color_pressed-red;
  }
  &:disabled{
    background: $color_gray_2;
  }
  i{
    vertical-align: middle;
    margin-right: 10px;
  }
  span{
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    vertical-align: middle;
  }
}
@media (min-width: 576px) {
  button{
    &.with_icon{
      width: 275px;
    }
  }
}
</style>