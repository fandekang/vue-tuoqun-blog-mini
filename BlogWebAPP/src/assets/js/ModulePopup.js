export default {
    state: {
        articlePopup: false,
        title: "",
        like: 0,
        commentPopup: false,
        commentLevel2Popup: false,
        // subCommentPopup: false,
        subCommentListPopup: false,
        commentFooter: false,
        commentLevel2Footer: false,
        // subCommentFooter: false,
        loginPopup: false,
        popupManager: []
    },
    mutations: {
        togglePopup(state, opt) {
            Object.assign(state, opt);
        }
    }
}
