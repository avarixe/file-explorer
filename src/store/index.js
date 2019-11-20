import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import Tag from '@/models/Tag'
import FolderTag from '@/models/FolderTag'
import {
  createPersistedState,
  createSharedMutations
} from 'vuex-electron'

Vue.use(Vuex)

const database = new VuexORM.Database()

database.register(Tag)
database.register(FolderTag)

const state = {
  path: require('os').homedir(),
  mode: 'grid'
}

const mutations = {
  SET_PATH (state, path)  {
    state.path = path
  },
  SET_MODE (state, mode) {
    state.mode = mode
  }
}

const actions = {
  SET_PATH ({ commit }, path) {
    commit('SET_PATH', path)
  },
  SET_MODE ({ commit }, mode) {
    commit('SET_MODE', mode)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    VuexORM.install(database),
    createPersistedState(),
    createSharedMutations()
  ]
})
