import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SigninView from '../views/SigninView.vue'
import SettingsView from '../views/SettingsView.vue'
import ChessView from '../views/ChessView.vue'
import TicTacToeView from '../views/TicTacToeView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SigninView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/chess',
    name: 'chess',
    component: ChessView
  },
  {
    path: '/tictactoe',
    name: 'tictactoe',
    component: TicTacToeView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
