<template lang="pug">
.content
  .list_pokemon
    transition(name="fade")
      loader(v-show="isLoading")
    search-input.search_content(ref="searchRef" @keyUpEnterSearch="searchPokemon")
    ul(v-if="!isActiveFavoritesList && !isPokemonItemActives" @scroll="loadMorePokemons")
      ItemPokemonList(:pokemonName="pokemon.name" v-for="(pokemon, key) in pokemonList" :key="key")
        star-favorite(:isFavorite="pokemon.isFavorite" :pokemon="pokemon")
    ul(v-else-if="!isActiveFavoritesList && isPokemonItemActives")
      ItemPokemonList(:pokemonName="pokemonItem[pokemonItem.length -1].name")
        star-favorite(:isFavorite="pokemonItem[pokemonItem.length -1].isFavorite" :pokemon="pokemonItem[pokemonItem.length -1]")
    ul(v-else)
      ItemPokemonList(:pokemonName="pokemon.name" v-for="(pokemon, key) in favorites" :key="key")
        star-favorite(:isFavorite="pokemon.isFavorite" :pokemon="pokemon")
  footer
    .content_footer
      button-pokemon(:text="'All'" :iconName="'pk-icon-list'" :onClickEvent="getPokemonList")
      button-pokemon(:text="'Favorites'" :iconName="'pk-icon-star'" :isDisabled="favorites.length>0?false:true" :onClickEvent="getFavoritesList")
  //-ModalDetail()
</template>

<script>
import axios from 'axios';
import Loader from "@/components/Loader";
import SearchInput from "@/components/SearchInput";
import ItemPokemonList from "@/components/ItemPokemonList";
import ButtonPokemon from "@/components/ButtonPokemon";
import ModalDetail from "@/components/ModalDetail";
import StarFavorite from "@/components/StarFavorite";
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  components: {
    Loader,
    SearchInput,
    ItemPokemonList,
    ButtonPokemon,
    ModalDetail,
    StarFavorite
  },
  data() {
    return {
      isLoading: false,
      isFavorite: false,
      isActiveFavoritesList: false,
      isPokemonItemActives: false,
      offset: 0,
      limit: 25,
      quantity: 25,
      count: 0,
      pokemonList: [],
      pokemonItem: [],
      setText: '',
      urlApi: process.env.VUE_APP_BASE_URL_API,
    }
  },
  computed: {
    ...mapGetters(['favorites']),
  },
  mounted() {
    this.getPokemon();
  },
  methods: {
    searchPokemon (text) {
      console.log('text', text);
      this.setText = text.toLowerCase();
      let setText = `/${this.setText}`;
      this.getPokemon(setText);
    },
    getFavoritesList() {
      this.$refs.searchRef.inputClear();
      this.isActiveFavoritesList=true;
      this.isPokemonItemActives= false;
    },
    getPokemonList() {
      this.getFavorites();
      this.$refs.searchRef.inputClear();
      this.isActiveFavoritesList=false;
      this.isPokemonItemActives= false;
    },
    getPokemon(param='') {
      let params = {};
      if(!param){
        params = {
          offset: this.offset,
          limit: this.limit
        }
      }
      this.isLoading = true;
      axios.get(`${this.urlApi}pokemon${param}`, {params}).then(({data})=>{
        if(!param){
          this.offset = this.offset + this.quantity;
          this.setFavorite(data.results);
          this.count = data.count;
        }else{
          this.setFavorite(data.forms, param);
        }
        this.isLoading = false;
      })
    },
    getFavorites(param) {
      const indexOfPokemonList = this.pokemonList.findIndex(item =>item.name === this.$store.state.nameNotFavorite)
      if(indexOfPokemonList>=0){
        this.pokemonList[indexOfPokemonList].isFavorite=false;
      }
      if(param){
        const indexFavorite = this.$store.state.favorites.findIndex(item => item.name === this.setText);
        if(indexFavorite>=0){
          this.pokemonItem[this.pokemonItem.length-1].isFavorite = true;
        }
        return
      }
      if(this.$store.state.favorites.length>0 && this.pokemonItem.length>0){
        const indexFavorite = this.$store.state.favorites.findIndex(item => item.name === this.setText);
        if(indexFavorite>=0){
          const index = this.pokemonList.findIndex(item => item.name === this.$store.state.favorites[indexFavorite].name);
          if(index>=0){
            this.pokemonList[index].isFavorite = true;
            this.pokemonItem = [];
          }
        }
      }
    },
    setFavorite(pokemons, param) {
      [].forEach.call(pokemons, elem =>{
        if(!param){
          this.pokemonList.push({
            name: elem.name,
            url: elem.url,
            isFavorite: false,
            pokeminItem: false,
          });
          this.getFavorites();
          return
        }
        this.pokemonItem.push({
          name: elem.name,
          url: elem.url,
          isFavorite: false,
          pokeminItem: true,
        });
        this.getFavorites(param);
        this.isPokemonItemActives= true;
      });
    },
    loadMorePokemons(e) {
      let listElm = e.target;
      if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.getMorePokemons();
      }
    },
    getMorePokemons() {
      this.isLoading = true;
      if(this.count === this.pokemonList.length){
        this.isLoading = false;
        return
      }
      setTimeout( ()=>{
        this.getPokemon();
      }, 1000)
    }
  },
};
</script>
<style lang="scss">
@import './../styles/variables.scss';
.content{
  footer{
    text-align: center;
    background: white;
    height: 80px;
    padding: 18px 0;
    box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
  }
}
.list_pokemon{
  max-width: 570px;
  margin:0 auto;
  .search_content{
    margin:35px 0 40px 0;
  }
}
ul{
  height: calc(100vh - 205px);
  overflow: auto;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity .7s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.content_footer{
  max-width: 315px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
@media (min-width: 576px) {
  .content_footer{
    max-width: 570px;
  }
}
</style>