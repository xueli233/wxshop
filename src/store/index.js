import Vue from 'vue';
import Vuex from 'vuex';
import NavTabs from './modules/navTab.js'; // 引入标签
import Plateform from './modules/plateform.js'; // 引入结构树
import Store from './modules/store.js'
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        navTabs: NavTabs,
        plateform: Plateform,
        store: Store
    }
});