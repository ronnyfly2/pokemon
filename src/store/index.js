import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: [],
    pageTransition: {
      name: "router-view",
      mode: "in-out"
    },
    nameNotFavorite: '',
  },
  getters: {
    favorites: state => state.favorites,
    nameNotFavorite: state => state.nameNotFavorite
  },
  mutations: {
    setPageTransition(state, value) {
      if ("default" === value) {
        Vue.set(state, "pageTransition", {
          name: "router-view",
          mode: "in-out"
        });
      }
    },
    SET_FAVORITES: (state, payload) => state.favorites.push(payload),
    SET_NAME_NOT_FAVORITE: ( state, payload ) => state.nameNotFavorite = payload,
  },
  actions: {
    addFavoritePokemon({ commit, state }, payload) {
      payload.isFavorite = false;
      const index = state.favorites.findIndex(item => item.name === payload.name);
      if(index>=0){
        commit('SET_NAME_NOT_FAVORITE', state.favorites[index].name);
        state.favorites.splice(index, 1);
        return
      }
      payload.isFavorite = true;
      commit('SET_FAVORITES', payload);
    },
    removeNameNotFavorite({ commit }, payload) {
      commit('SET_NAME_NOT_FAVORITE', payload);
    }
  }
});
