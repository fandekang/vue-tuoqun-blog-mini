<template>
    <div class="sub-commentlist">
        <load-more-panel :auto-fill="false" :bottom-all-loaded.sync="allLoaded" :dataUrl="subCommentsUrl" :remoteParam="remoteParam" :pager="pager" >
            <panel-wrapper slot-scope="scope">
                <img :onerror="errorImg" :style="{'border-radius': '40px'}" slot="img" :src="getStaffImg(scope.item.userid)" height="40px" width="40px">
                <div slot='header' class="head">{{scope.item.username}}&nbsp;&nbsp;{{scope.item.commentdate}}<span v-if="!scope.item.replyname" class="reply-comment" @click="reply(scope.item.fathercommentid, scope.item.commentid)">回复</span></div>
                <span slot="body" v-if="scope.item.replyname" style="color: #409EFF">@{{scope.item.replyname}}：&nbsp;&nbsp; </span>
                <div slot="body" class='body' v-html="$AngusVueEmoji(scope.item.commentcontent)"></div>
                <div slot="footer">
                    <div class="sy-panel-footer">
                        <i class="fa fa-commenting-o" v-if="scope.item.receivecount" @click="toCommentList(scope.item.commentid)">&nbsp;{{scope.item.receivecount}}&nbsp;</i>
                        <i class="fa fa-commenting-o" v-else>&nbsp;{{scope.item.receivecount}}&nbsp;</i>
                        <i class="fa fa-thumbs-o-up">&nbsp;{{scope.item.praisecount}}</i>
                    </div>
                </div>
            </panel-wrapper>
        </load-more-panel>
    </div>
</template>
<script>
import defaultImg from '../../assets/images/pic01.jpg'

export default {
    name: 'subComments',
    computed: {
        subCommentsUrl: {
            get() {
                return this.$store.state.ModuleComment.subCommentsUrl;
            }
        }
        // ,
        // commentID: {
        //     get() {
        //         return this.$store.state.ModuleComment.commentId;
        //     },
        //     set(val) {
        //         this.$store.commit("optSubComments", {commentId: val})
        //     }
        // },
        // articleID: {
        //     get() {
        //         return this.$store.state.ModuleComment.articleID;
        //     },
        //     set(val) {
        //         this.$store.commit('optSubComments', {articleID: val})
        //     }
        // }
    },
    data() {
        return {
            root: process.env.ROOT_API,
            errorImg: `this.src='${defaultImg}'`,
            remoteParam: {
                articleID: this.$store.state.ModuleComment.articleID,
                commentID: this.$store.state.ModuleComment.commentId
            },
            allLoaded: false,
            pager: {
                curPage: 1,
                pageSize: 5
            }
        }
    },
    methods: {
        reply(fathercommentid, commentid) {
            this.$store.commit('optOtherComments', {fatherCommentId: fathercommentid, commentId: commentid})
            this.$store.commit("togglePopup", {subCommentFooter: true})
            console.log('回复内容===============')
            console.log(fathercommentid)
            console.log(commentid)
        },
        getStaffImg(staffId) {
            return process.env.ROOT_API + "main/getStaffImg.do?dt=" + Math.random() + "&staffID=" + staffId;
        }
    }
}
</script>
<style scoped>
.reply-comment {
    margin-left: 15px;
    color: #4d5cc3;
}
.sub-commentlist {
    margin-top: 78px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 70px;
}
</style>
