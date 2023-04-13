import {createStore} from "vuex";
import mutations from "./mutations";

const store  = createStore({
    state:{
        loadingstatus: false,
    },
    mutations
})

export default store;
