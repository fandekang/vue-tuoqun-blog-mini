export default {
    state: {
        visible: false,
        title: "标题",
        commentPopup: false,
        commentFooter: false,
        loginPopup: false,
        popupManager: []
    },
    mutations: {
        togglePopup(state, opt) {
            state.visible = opt.visible;
            state.commentFooter = opt.visible;
        },
        toggleLoginPopup(state, opt) {
            state.title = "登陆";
            state.loginPopup = opt.loginPopup;
        },
        setPopupTitle(state, opt) {
            state.title = opt.title;
        },
        toggleCommentPopup(state, opt) {
            state.commentPopup = opt.commentPopup;
            state.commentFooter = !opt.commentPopup;
        },
        toggleCommentFooter(state, opt) {
            state.commentFooter = opt.commentFooter;
        }
    }
}
