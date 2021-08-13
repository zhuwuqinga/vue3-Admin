import { MutationTree, ActionTree, ActionContext } from 'vuex'
// state
interface AppState {
  sidebar: {
    opened: boolean
  }
}
const state:AppState = {
  sidebar: {
    opened: true
  }
}

enum AppMutationTypes {
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR' // 控制侧边栏显示隐藏
}
type Mutations<S = AppState> = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: S): void

}
const mutations: MutationTree<AppState> & Mutations = {
  [AppMutationTypes.TOGGLE_SIDEBAR](state: AppState) {
    state.sidebar.opened = !state.sidebar.opened
  },
}

const actions = {
  toggleSideBar(context: ActionContext<AppState, any>) {
    context.commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}