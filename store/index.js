/**
 * window 객체 쓸 수 있음
 * 그 안에 $nuxt->$root 있음
 */
// import createPersistedState from 'vuex-persistedstate';
// export const plugins = [createPersistedState({
//     storage: window.localStorage,
// })];

export const state = () => ({
    hello: 'hello',
    is_login: false,
    user: '',
    user_id: '',
    role: '',
    token: {
        access_token: '',
        refresh_token: '',
    },
});

export const mutations = {
    bye(state) {
        state.hello = 'goodbye';
    },
    login(state, res) {
        state.is_login = true;
        state.user = res.name;
        state.user_id = res.id;
        state.token.access_token = res.access_token;
        state.token.refresh_token = res.refresh_token;
        console.log(this.state);
    },
    set_token(state, payload) {
        console.log('SET TOKEN');
        console.log(payload);
        state.token.access_token = payload.access_token;
        state.token.refresh_token = payload.refresh_token;
        state.is_login = true;
        // state.role = payload.role;
    },
    reset_token(state) {
        console.log('RESET TOKEN');
        state.token.access_token = '';
        state.token.refresh_token = '';
        state.is_login = false;
        // state.role = '';
    },
    clear_token(state) {
        console.log('CLEAR_TOKEN');
        state.token.access_token = '';
        state.token.refresh_token = '';
        state.is_login = false;
        // state.role = '';
    },
    logout(state) {
        state.is_login = false;
        state.token.access_token = '';
        state.token.refresh_token = '';
        state.is_login = false;
        // state.role = '';
    },
};

/**
 * actions 에서 받을 수 있는 parameter
 * commit, dispatch, getters, state, rootGetters, rootState
 */
export const actions = {
    user_logout({ commit }) {
        commit('logout');
        this.$router.push('/');
    },
};
