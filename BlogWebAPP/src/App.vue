<template>
    <div id="app">
        <header-wrapper height="80px">
            <img src="./assets/images/logo.png">
            <div slot="right">
                <mt-button @click="logoutEvent" v-if="this.$store.state.ModuleHead.staffName" icon="fa fa-sign-out" type="danger" size="small">登出</mt-button>
                <mt-button @click="loginEvent" icon="fa fa-user" type="primary" size="small" v-else plain>登陆</mt-button>
            </div>
        </header-wrapper>
        <main-wrapper v-model="active"></main-wrapper>
        <foot-wrapper v-model="active" :source="source"></foot-wrapper>

        <!--文章弹窗-->
        <full-popup v-model="articlePopup" :title="'阅读文章'" @back="artBackEvent()">
            <router-view></router-view>
        </full-popup>

        <!-- 一级评论底部-->
        <transition name="comment-fade">
            <foot-wrapper class="comment-tools-container" v-if="commentFooter">
                <div class="comment-tools" slot="main">
                    <div @click="toCommentEvent" class="comment-input">
                        <i class="fa fa-pencil"></i>&nbsp;&nbsp;&nbsp;说点什么吧。。。
                    </div>
                    <div class="comment-tools-icon" @click="toCommetList">
                        <i class="fa fa-commenting-o"></i> {{comments}}
                    </div>
                    <div class="comment-tools-icon" style="text-align: left;">
                        <i class="fa fa-thumbs-o-up"></i> {{like}}
                    </div>
                </div>
            </foot-wrapper>
        </transition>

        <!-- 一级评论弹窗-->
        <mt-popup
            style="min-height: 150px; width: 100%"
            v-model="commentPopup"
            position="bottom">
            <release-comment></release-comment>
        </mt-popup>

        <!-- 二级评论列表 -->
        <full-popup v-model="subCommentListPopup" position="bottom" title="二级评论列表" @back="backArticle">
            <sub-comments v-if="subCommentListPopup"></sub-comments>
        </full-popup>

        <!-- 二级评论底部 -->
        <transition name="comment-fade">
            <foot-wrapper class="comment-tools-container" v-if="commentLevel2Footer">
                <div class="comment-tools" slot="main">
                    <div @click="toLevel2CommentEvent" class="comment-input">
                        <i class="fa fa-pencil"></i>&nbsp;&nbsp;&nbsp;献出你的二级评论吧。。。
                    </div>
                    <div class="comment-tools-icon">
                        <i class="fa fa-commenting-o"></i> {{this.$store.state.ModuleComment.receivecount}}
                    </div>
                    <div class="comment-tools-icon" @click="giveAlike" style="text-align: left;">
                        <i class="fa fa-thumbs-o-up"></i> {{this.$store.state.ModuleComment.praisecount}}
                    </div>
                </div>
            </foot-wrapper>
        </transition>

        <!-- 二级评论弹窗 -->
        <mt-popup
            style="min-height: 150px; width: 100%"
            v-model="commentLevel2Popup"
            position="bottom">
            <release-level2-comment></release-level2-comment>
        </mt-popup>

        <!-- 三级评论弹窗 -->
        <mt-popup
            class="level3-comment"
            style="min-height: 150px; width: 100%;"
            v-model="commentLevel3Popup"
            position="bottom">
            <release-level3-comment></release-level3-comment>
        </mt-popup>

        <!--登陆/注册弹窗-->
        <full-popup v-model="loginPopup" :title="this.$store.state.ModuleHead.title">
            <join v-if="loginPopup"></join>
        </full-popup>
    </div>
</template>

