const state = {
    storeTree: [],
    storePlateformTree:[],
};

const mutations = {
    /**
     * 设置结构树
     * @param {*} state 
     * @param {*} tree 
     */
    setStoreTree(state, tree) {
        state.storeTree = tree;
    },
    /**
     * 设置结构树
     * @param {*} state 
     * @param {*} tree 
     */
    setStorePlateformTree(state, tree) {
        state.storePlateformTree = tree;
    },
};


export default {
    namespaced: true,
    state,
    mutations
};