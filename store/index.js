/**
 * window 객체 쓸 수 있음
 * 그 안에 $nuxt->$root 있음
 */
// import createPersistedState from 'vuex-persistedstate';
// export const plugins = [createPersistedState({
//     storage: window.localStorage,
// })];

export const state = () => ({
    hello : 'hello',
    is_login: false,
    user : '',
    user_id : '',
  })
  
export const mutations = {
    bye(state) {
      state.hello = 'goodbye';
    },
    login(state, res) {
        state.is_login = true;
        state.user = res.name;
        state.user_id = res.id;
        console.log(this.state);
    },
    logout(state) {
        state.is_login = false;
    }
  }
  
/**
 * actions 에서 받을 수 있는 parameter
 * commit, dispatch, getters, state, rootGetters, rootState
 */
export const actions = {
    user_logout({commit}) {
        commit('logout');
        this.$router.push('/');
    }
}

