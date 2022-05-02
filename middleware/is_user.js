export default async function({ $axios, route, store, redirect }) {
    // store.commit("end_loading")
    
    console.log(
        "MIDDLEWARE : IS_USER"
    )
    let no_login = ['/','/signUp']
    const router = window.$nuxt.$router
    console.log(route)
    
    if(!no_login.includes(route.fullPath) && !store.state.is_login){
        console.log(route.fullPath)
        alert('접근 권한이 없습니다.')
        // store.commit('logout')
        router.push('/')
        return
    }
    return
}