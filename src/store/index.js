import Vuex from 'vuex';
import Vue from 'vue';
import NavTabs from './modules/navTab.js'; // 引入标签
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        navTabs: NavTabs,
    }
});