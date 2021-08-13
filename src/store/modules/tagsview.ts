import { RouteLocationNormalized } from 'vue-router'
import { MutationTree, ActionContext } from 'vuex'
// state
export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}
interface TagsViewState {
  visitedViews: TagView[]
  cachedViews: (string | undefined)[]
}
const state: TagsViewState = {
  visitedViews: [], // tags列表
  cachedViews: [], // <keep-alive> 缓存列表
}

enum TagsMutationTypes {
  ADD_VISITED_VIEW = 'ADD_VISITED_VIEW',
  ADD_CACHED_VIEW = 'ADD_CACHED_VIEW',
  DEL_VISITED_VIEW = 'DEL_VISITED_VIEW',
  DEL_CACHED_VIEW = 'DEL_CACHED_VIEW',
  DEL_OTHERS_VISITED_VIEWS = 'DEL_OTHERS_VISITED_VIEWS',
  DEL_OTHERS_CACHED_VIEWS = 'DEL_OTHERS_CACHED_VIEWS',
  DEL_ALL_VISITED_VIEWS = 'DEL_ALL_VISITED_VIEWS',
  DEL_ALL_CACHED_VIEWS = 'DEL_ALL_CACHED_VIEWS',
  UPDATE_VISITED_VIEW = 'UPDATE_VISITED_VIEW',
}
type Mutations<S = TagsViewState> = {
  [TagsMutationTypes.ADD_VISITED_VIEW](state: S, view: TagView): void
  [TagsMutationTypes.ADD_CACHED_VIEW](state: S, view: TagView): void
  [TagsMutationTypes.DEL_VISITED_VIEW](state: S, view: TagView): void
  [TagsMutationTypes.DEL_CACHED_VIEW](state: S, view: TagView): void
  [TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS](state: S, view: TagView): void
  [TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS](state: S, view: TagView): void
  [TagsMutationTypes.DEL_ALL_VISITED_VIEWS](state: S): void
  [TagsMutationTypes.DEL_ALL_CACHED_VIEWS](state: S): void
  [TagsMutationTypes.UPDATE_VISITED_VIEW](state: S, view: TagView): void
}
const mutations: MutationTree<TagsViewState> & Mutations = {
  [TagsMutationTypes.ADD_VISITED_VIEW](state: TagsViewState, view: TagView) {
    if (state.visitedViews.some((v) => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta?.title || 'no-name',
      })
    )
  },
  [TagsMutationTypes.ADD_CACHED_VIEW](state: TagsViewState, view: TagView) {
    if (view.name === null) return
    if (state.cachedViews.includes(view.name?.toString())) return
    if (!view.meta?.noCache) {
      state.cachedViews.push(view.name?.toString())
    }
  },
  [TagsMutationTypes.DEL_VISITED_VIEW](state: TagsViewState, view: TagView) {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  [TagsMutationTypes.DEL_CACHED_VIEW](state: TagsViewState, view: TagView) {
    if (view.name === null) return
    const index = state.cachedViews.indexOf(view.name?.toString())
    index > -1 && state.cachedViews.splice(index, 1)
  },
  [TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS](
    state: TagsViewState,
    view: TagView
  ) {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta?.affix || v.path === view.path
    })
  },
  [TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS](
    state: TagsViewState,
    view: TagView
  ) {
    if (view.name === null) return
    const index = state.cachedViews.indexOf(view.name?.toString())
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  [TagsMutationTypes.DEL_ALL_VISITED_VIEWS](state: TagsViewState) {
    // keep affix tags
    const affixTags = state.visitedViews.filter((tag) => tag.meta?.affix)
    state.visitedViews = affixTags
  },
  [TagsMutationTypes.DEL_ALL_CACHED_VIEWS](state: TagsViewState) {
    state.cachedViews = []
  },
  [TagsMutationTypes.UPDATE_VISITED_VIEW](state: TagsViewState, view: TagView) {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
}

const actions = {
  addView(context: ActionContext<TagsViewState, any>, view: TagView) {
    context.commit(TagsMutationTypes.ADD_VISITED_VIEW, view)
    context.commit(TagsMutationTypes.ADD_CACHED_VIEW, view)
  },
  addVisitedView(context: ActionContext<TagsViewState, any>, view: TagView) {
    context.commit(TagsMutationTypes.ADD_VISITED_VIEW, view)
  },
  // 关闭
  delView(context: ActionContext<TagsViewState, any>, view: TagView) {
    context.commit(TagsMutationTypes.DEL_VISITED_VIEW, view)
    context.commit(TagsMutationTypes.DEL_CACHED_VIEW, view)
  },
  // 关闭其它
  delOtherView(context: ActionContext<TagsViewState, any>, view: TagView) {
    context.commit(TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS, view)
    context.commit(TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS, view)
  },
  delCachedView(context: ActionContext<TagsViewState, any>, view: TagView) {
    context.commit(TagsMutationTypes.DEL_CACHED_VIEW, view)
  },
  otherViews(context: ActionContext<TagsViewState, any>, view: TagView) {
    context.commit(TagsMutationTypes.DEL_OTHERS_VISITED_VIEWS, view)
    context.commit(TagsMutationTypes.DEL_OTHERS_CACHED_VIEWS, view)
  },
  // 关闭所有
  delAllViews(context: ActionContext<TagsViewState, any>) {
    context.commit(TagsMutationTypes.DEL_ALL_VISITED_VIEWS)
    context.commit(TagsMutationTypes.DEL_ALL_CACHED_VIEWS)
  },
  delAllCachedViews(context: ActionContext<TagsViewState, any>) {
    context.commit(TagsMutationTypes.DEL_ALL_CACHED_VIEWS)
  },
  updateVisitedView(context: ActionContext<TagsViewState, any>, view: TagView) {
    context.commit(TagsMutationTypes.UPDATE_VISITED_VIEW, view)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