<script>
    import loadData from './assets/js/loadData';

    const
        MainWrapper = resolve => {
            require(["./components/layout/main.vue"], resolve);
        },
        ReleaseComment = resolve => {
            require(["./components/blog/releaseComments.vue"], resolve);
        },
        ReleaseLevel2Comment = resolve => {
            require(["./components/blog/releaseLevel2Comments.vue"], resolve);
        },
        ReleaseLevel3Comment = resolve => {
            require(["./components/blog/releaseLevel3Comments.vue"], resolve);
        },
        Join = resolve => {
            require(["./components/user/join.vue"], resolve);
        },
        SubComments = resolve => {
            require(["./components/blog/subComments.vue"], resolve);
        }
    export default {
        name: 'App',
        mixins: [loadData],
        components: {
            Join,
            ReleaseComment,
            MainWrapper,
            SubComments,
            ReleaseLevel2Comment,
            ReleaseLevel3Comment
        },
        data() {
            return {
                active: 'blogList',
                source: [{
                    text: "首页", icon: "fa fa-home", id: "blogList"
                }, {
                    text: "排行", icon: "fa fa-level-up", id: "score"
                }, {
                    text: "文章", icon: "fa fa-list-ul", id: "typeList"
                }, {
                    text: "设置", icon: "fa fa-cog", id: "personal"
                }]
            }
        },
        computed: {
            commentLevel3Popup: {
                get() {
                    return this.$store.state.ModulePopup.commentLevel3Popup;
                },
                set(val) {
                    this.$store.commit("togglePopup", {commentLevel3Popup: val})
                }
            },
            articlePopup: {
                get() {
                    return this.$store.state.ModulePopup.articlePopup;
                },
                set(val) {
                    this.$store.commit("togglePopup", {articlePopup: val, commentFooter: val});
                }
            },
            commentLevel2Popup: {
                get() {
                    return this.$store.state.ModulePopup.commentLevel2Popup;
                },
                set(val) {
                    if(this.subCommentListPopup) {
                        this.$store.commit("togglePopup", {commentLevel2Footer: !val, commentLevel2Popup: val})
                    }
                }
            },
            subCommentListPopup: {
                get() {
                    return this.$store.state.ModulePopup.subCommentListPopup
                },
                set(val) {
                    this.$store.commit('togglePopup', {subCommentListPopup: val})
                }
            },
            commentPopup: {
                get() {
                    return this.$store.state.ModulePopup.commentPopup;
                },
                set(val) {
                    if (this.articlePopup) {
                        this.$store.commit("togglePopup", {commentFooter: !val, commentPopup: val});
                    }
                }
            },
            commentFooter: {
                get() {
                    return this.$store.state.ModulePopup.commentFooter;
                },
                set(val) {
                    if (this.articlePopup) {
                        this.$store.commit("togglePopup", {commentFooter: val, commentPopup: !val});
                    }
                }
            },
            commentLevel2Footer: {
                get() {
                    return this.$store.state.ModulePopup.commentLevel2Footer
                },
                set(val) {
                    this.$store.commit("togglePopup", {commentLevel2Footer: val})
                }
            },
            loginPopup: {
                get() {
                    return this.$store.state.ModulePopup.loginPopup;
                },
                set(val) {
                    this.$store.commit("togglePopup", {loginPopup: val});
                }
            },
            comments: {
                get() {
                    return this.$store.state.ModuleArticle.comments;
                }
            },
            like: {
                get() {
                    return this.$store.state.ModulePopup.like;
                }
            }
        },
        watch: {
            active(newVal, oldVal) {
                let checkPageList = ['personal', 'typeList'];
                if (checkPageList.indexOf(newVal) > -1) {
                    this.sendGet({
                        url : process.env.ROOT_API + "main/checkLogin.do",
                        resolve() {
                            this.$store.commit('reloadTypeListUrl')
                        },
                        reject(response) {
                            if (response.status === 604) {
                                this.$toast("您还未登陆或者已经登陆超时");
                                this.$store.commit("togglePopup", {loginPopup: true});
                                this.active = oldVal;
                            }
                            else {
                                this.$toast("跳转失败，调取远程数据出错，状态：" + response.status);
                                this.active = oldVal;
                            }
                        }
                    });
                }
            }
        },
        methods: {
            // 跳转到评论列表的相应位置
            toCommetList() {
                this.$store.commit('togglePopup', {scrollToComments: true})
            },
            // 对一级评论点赞
            giveAlike() {
                let url = process.env.ROOT_API + 'comments/addPraiseCount.do',
                    param = {
                        objid: this.$store.state.ModuleComment.commentId
                    },
                    success = (data) => {
                        this.$store.commit('reloadComments')
                        this.$store.commit('releaseSublike')
                    },
                    error = () => {
                        this.$toast('点赞失败')
                    }

                this.sendPost({url, param, success, error})
            },
            backArticle() {
                this.$store.commit("togglePopup", {commentLevel2Footer: false})
                this.$store.commit("togglePopup", {commentFooter: true})
            },
            artBackEvent() {
                this.$store.commit("togglePopup", {title: "", commentFooter: false, commentPopup: false});
                this.$router.push({path:"/"});
            },
            toLevel2CommentEvent() {
                this.$store.commit("togglePopup", {commentLevel2Popup: true})
            },
            toCommentEvent() {
                this.$store.commit("togglePopup", {commentPopup: true});
            },
            logoutEvent() {
                let url = process.env.ROOT_API + "main/logout.do",
                    success = () => {
                        this.$store.commit("logout");
                        this.$router.push({path:"/"});
                        this.active = "blogList";
                    };
                this.sendPost({url, success});
            },
            loginEvent() {
                this.$store.commit("togglePopup", {loginPopup: true});
                this.$store.commit("toggleUser", {title: "登陆"});
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
    }
    * {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    html, body {
        height: 100%;
        width: 100%;
        margin: 0 0;
        padding: 0;
        font-size: 62.5%;
    }
    ul, li {
        text-decoration: none;
    }
    [class^="mintui-fa"], [class*="mintui-fa"] {
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome!important;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .mint-header.is-fixed {
        background-color: #fff;
        color: #333;
        border-bottom: 1px solid #ddd;
    }
    .mint-indicator-wrapper {
        z-index: 9999;
    }
    hr {
        margin-top:7px;
        *margin: 0;
        border: 0;
        color: #ddd;
        background-color: #ddd;
        height: 1px
    }
    .mint-header.is-fixed,
    .comment-tools-container {
        z-index: 9999;
    }
    .comment-tools {
        width: 100%;
        display: flex;
        padding-left: 20px;
        align-items: center;
    }
    .comment-input {
        border-radius: 15px;
        background-color: #ddd;
        height: 28px;
        line-height: 28px;
        text-indent: .6rem;
        font-size: 1.3rem;
        flex: 1;
        color: #666;
    }
    .comment-tools-icon {
        width: 65px;
        text-align: center;
        font-size: 1.3rem;
    }
    .comment-tools-icon i {
        font-size: 2.1rem;
    }
    .comment-fade-enter-active, .comment-fade-leave-active {
        transition: transform .2s ease-out;
    }
    .comment-fade-enter, .comment-fade-leave-to {
        /*opacity: 0;*/
        transform: translate(0, 48px);
    }
    .mint-toast {
        z-index: 3000;
    }
    .level3-comment {
        z-index: 10000 !important;
    }
</style>
