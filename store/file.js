export const state = () => ({
    file: null,

})

export const mutations = {
    upload(state, res) {
        state.file = res;
    }
}

export const actions = {
    append_file(state, payload) {
        state.commit('upload', payload);
    }
}