export default {
    state: {
        commentsUrl: process.env.ROOT_API + "comments/getSuperCommentListByArtID.do",
        comments: 0
    },
    mutations: {
        reloadComments(state) {
            state.commentsUrl += "?dt=" + Math.random();
        },
        releaseComments(state) {
            state.comments += 1;
        },
        optArticle(state, opt) {
            Object.assign(state, opt);
        }
    }
}
