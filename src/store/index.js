import { createStore } from 'vuex'

const store = createStore({
    state: {

        isLoggedIn: false
    },
    mutations: {
        setLogInStatus(state, payload){
            state.isLoggedIn = payload;
        }
    },
    actions: {
        async setLoggedIn(context, {payload}){
            context.commit('setLogInStatus', payload)
        },
        async setLoggedOut(context, {payload}){
            context.commit('setLogInStatus', payload)
        }
    }})

    export default store;