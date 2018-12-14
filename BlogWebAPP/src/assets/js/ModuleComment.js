export default {
    state: {
        // 我的博文列表地址
        typeListUrl: process.env.ROOT_API + "article/getMyBlogList.do",
        subCommentsUrl: process.env.ROOT_API + 'comments/getCommentByCommentID.do',
        commentId: "",
        articleID: "",
        level1CommentUserName: "",
        level1CommentDate: "",
        praisecount: 0,
        receivecount: 0
    },
    mutations: {
        reloadTypeListUrl(state) {
            state.typeListUrl += "?dt=" + Math.random()
        },
        reloadSubComments(state) {
            state.subCommentsUrl += "?dt=" + Math.random();
        },
        releaseSubComments(state) {
            state.receivecount += 1
        },
        releaseSublike(state) {
            state.praisecount += 1
        },
        optSubComments(state, opt) {
            Object.assign(state, opt);
        }
    }
}
