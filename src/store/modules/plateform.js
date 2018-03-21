const state = {
    plateformTree: []
};

const mutations = {
    /**
     * 保存全局结构树
     * @param {*} state 
     * @param {*} tree 
     */
    setPlateformTree(state, tree) {
        state.plateformTree = tree;
    },
};


export default {
    namespaced: true,
    state,
    mutations
};
