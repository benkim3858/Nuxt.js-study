import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    // paths: ['test','is_login'],
  })(store)
}

// paths 설정 하면 특정한 페이지를 persistedstate 있게 만들수 있게 된다. 변수 또는 모듈(파일) 이름을 적고 사용.
// 그 후 nuxt.config.js
// SSR => mode : 'client'
// {src: '~/plugins/store_persistedstate.js', mode : 'client'},