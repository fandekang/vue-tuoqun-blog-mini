export default {
    state: {
        staffName: "",
        staffID: "",
        title: ""
    },
    mutations: {
        toggleUser(state, opt) {
            Object.assign(state, opt);
        },
        logout(state) {
            state.staffName = "";
            state.staffID = "";
        }
    }
}
