<template lang="pug">
li.item_pokemon
  span(@click="openModal") {{ pokemonName }}
  slot()
</template>
<script>

export default {
  name:'ItemPokemonList',
  props: {
    pokemonName: {
      type: String,
      default: ()=>''
    }
  },
  methods: {
    openModal() {
      this.$emit('openModalDetail', this.pokemonName)
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
    position: absolute;
    right: 10px;
    top:9px;
  }
  span{
    font-weight: 500;
    font-size: 22px;
    color: $color_black;
    display: block;
    text-align: left;
    line-height: 1.2;
    cursor: pointer;
    text-transform: capitalize;
    &:hover{
      text-decoration: underline;
    }
  }
}
  
</style>