<template lang="pug">
i.icon.pk-icon-star(:class="isFavorite&&'favorite'" @click="addFavorite(pokemon)")
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'StarFavorite',
  props:{
    isFavorite: {
      type: Boolean,
      default: ()=>false
    },
    pokemon: {
      type: Object,
      default: ()=>({})
    }
  },
  methods: {
    ...mapActions(['addFavoritePokemon']),
    addFavorite(pokemon) {
      this.addFavoritePokemon(pokemon);
    }
  },
}
</script>
<style lang="scss">
@import './../styles/variables.scss';
.icon{
  display: block;
  &.pk-icon-star{
    background: $color_white_1;
    box-sizing: border-box;
    width: 44px;
    height: 44px;
    cursor: pointer;
    border-radius: 50%;
    font-size: 1.8rem;
    color: $color_gray_2;
    padding-top: 7px;
    text-align: center;
    &.favorite,
    &:hover{
      color:$color_yellow;
    }
  }
}
</style>