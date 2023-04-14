import { createStore } from "vuex";
import mutations from "./mutations";

const store = createStore({
	state: {
		loadingStatus: false,
		host : window.location.host
	},
	mutations
})

export default store;
