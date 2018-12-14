export default {
    state: {
        level3CommentsUrl: process.env.ROOT_API + 'comments/receiveSubComments.do',
        commentId: "",
        fatherCommentId: "",
        comments: 0
    },
    mutations: {
        optOtherComments(state, opt) {
            Object.assign(state, opt);
        }
    }
}
