import FullPopup from "./src/fullPopup.vue";

FullPopup.install = function(Vue) {
    Vue.component(FullPopup.name, FullPopup);
};

export default FullPopup;
