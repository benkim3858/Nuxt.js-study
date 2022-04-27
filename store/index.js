export const state = () => ({
    hello : 'hello',
    is_login: false,
    user : '',
  })
  
export const mutations = {
    bye(state) {
      state.hello = 'goodbye'
    },
    login(state, res) {
        state.is_login = true
        state.user = res.name
        console.log(this.state)
    }
  }

export const actions = {
    
}

