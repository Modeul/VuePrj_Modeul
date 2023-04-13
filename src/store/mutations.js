import * as types from './mutation_types';

export default{
    [types.LOADING_STATUS](state, loadingstatus){
        state.loadingstatus = loadingstatus
    }
}