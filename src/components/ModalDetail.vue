<template lang="pug">
.modal_overlay
  .modal_content
    .scene
      img(:src="imgPokemon")
    .detail
      .row_item
        span
          b Name:
          |  {{ dataPokemon.name }}
      .row_item
        span
          b Weight:
          |  {{ dataPokemon.weight }}
      .row_item
        span
          b Height:
          |  {{ dataPokemon.height }}
      .row_item
        span
          b Types:
          |  {{ getTypes(dataPokemon.types) }}
      .row_item.row_item_footer
        button-pokemon(:text="'Share to my friends'")
        star-favorite(:isFavorite="false")
    i.pk-icon-close(@click="closeModal")
</template>
<script>
import axios from 'axios';
import StarFavorite from "./StarFavorite";
import ButtonPokemon from "@/components/ButtonPokemon";
export default {
  name: 'ModalDetail',
  components:{
    StarFavorite,
    ButtonPokemon
  },
  data() {
    return {
      imgPokemon: '',
      urlApi: process.env.VUE_APP_BASE_URL_API,
      dataPokemon: {},
    }
  },
  mounted() {
    this.getDetailPokemon();
  },
  methods: {
    getDetailPokemon() {
      axios.get(`${this.urlApi}pokemon/charizard`).then(({data})=>{
        console.log('data', data);
        //-this.imgPokemon = data.sprites.front_shiny;
        this.dataPokemon= data;
        this.imgPokemon = data.sprites.other['official-artwork'].front_default;
      })
    },
    getTypes(types=[]) {
      let items = [];
      types.forEach((item)=>{
        items.push(item.type.name);
      })
      return items.toString();
    },
    closeModal() {

    }
  },
}
</script>
<style lang="scss">
.modal_overlay{
  position: fixed;
  top:0;
  left: 0;
  background: rgba(0,0,0, .7);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal_content{
    border-radius: 5px;
    overflow: hidden;
    background: white;
    padding-bottom: 20px;
    position: relative;
  }
}
.scene{
  background: url(./../assets/imgs/paisaje.jpg);
  background-size: cover;
  background-position: center center;
  width: 570px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    height: 180px;
  }
}
.detail{
  padding: 20px 30px;
  .row_item{
    height: 47px;
    border-bottom: 1px solid #E8E8E8;
    box-sizing: border-box;
    text-align: left;
    padding-top: 10px;
    line-height: 1.5;
    span{
      font-size: 18px;
      text-transform: capitalize;
    }
    &_footer{
      border-bottom: 0;
      display: flex;
      padding-top: 20px;
      justify-content: space-between;
    }
  }
}
.pk-icon-close{
  position: absolute;
  right: 15px;
  top: 15px;
  color: white;
  font-size: 26px;
  &:hover{
    opacity: .8;
    cursor: pointer;
  }
}
</style>