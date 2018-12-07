import Vue from 'vue';
import Router from 'vue-router';
// import Article from '@/components/blog/article';

Vue.use(Router);

const Article = resolve => require.ensure([], () => resolve(require('@/components/blog/article')));

export default new Router({
    routes: [
        {
            path: '/article',
            name: 'Article',
            component: Article
        }
    ]
})
