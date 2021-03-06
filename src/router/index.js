import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SigninView from '../views/SigninView.vue'
import ChessView from '../views/ChessView.vue'
import TicTacToeView from '../views/TicTacToeView'
import CheckersView from '../views/CheckersView.vue'
import UserSettings from '../views/UserSettingsView.vue'
import ConnectFourView from '../views/ConnectFourView.vue'
import RegisterView from '../views/RegisterView.vue'

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
    path: '/register',
    name: 'register',
    component: RegisterView
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
  {
    path: '/checkers',
    name: 'checkers',
    component: CheckersView
  },
  {
    path: '/connect4',
    name: 'connect4',
    component: ConnectFourView
  },
  {
    path: '/usersettings',
    name: 'usersettings',
    component: UserSettings
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
