export default {
    state: {
        articlePopup: false,
        title: "",
        like: 0,
        commentPopup: false,
        commentLevel2Popup: false,
        commentLevel3Popup: false,
        subCommentListPopup: false,
        commentFooter: false,
        commentLevel2Footer: false,
        scrollToComments: false,
        loginPopup: false,
        popupManager: []
    },
    mutations: {
        togglePopup(state, opt) {
            Object.assign(state, opt);
        }
    }
}
