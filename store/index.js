import { Store } from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'
import db from '~/scripts/auth'

const createStore = () => {
  return new Store({
    state: {
      room: {}
    },
    mutations: {
      ...firebaseMutations
    },
    actions: {
      bindData: firebaseAction(({ bindFirebaseRef }, roomId) => {
        return bindFirebaseRef('room', db.ref(`rooms/${roomId}`))
      }),
      unbindData: firebaseAction(({ unbindFirebaseRef }) => {
        return unbindFirebaseRef('room')
      })
    },
    getters: {
      getData: (state) => {
        return state.room
      }
    }
  })
}

export default createStore
