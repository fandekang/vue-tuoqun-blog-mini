<!--
    vue模板
    @author: hjj
    @date: 2018/11/13
    @desc: 这个组件和LoadMoreCell有点像，唯一不同的就是循环的摆放位置，这里是比较合理的，LoadMoreCell之所以那样是因为slot嵌套的问题
-->
<template>
    <mt-loadmore class="sy-loadmore-panel" :auto-fill="autoFill" :top-method="topMethod" :bottom-method="bottomEvent" :bottom-all-loaded="bottomAllLoaded" ref="loadMore">
        <template v-for="(item, index) in source">
            <slot :item="item" :index="index"></slot>
        </template>
    </mt-loadmore>
</template>
<script type="text/javascript">

    import loadData from '../../../lib/loadData';

    export default {
        name: 'load-more-panel',
        data() {
            return {
                source: []
            }
        },
        mixins: [loadData],
        methods: {
            randomSort() {
                return Math.random() > 0.5 ? -1 : 1;
            },
            onBottomLoaded() {
                this.$refs.loadMore.onBottomLoaded();
            },
            onTopLoaded() {
                this.$refs.loadMore.onTopLoaded();
            }
        },
        props: {
            maxDistance: {
                type: Number,
                default: 0
            },
            autoFill: {
                type: Boolean,
                default: true
            },
            distanceIndex: {
                type: Number,
                default: 2
            },
            topPullText: {
                type: String,
                default: '下拉刷新'
            },
            topDropText: {
                type: String,
                default: '释放更新'
            },
            topLoadingText: {
                type: String,
                default: '加载中...'
            },
            topDistance: {
                type: Number,
                default: 70
            },
            topMethod: {
                type: Function
            },
            bottomPullText: {
                type: String,
                default: '上拉刷新'
            },
            bottomDropText: {
                type: String,
                default: '释放更新'
            },
            bottomLoadingText: {
                type: String,
                default: '加载中...'
            },
            bottomDistance: {
                type: Number,
                default: 70
            },
            bottomMethod: {
                type: Function
            },
            bottomAllLoaded: {
                type: Boolean,
                default: false
            },
            dataJson: {
                type: Array
            },
            dataUrl: {
                type: String
            },
            pager: {
                type: Object,
                default() {
                    return {
                        curPage: 1,
                        pageSize: 5,
                        total: 0
                    }
                }
            },
            remoteParam: {
                type: Object,
                default() {
                    return {};
                }
            }
        }
    }
</script>
<style type="text/css">

</style>
