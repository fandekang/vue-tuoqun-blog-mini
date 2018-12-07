<!--
    vue模板
    @author: hjj
    @date: 2018/11/6
    @desc: 博客列表
-->
<template>
    <load-more-cell :remoteParam="{artType: query ? query : null}" :pager="pager" :dataUrl="dataUrl" :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded.sync="allLoaded" ref="loadMore">
        <template slot-scope="scope">
            <div @click="cellClick(item, index)" v-for="(item, index) in scope.source" :key="item.articleid">
                <mt-cell :to="{path: '/article',query: {id: item.articleid}}" isLink :title="item.title">
                    <img v-if="item.cover" slot="icon" :src="item.cover" height="60px" width="80px">
                    <img v-else slot="icon" src="../../assets/images/noImg.png" height="60px" width="80px">
                    <div class="mt-footer-center">
                        {{item.author}}&nbsp;&nbsp;&nbsp;
                        {{item.arttype}}&nbsp;&nbsp;&nbsp;
                        <i class="fa fa-commenting-o">&nbsp;{{item.commentcount}}&nbsp;</i>
                        <i class="fa fa-eye">&nbsp;{{item.readcount}}&nbsp;</i>
                    </div>
                </mt-cell>
            </div>
        </template>
    </load-more-cell>
</template>
<script type="text/javascript">
    export default {
        name: 'blog-list',
        data() {
            return {
                dataUrl: process.env.ROOT_API + "article/getBlogListByType.do",
                root: process.env.ROOT_API,
                allLoaded: false,
                pager: {
                    curPage: 1,
                    pageSize: 5
                },
                currentIndex: -1
            }
        },
        props: {
            query: {}
        },
        watch: {
            comments(newVal) {
                if (this.currentIndex !== -1) {
                    this.$refs.loadMore.source[this.currentIndex].commentcount = newVal;
                }
            }
        },
        computed: {
            comments() {
                return this.$store.state.ModuleArticle.comments;
            }
        },
        methods: {
            loadTop() {
                this.$refs.loadMore.onTopLoaded();
            },
            loadBottom() {
                this.$refs.loadMore.onBottomLoaded();
            },
            cellClick(cell, index) {
                this.currentIndex = index;
                this.$store.commit("togglePopup", {articlePopup: true, title: '阅读文章', commentFooter: true});
                this.$store.commit("optArticle", {comments: cell.commentcount});
                cell.readcount = cell.readcount + 1;
            }
        }
    }
</script>
