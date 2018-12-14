// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import MintUIWrapper from './MintUI-Framework'
import VueEmoji from 'angus-vue-emoji'
import App from './App'

import router from './router'
import loadData from './assets/js/loadData'
import ModulePopup from './assets/js/ModulePopup'
import ModuleHead from './assets/js/ModuleHead'
import ModuleArticle from './assets/js/ModuleArticle'
import ModuleComment from './assets/js/ModuleComment'
import ModuleLevel3Comment from './assets/js/ModuleLevel3Comment'

import 'font-awesome/css/font-awesome.css'

Vue.use(Vuex);
Vue.use(MintUI);
Vue.use(MintUIWrapper);
Vue.use(VueEmoji);
Vue.config.productionTip = false;

const
    store = new Vuex.Store({
        modules: {
            ModulePopup,
            ModuleHead,
            ModuleArticle,
            ModuleComment,
            ModuleLevel3Comment
        }
    }),
    vm = new Vue({
        el: '#app',
        store,
        router,
        mixins: [loadData],
        components: {App},
        template: '<App/>'
    }),
    whitePageList = ["/article", "/"];

router.beforeEach((to, from, next) => {
    let allow = false;

    for (let i = 0, len = whitePageList ? whitePageList.length : 0; i < len; i++) {
        let whitePage = whitePageList[i];
        if(whitePage === to.path) {
            allow = true;
            break;
        }
    }

    if(allow) {
        next();
    }
    else {
        vm.sendGet({
            url : process.env.ROOT_API + "main/checkLogin.do",
            success() {
                next();
            },
            reject(response) {
                if (response.status === 604) {
                    vm.$message.error("您还未登陆或者已经登陆超时");
                    store.commit("toggleLoginDialog", {visible: true});
                    next({path: from.path, query: from.query});
                }
                else {
                    vm.$message.error("跳转失败，调取远程数据出错，状态：" + response.status);
                    next({path: from.path, query: from.query});
                }
            }
        });
    }
})
