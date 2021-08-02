<template lang="pug">
.search
  input(type="text" :value="searchModel" @input="inputFunction" @keyup.enter="onClickSearch" placeholder="Search")
  i.pk-icon-search
</template>
<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      searchText:''
    }
  },
  computed: {
    searchModel() {
      return this.searchText;
    }
  },
  methods: {
    onClickSearch() {
      if(this.searchModel){
        this.$emit('keyUpEnterSearch', this.searchModel);
      }
    },
    inputFunction(e) {
      this.searchText = e.target.value;
    },
    inputClear() {
      this.searchText = '';
    }
  }
}
</script>
<style lang="scss">
@import './../styles/variables.scss';
.search{
  position: relative;
  max-width: 570px;
  input{
    background: #FFFFFF;
    width: 100%;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
    border-radius: 5px;
    box-sizing: border-box;
    border: 0;
    height: 50px;
    padding-left: 43px;
    &:focus{
      outline: none;
    }
    &::placeholder{
      color: $color_gray_2;
      font-weight: 500;
    }
    // &[type="search"]::-webkit-search-cancel-button{
    //   -webkit-appearance: none;
    //   margin-right: 12px;
    //   border-radius: 50%;
    //   width: 30px;
    //   height: 30px;
    //   background: #f5f5f5;
    //   color: gray;
    //   position: relative;
    //   &::after{
    //     content: 'x';
    //     color: red;
    //     font-size: 14px;
    //     display: block;
    //   }
    // }
  }
  i{
    color:#BFBFBF;
    position: absolute;
    left:15px;
    top:16px

  }
}
</style>