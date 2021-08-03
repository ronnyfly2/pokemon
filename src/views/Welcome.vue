<template lang="pug">
.welcome_content
  .welcome_pikachu
    img(alt="Pikachu" src="../assets/imgs/pikachu.svg")
  .welcome_text
    h1 Welcome to Pokédex
    p The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.
    ButtonPokemon(:text="'Get started'" :onClickEvent="getInit")
</template>
<script>
import ButtonPokemon from "@/components/ButtonPokemon";
export default {
  components:{
    ButtonPokemon
  },
  methods: {
    getInit() {
      this.$router.push({ path: 'home' })
    }
  },
}
</script>
<style lang="scss">
@import './../styles/variables.scss';
.welcome_content{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  .welcome_text{
    max-width: 570px;
  }
  p{
    margin-bottom:50px;
  }
}
.welcome_pikachu{
  position: relative;
  width: 325px;
  height: 288px;
  z-index: 5;
  margin-bottom: 32px;
  &::before{
    content: '';
    width: 206px;
    height: 206px;
    background: $color_normal-red;
    display: block;
    border-radius: 50%;
    border: 2px solid #333333;
    position: absolute;
    z-index: -1;
    left: 47px;
    bottom: 11px;
  }
}
</style>