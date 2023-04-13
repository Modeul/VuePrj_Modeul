import {createStore} from "vuex";
import mutations from "./mutations";

const store  = createStore({
    state:{
        loadingStatus: false,
    },
    mutations
})

export default store;
