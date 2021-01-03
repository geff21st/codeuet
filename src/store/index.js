import Vue from 'vue'
import Vuex from 'vuex'
import { shuffleArray } from '@/lib/shuffle'
import {
  GAME_DATA_STORE_KEY,
  USER_ROLE_LEFT,
  USER_ROLE_RIGHT
} from '@/data/constants'
import { WordsService } from '@/lib/wordsService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userRole: USER_ROLE_LEFT,
    gameState: false,

    width: 5,
    height: 5,
    agentsTotalCont: 15,
    agentsCommonCont: 3,
    agentsPerPlayer: 9,
    killersPerPlayer: 3,

    dictionary: [],
    words: []
  },
  getters: {
    wordsCount (state) {
      return state.width * state.height
    }
  },
  mutations: {
    setWords: (state, value) => (state.words = value),
    setUserRole: (state, value) => (state.userRole = value),
    setDictionary: (state, value) => (state.dictionary = value),
    setGameState: (state, value) => (state.gameState = !!value),

    setGameKeys (
      state,
      {
        agentsTotal,
        agentsLeft,
        agentsRight,
        killersLeft,
        killersRight
      }
    ) {
      agentsTotal.forEach(index => (state.words[index].agent = true))

      agentsLeft.forEach(index => {
        if (state.userRole === USER_ROLE_LEFT) {
          state.words[index].agentCurrent = true
        }

        state.words[index].agentLeft = true
      })

      agentsRight.forEach(index => {
        if (state.userRole === USER_ROLE_RIGHT) {
          state.words[index].agentCurrent = true
        }

        state.words[index].agentRight = true
      })

      killersLeft.forEach(index => {
        if (state.userRole === USER_ROLE_LEFT) {
          state.words[index].killerCurrent = true
        }

        state.words[index].killerLeft = true
      })

      killersRight.forEach(index => {
        if (state.userRole === USER_ROLE_RIGHT) {
          state.words[index].killerCurrent = true
        }

        state.words[index].killerRight = true
      })
    }
  },
  actions: {
    initializeDefaultWords ({
      commit,
      dispatch
    }) {
      import(/* webpackChunkName: "dictionary" */ '@/data/dictionary').then(
        result => {
          if (typeof result.default.words === 'function') {
            commit('setGameState', true)
            commit('setDictionary', result.default.words())
            dispatch('initializeWordsList')
            dispatch('initializeGameKeys')
            dispatch('storeGameData')
          }
        }
      )
    },

    initializeGame ({
      state,
      dispatch
    }) {
      if (state.gameState === true) return
      dispatch('restoreGameData')

      if (state.gameState === true) return
      dispatch('initializeDefaultWords')
    },

    initializeWordsList ({
      state,
      getters,
      commit
    }) {
      shuffleArray(state.dictionary)

      // noinspection ES6ShorthandObjectProperty
      commit(
        'setWords',
        state.dictionary
          .slice(0, getters.wordsCount)
          .map(word => ({ text: word }))
      )
    },

    initializeGameKeys ({
      state,
      commit
    }) {
      const indexes = WordsService.generateIndexes(state)
      shuffleArray(indexes)

      const agentsTotal = indexes.slice(0, state.agentsTotalCont)

      const agentsLeft = agentsTotal.slice(0, state.agentsPerPlayer)
      const agentsRight = agentsTotal.slice(
        state.agentsPerPlayer - state.agentsCommonCont
      )

      const spaceLeft = indexes.filter(x => !agentsLeft.includes(x))
      shuffleArray(spaceLeft)
      const killersLeft = spaceLeft.slice(0, state.killersPerPlayer)

      const spaceRight = indexes.filter(x => !agentsRight.includes(x))
      shuffleArray(spaceRight)
      const killersRight = spaceRight.slice(0, state.killersPerPlayer)

      const payloadData = {
        agentsTotal,
        agentsLeft,
        agentsRight,
        killersLeft,
        killersRight
      }

      commit('setGameKeys', payloadData)
    },

    endCurrentGame ({ commit }) {
      localStorage.setItem(GAME_DATA_STORE_KEY, JSON.stringify([]))
      commit('setWords', [])
      commit('setGameState', false)
    },

    storeGameData ({ state }) {
      localStorage.setItem(
        GAME_DATA_STORE_KEY,
        JSON.stringify(state.gameState === true ? state.words : [])
      )
    },
    restoreGameData ({ commit }) {
      const storeData = localStorage.getItem(GAME_DATA_STORE_KEY)
      const words = storeData ? JSON.parse(storeData) : []

      if (words && words.length) {
        commit('setWords', words)
        commit('setGameState', true)
      }
    }
  },
  modules: {}
})
