import configStore from 'store'
import { TOKEN_KEY } from '../constants/auth'
import storage from './storage'

const store = configStore()
const state = store.getState()

export function getTokenFromStorage() {
  return storage.get(TOKEN_KEY)
}

export function getAuthenticatedUser() {
  return state.user
}
