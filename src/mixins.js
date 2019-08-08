import store from '@/store'

export const mixins = { 
  created () {
    store.commit('setMessage', this.localMessage)
    store.commit('setSubtitle', this.localSubtitle)
	},
	computed: {
		message () {
      return store.state.message
		},
		subtitle () {
      return store.state.subtitle
		},
		screen () {
			return store.state.screen
		},
		scoremode () {
			return store.state.scoremode
		}
	}
}
