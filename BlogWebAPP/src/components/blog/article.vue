<!--
    vue模板
    @author: hjj
    @date: 2018/11/12
    @desc:
-->
<template>
    <div class="article">
        <article>
            <h1 v-text="this.article.title"></h1>
            <div class="article-subtitle">
                <span v-text="this.article.isoriginal === 0 ? '原创' : '转载'"></span>
                <span v-text="this.article.createddate"></span>
                阅读
                <span v-text="this.article.readcount"></span>
            </div>
            <hr>
            <p class="article-content" v-html="this.article.content"></p>
        </article>
        <h6 id="allComments">全部评论</h6>
        <load-more-panel :auto-fill="false" :bottom-all-loaded.sync="allLoaded" :dataUrl="dataUrl" :remoteParam="remoteParam" :pager="pager">
            <panel-wrapper slot-scope="param">
                <img :onerror="errorImg" :style="{'border-radius': '40px'}" slot="img" :src="getStaffImg(param.item.userid)" height="40px"
                width="40px">
                <div slot="header">
                    <b v-text="param.item.username"></b>
                    <span class="sy-header-right" v-text="param.item.commentdate"></span>
                </div>
                <div slot="body" v-html="$AngusVueEmoji(param.item.commentcontent)"></div>
                <div slot="footer">
                    <div class="sy-panel-footer">
                        <i class="fa fa-commenting-o" @click="toCommentList(param.item.commentid, param.item.receivecount, param.item.praisecount, param.item.username, param.item.commentdate)">&nbsp;{{param.item.receivecount}}&nbsp;</i>
                        <i class="fa fa-thumbs-o-up" @click="giveAlike(param.item.commentid)">&nbsp;{{param.item.praisecount}}</i>
                    </div>
                </div>
            </panel-wrapper>
        </load-more-panel>
    </div>
</template>
<script type="text/javascript">
    import loadData from '../../assets/js/loadData';
    import noImg from '../../assets/images/pic01.jpg';
    import subComments from './subComments.vue';
    export default {
        name: 'article-read',
        mixins: [loadData],
        components: {subComments},
        data() {
            return {
                errorImg: `this.src='${noImg}'`,
                article: {},
                remoteParam: {articleID: this.$route.query.id},
                allLoaded: false,
                pager: {
                    curPage: 1,
                    pageSize: 2
                }
            }
        },
        computed: {
            dataUrl: {
                get() {
                    return this.$store.state.ModuleArticle.commentsUrl;
                }
            },
            scrollToComments: {
                get() {
                    return this.$store.state.ModulePopup.scrollToComments
                }
            }
        },
        watch: {
            // 跳转到评论区, scrollIntoView: 调用元素就可以出现在视窗中
            scrollToComments() {
                if(this.scrollToComments) {
                    document.querySelector('#allComments').scrollIntoView(true)
                    this.$store.commit('togglePopup', {scrollToComments: false})
                }
            }
        },
        methods: {
            getStaffImg(staffId) {
                return process.env.ROOT_API + "main/getStaffImg.do?dt=" + Math.random() + "&staffID=" + staffId;
            },
            // 跳转到二级评论,  commentid: 一级评论ID
            toCommentList(commentid, receivecount, praisecount, username, commentdate) {
                // 判断是否登录
                this.sendGet({
                    url : process.env.ROOT_API + "main/checkLogin.do",
                    reject(response) {
                        if (response.status === 604) {
                            this.$toast("您还未登陆或者已经登陆超时");
                            this.$store.commit("togglePopup", {loginPopup: true});
                        }
                        else {
                            this.$toast("跳转失败，调取远程数据出错，状态：" + response.status);
                        }
                    },
                    resolve(res) {
                        this.$store.commit("optSubComments", {articleID: this.$route.query.id, commentId: commentid, receivecount, praisecount, level1CommentUserName: username, level1CommentDate: commentdate})
                        this.$store.commit("togglePopup", {subCommentListPopup: true})
                        this.$store.commit("togglePopup", {commentLevel2Footer: true})
                        this.$store.commit("togglePopup", {commentFooter: false})
                    }
                });
            },
            // 评论点赞
            giveAlike(commentid) {
                let url = process.env.ROOT_API + 'comments/addPraiseCount.do',
                    param = {
                        objid: commentid
                    },
                    success = (data) => {
                        this.$store.commit('reloadComments')
                    },
                    error = () => {
                        this.$toast('点赞失败')
                    }
                this.sendPost({url, param, success, error})
            }
        },
        mounted() {
            let url = process.env.ROOT_API + 'article/getArticleByID.do?dt=' + Math.random(),
                param = {objid: this.$route.query.id},
                success = function(resp) {
                    let body = JSON.parse(resp.bodyText)
                    this.article = body.data
                }
            this.sendGet({url, param, success})
        }
    }
</script>
<style type="text/css">
    .article {
        margin-top: 78px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 70px;
    }
    .article article h1 {
        font-size: 2.4rem;
        text-align: center;
        padding-left: 25px;
        padding-right: 25px;
    }
    .article-content pre {
        overflow-x: auto;
        background-color: #ddd;
        color: #333;
        padding: 5px;
    }
    .article article p {
        text-align: justify;
        font-size: 1.2rem;
    }
    .article-subtitle {
        margin-top: 40px;
        margin-bottom: 10px;
        color: #aaa;
    }
    .article .article-content img {
        width: 100%;
    }
    .sy-panel-footer {
        float: right;
    }
</style>
<style scoped>

</style>
