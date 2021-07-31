<template lang="pug">
.list_pokemon
  transition(name="fade")
    loader(v-show="isLoading")
  search-input(@keyUpEnterSearch="searchPokemon")
  ul(@scroll="loadMorePokemons")
    ItemPokemonList(:pokemonName="pokemon.name" v-for="(pokemon, key) in pokemonList" :key="key")
</template>

<script>
import axios from 'axios'
import Loader from "@/components/Loader";
import SearchInput from "@/components/SearchInput";
import ItemPokemonList from "@/components/ItemPokemonList";


export default {
  name: "Home",
  components: {
    Loader,
    SearchInput,
    ItemPokemonList
  },
  data() {
    return {
      isLoading: false,
      isFavorite: false,
      offset: 0,
      limit: 10,
      quantity: 10,
      pokemonList: []
    }
  },
  mounted() {
    this.getPokemon();
  },
  methods: {
    searchPokemon (text) {
      console.log('text', text)
    },
    getPokemon() {
      console.log('sd', process.env)
      let params = {
        offset: this.offset,
        limit: this.limit
      }
      this.isLoading = true;
      axios.get(`${process.env.VUE_APP_BASE_URL_API}pokemon`, {params}).then(({data})=>{
        console.log(data)
        this.offset = this.offset + this.quantity;
        this.limit = this.limit + this.quantity;
        this.pokemonList=data.results;
        this.isLoading = false;
      })
    },
    loadMorePokemons(e) {
      let listElm = e.target;
      if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.getMorePokemons();
      }
    },
    getMorePokemons() {
      let params = {
        offset: this.offset,
        limit: this.limit
      }
      this.isLoading = true;
      setTimeout( ()=>{
        axios.get(`${process.env.VUE_APP_BASE_URL_API}pokemon`, {params}).then(({data})=>{
          this.offset = this.offset + this.quantity;
          this.limit = this.limit + this.quantity;
          this.pokemonList=[...data.results];
          this.isLoading = false;
        })
      }, 2000)
    }
  },
};
</script>
<style lang="scss">
@import './../styles/variables.scss';
.list_pokemon{
}
ul{
  height: calc(100vh - 340px);
  overflow: auto;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

</style>