<template lang="pug">
li.item_pokemon(@click="openModal")
  span {{ pokemonName }}
  i.pk-icon-star(:class="isFavorite&&'favorite'")
</template>
<script>
export default {
  name:'ItemPokemonList',
  props: {
    pokemonName: '',

  },
  data() {
    return {
      isFavorite: false
    }
  },
  methods: {
    openModal() {
      
    }
  },
}
</script>
<style lang="scss">
@import './../styles/variables.scss';
li{
  position: relative;
  background: #FFFFFF;
  border-radius: 5px;
  height: 60px;
  &.item_pokemon{
    padding-top: 17px;
    box-sizing: border-box;
    padding-left: 20px;
    margin-bottom: 10px;
  }
  i{
    background: $color_white_1;
    box-sizing: border-box;
    width: 44px;
    height: 44px;
    display: block;
    border-radius: 50%;
    font-size: 1.8rem;
    color: $color_gray_2;
    padding-top: 7px;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top:9px;
    &:hover{
      color:$color_yellow;
    }
  }
  span{
    font-weight: 500;
    font-size: 22px;
    color: $color_black;
    display: block;
    text-align: left;
    line-height: 1.2;
  }
}
  
</style>