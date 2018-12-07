<!--
    vue模板
    @author: hjj
    @date: 2018/11/6
    @desc: 主面板
-->
<template>
    <div class="main">
        <mt-navbar v-model="active">
            <mt-tab-item :id="'blogList1'">科技技术</mt-tab-item>
            <mt-tab-item :id="'blogList2'">社会百态</mt-tab-item>
            <mt-tab-item :id="'blogList3'">公司建设</mt-tab-item>
            <mt-tab-item :id="'blogList4'">国际政要</mt-tab-item>
        </mt-navbar>
        <mt-tab-container :swipeable="true" v-model="active">
            <mt-tab-container-item id="blogList">
                <blog-list></blog-list>
            </mt-tab-container-item>
            <mt-tab-container-item id="score">
                <score></score>
            </mt-tab-container-item>
            <mt-tab-container-item id="typeList">
                <type-list></type-list>
            </mt-tab-container-item>
            <mt-tab-container-item id="personal">
                <personal></personal>
            </mt-tab-container-item>
            <mt-tab-container-item id="blogList1">
                <blog-list :query="'科技技术'"></blog-list>
            </mt-tab-container-item>
            <mt-tab-container-item id="blogList2">
                <blog-list :query="'社会百态'"></blog-list>
            </mt-tab-container-item>
            <mt-tab-container-item id="blogList3">
                <blog-list :query="'公司建设'"></blog-list>
            </mt-tab-container-item>
            <mt-tab-container-item id="blogList4">
                <blog-list :query="'国际政要'"></blog-list>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script type="text/javascript">
    import TypeList from '../blog/typeList.vue'
    import BlogList from '../blog/blogList.vue'
    import Score from '../user/score.vue'
    import Personal from '../user/personal.vue'

    export default {
        name: 'main-wrapper',
        components: {
            TypeList,
            BlogList,
            Score,
            Personal
        },
        props: {
            value: {}
        },
        data() {
            return {
                active: this.value
            }
        },
        watch: {
            value(val) {
                this.active = val;
            },
            active(val) {
                this.$emit('input', val);
            }
        }
    }
</script>
<style type="text/css">
    .main {
        position: absolute;
        left: 0;
        right: 0;
        top: 80px;
        bottom: 55px;
    }
    .main .mint-tab-container {
        position: absolute;
        top: 46px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    .main .mint-navbar {
        background-color: #F4F5F6;
    }
    .main .mint-navbar .mint-tab-item.is-selected {
        margin-bottom: 0;
        border-bottom: none;
    }
</style>
