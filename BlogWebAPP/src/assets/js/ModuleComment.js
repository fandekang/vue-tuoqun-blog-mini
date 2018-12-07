export default {
    state: {
        subCommentsUrl: process.env.ROOT_API + 'comments/getCommentByCommentID.do',
        commentId: "",
        articleID: "",
        comments: 0
    },
    mutations: {
        reloadSubComments(state) {
            state.subCommentsUrl += "?dt=" + Math.random();
        },
        optSubComments(state, opt) {
            Object.assign(state, opt);
        }
    }
}
