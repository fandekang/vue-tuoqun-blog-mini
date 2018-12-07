export default {
    state: {
        otherCommentsUrl: process.env.ROOT_API + 'comments/receiveSubComments.do',
        commentId: "",
        fatherCommentId: "",
        // articleID: "",
        comments: 0
    },
    mutations: {
        // reloadOtherComments(state) {
        //     state.otherCommentsUrl += "?dt=" + Math.random();
        // },
        optOtherComments(state, opt) {
            Object.assign(state, opt);
        }
    }
}
