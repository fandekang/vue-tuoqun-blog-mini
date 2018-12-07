<!--
    vue模板
    @author: hjj
    @date: 2018/11/7
    @desc: cell列表加上下刷新，
           由于一下原因这个组件封装的并不是很完美，待后续有更好的解决办法解决吧：
           1. vue中slot和v-for有冲突
           2. 作用域插槽无法进行传递嵌套
-->
<template>
    <mt-loadmore class="sy-loadmore-cell" :auto-fill="autoFill" :top-method="topEvent" :bottom-method="bottomEvent" :bottom-all-loaded="bottomAllLoaded" ref="loadMore">
        <slot :source="source"></slot>
    </mt-loadmore>
</template>
<script type="text/javascript">

    import loadData from '../../../lib/loadData';

    export default {
        name: 'load-more-cell',
        data() {
            return {
                source: [],
                step: this.pager.pageSize
            }
        },
        mixins: [loadData],
        methods: {
            topEvent() {
                if (this.dataJson) {
                    this.dataJson.sort(this.randomSort);
                }
                else {
                    this.remoteParam.order = "dbms_random.value";
                }
                this.loadData(true);
                this.topMethod && this.topMethod();
            },
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
    .sy-loadmore-cell .mint-cell-wrapper {
        flex-direction: column;
        align-items: flex-start;
        padding-top: 10px;
        padding-bottom: 10px;
        background-origin: border-box;
        line-height: normal;
    }
    .sy-loadmore-cell .mint-cell-wrapper .mint-cell-title {
        width: 100%;
    }
    .sy-loadmore-cell .mint-cell-wrapper .mint-cell-title img {
        float: left;
        margin-right: 15px;
    }
    .sy-loadmore-cell .mint-cell-wrapper .mint-cell-title .mint-cell-text {
        vertical-align: top;
        font-size: 1.6rem;
    }
    .sy-loadmore-cell .mint-cell-value {
        align-self: flex-end;
        font-size: 1.1rem;
    }
    .sy-loadmore-cell .mt-footer-center {
        align-self: center;
    }
    .sy-loadmore-cell .mt-footer-right {
        align-self: flex-end;
    }
</style>
