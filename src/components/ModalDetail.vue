<template lang="pug">
.modal_overlay
  .copy_ready(v-if="shared")
    span This pokemon was shared!
  .modal_content
    .modal_content_child
      .scene
        img(:src="pokemonDetail.image")
      .detail
        .row_item
          span
            b Name:
            |  {{ pokemonDetail.name }}
        .row_item
          span
            b Weight:
            |  {{ pokemonDetail.weight }}
        .row_item
          span
            b Height:
            |  {{ pokemonDetail.height }}
        .row_item
          span
            b Types:
            |  {{ getTypes(pokemonDetail.types) }}
        .row_item.row_item_footer
          button-pokemon(:text="'Share to my friends'" :onClickEvent="shareThis")
          star-favorite(:isFavorite="pokemonDetail.isFavorite" :pokemon="pokemonDetail")
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
  props: {
    pokemonDetail: {
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      imgPokemon: '',
      dataPokemon: {},
      shared: false,
    }
  },
  methods: {
    getTypes(types=[]) {
      let items = [];
      types.forEach((item)=>{
        items.push(item.type.name);
      })
      return items.toString();
    },
    closeModal() {
      this.$emit('closeModal');
    },
    shareThis() {
      let text = Object.values(this.pokemonDetail);
      let types = text.splice(6, 1);
      let typesFormar = this.getTypes(types[0]);
      text.push(typesFormar)
      const elem = document.createElement('textarea');
      elem.value = text;
      document.body.appendChild(elem);
      elem.select();
      document.execCommand('copy');
      document.body.removeChild(elem);
      this.shared = true;
      setTimeout(()=>{
        this.shared = false;
      }, 3500)
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
    width: 100%;
    padding: 0 30px;
  }
  .modal_content_child{
    border-radius: 5px;
    overflow: hidden;
    max-width: 570px;
    background: white;
    padding-bottom: 20px;
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
}
.scene{
  background: #7fad71 url(./../assets/imgs/paisaje.jpg) no-repeat;
  background-size: cover;
  background-position: center -15px;
  max-width: 570px;
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
.copy_ready{
  width: 200px;
  height: 44px;
  background: black;
  color: white;
  position: absolute;
  text-align: center;
  bottom: 30px;
  right: 30px;
  padding-top: 13px;
  box-sizing: border-box;
  border-radius: 8px;
  opacity: 0;
  animation: fadeIn 3.5s ease-in-out;
}
@keyframes fadeIn {
  0%{opacity: 0;}
  50%{opacity: 1;}
  100%{opacity: 0;}
}
</style>