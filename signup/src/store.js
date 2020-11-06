import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
    }
  },
  actions: {
    setLogoutTimer ({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
        router.replace('/signin')
      }, expirationTime * 1000)
    },
    signup ({commit, dispatch}, authData) {
      axios.post('/accounts:signUp?key=AIzaSyB4ocqsRVD5Enqha4z1NHLstgDKqtzoJ4Q', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          //console.log('from sign up:', res)
          // auth
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          // auto login
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          // save user data in firebase
          dispatch('storeUser', authData)
          // save user data in "store.state"
          //console.log('from sign up commit sotreUser')
          commit('storeUser', res.data)
          // auto logout
          dispatch('setLogoutTimer', res.data.expiresIn)
          // go to dashboard
          router.push('/dashboard')
        })
        .catch(error => console.log(error))
    },
    login ({commit, dispatch}, authData) {
      axios.post('/accounts:signInWithPassword?key=AIzaSyB4ocqsRVD5Enqha4z1NHLstgDKqtzoJ4Q', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          //console.log('from login', res)
          // auto login
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          // auth
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          // save user data in "store.state"
          //console.log('commit sotreUser')
          commit('storeUser', res.data)
          // auto logout
          dispatch('setLogoutTimer', res.data.expiresIn)
          // go to dashboard
          router.push('/dashboard')
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({commit}){
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser',{
        token: token,
        userId: userId
      })
    },
    logout ({commit}){
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
      router.replace('/signin')
    },
    storeUser ({commit, state}, userData) {
      if (!state.idToken) {
        return
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => {
          //console.log(res)
        })
        .catch(error => console.log(error))
    },
    fetchUser ({commit, state}) {
      if (!state.idToken) {
        return
      }
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
      .then(res => {
        //console.log('from get request', res);
        const data = res.data;
        const users = [];
        for (let key in data){
          const user = data[key];
          // keep key value return from firebase in users array
          user.id = key;
          users.push(user);
        }
        //console.log('from fetchUser', users);
        // It does not upload user data again, only update state in vuex instead.
        // commit('storeUser', users[0])
      })
      .catch(error => console.log(error))
    },
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
})