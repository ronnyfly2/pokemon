<template lang="pug">
.content
  .list_pokemon
    transition(name="fade")
      loader(v-show="isLoading")
    search-input.search_content(ref="searchRef" @keyUpEnterSearch="searchPokemon")
    ul(v-if="!isActiveFavoritesList && !isPokemonItemActives && !isEmpty" @scroll="loadMorePokemons")
      ItemPokemonList(:pokemonName="pokemon.name" v-for="(pokemon, key) in pokemonList" :key="key" @openModalDetail="viewDetail")
        star-favorite(:isFavorite="pokemon.isFavorite" :pokemon="pokemon")
    ul(v-else-if="!isActiveFavoritesList && isPokemonItemActives && !isEmpty")
      ItemPokemonList(:pokemonName="pokemonItem[pokemonItem.length -1].name")
        star-favorite(:isFavorite="pokemonItem[pokemonItem.length -1].isFavorite" :pokemon="pokemonItem[pokemonItem.length -1]")
    .empty_data(v-else-if="isEmpty")
      h1 Uh-oh!
      p You look lost on your journey!
      button-pokemon(:text="'Go back home'" :onClickEvent="getPokemonList")
    ul(v-else)
      ItemPokemonList(:pokemonName="pokemon.name" v-for="(pokemon, key) in favorites" :key="key")
        star-favorite(:isFavorite="pokemon.isFavorite" :pokemon="pokemon")
  footer(v-if="!isEmpty")
    .content_footer
      button-pokemon(:text="'All'" :iconName="'pk-icon-list'" :onClickEvent="getPokemonList")
      button-pokemon(:text="'Favorites'" :iconName="'pk-icon-star'" :isDisabled="favorites.length>0?false:true" :onClickEvent="getFavoritesList")
  ModalDetail(v-if="showModalDetail" :pokemonDetail="pokemonItem[pokemonItem.length -1]" @closeModal="closeModalDetail")
</template>

<script>
import axios from 'axios';
import Loader from "@/components/Loader";
import SearchInput from "@/components/SearchInput";
import ItemPokemonList from "@/components/ItemPokemonList";
import ButtonPokemon from "@/components/ButtonPokemon";
import ModalDetail from "@/components/ModalDetail";
import StarFavorite from "@/components/StarFavorite";
import { mapGetters, mapActions } from 'vuex';

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
      isEmpty: false,
      showModalDetail: false,
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
    ...mapActions(['removeNameNotFavorite']),
    viewDetail(namePokemon) {
      this.setText = namePokemon.toLowerCase();
      let name = `/${this.setText}`;
      this.getPokemon(name, 'modal')
    },
    closeModalDetail() {
      this.getPokemonList();
      this.showModalDetail = false;
    },
    searchPokemon (text) {
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
      this.isEmpty = false;
    },
    getPokemon(param, modal) {
      let params = {};
      if(!param){
        params = {
          offset: this.offset,
          limit: this.limit
        }
      }
      let api = param?`${this.urlApi}pokemon${param}`:`${this.urlApi}pokemon`
      this.isLoading = true;
      axios.get(api, {params}).then(({data})=>{
        if(!param){
          this.offset = this.offset + this.quantity;
          this.setFavorite(data.results);
          this.count = data.count;
        }else{
          let modalData = data.forms;
          modalData[0].weight = data.weight;
          modalData[0].height = data.height;
          modalData[0].types = data.types;
          modalData[0].image = data.sprites.other['official-artwork'].front_default
          data = modalData;
          this.setFavorite(data, param, modal);
        }
        this.isLoading = false;
      }).catch((err)=>{
        this.isEmpty = true;
        this.isLoading = false;
      })
    },
    getFavorites(param, modal) {
      const indexOfPokemonList = this.pokemonList.findIndex(item =>item.name === this.$store.state.nameNotFavorite)
      if(indexOfPokemonList>=0){
        this.pokemonList[indexOfPokemonList].isFavorite=false;
        this.removeNameNotFavorite('')
      }
      if(param){
        const indexFavorite = this.$store.state.favorites.findIndex(item => item.name === this.setText);
        if(indexFavorite>=0){
          this.pokemonItem[this.pokemonItem.length-1].isFavorite = true;
        }
        if(modal){
          this.showModalDetail = true;
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
    setFavorite(pokemons, param, modal) {
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
          weight: elem.weight,
          height: elem.height,
          types: elem.types,
          image: elem.image,
        });
        this.getFavorites(param, modal);
        if(!modal){
          this.isPokemonItemActives= true;
        }
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
    animation: fadeIn 3s ease-in-out;
  }
}
.list_pokemon{
  max-width: 570px;
  margin:0 auto;
  .search_content{
    margin:35px 0 40px 0;
  }
  padding: 0 30px;
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
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 30px;
}
@media (min-width: 576px) {
  .content_footer{
    max-width: 570px;
  }
  .content{
    padding: 0;
  }
}
.empty_data{
  margin-top: 50px;
  h1{
    margin-bottom: 10px;
  }
  p{
    margin-bottom:25px;
  }

}
@keyframes fadeIn{
  0%{opacity: 0;}
  100%{opacity: 1;}
}
</style>